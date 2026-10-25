import { createClient } from "jsr:@supabase/supabase-js@2";

const JSON_HEADERS = { "Content-Type": "application/json", "Cache-Control": "no-store" };
function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: JSON_HEADERS });
}
function toHex(bytes: ArrayBuffer) {
  return Array.from(new Uint8Array(bytes), (b) => b.toString(16).padStart(2, "0")).join("");
}
async function hmacHex(secret: string, body: string) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    enc.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  return toHex(await crypto.subtle.sign("HMAC", key, enc.encode(body)));
}
function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let result = 0;
  for (let i = 0; i < a.length; i++) result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return result === 0;
}
function mapStatus(event: string, status: string) {
  const value = (event + " " + status).toLowerCase();
  // refunds and disputes first: their events can also mention "paid"/"completed"
  if (value.includes("chargeback") || value.includes("dispute")) return "chargeback";
  if (value.includes("refund")) return "refunded";
  if (value.includes("succeeded") || value.includes("paid") || value.includes("completed")) return "succeeded";
  if (value.includes("processing") || value.includes("pending")) return "processing";
  if (value.includes("cancel")) return "canceled";
  if (value.includes("expire")) return "expired";
  if (value.includes("fail")) return "failed";
  return "pending";
}

const GWD_EVENTS_URL = "https://api.goworld.digital/v1/integrations/novidades/order-events";
const GWD_STATUS: Record<string, string> = { succeeded: "approved", refunded: "refunded", chargeback: "chargeback" };

/** Forwards an attributed order event to GWD (signed, idempotent on reference:status). Closed until the shared secret
 *  `gwd_events_secret` exists. Never blocks the store: the outcome is recorded on the intent for reconciliation. */
async function forwardToGwd(
  // deno-lint-ignore no-explicit-any
  supabase: any,
  intent: Record<string, unknown>,
  status: string,
): Promise<string> {
  const attribution = (intent.attribution ?? {}) as Record<string, string>;
  const gwdStatus = GWD_STATUS[status];
  if (!attribution.gwd_ref || !gwdStatus) return "not_applicable";
  const { data: secretRow } = await supabase
    .from("digital_runtime_secrets")
    .select("secret_value")
    .eq("name", "gwd_events_secret")
    .maybeSingle();
  if (!secretRow?.secret_value) return "gwd_integration_closed";
  const body = JSON.stringify({
    event_id: String(intent.reference) + ":" + gwdStatus,
    reference: intent.reference,
    status: gwdStatus,
    product_slug: intent.product_slug,
    amount_minor: Number(intent.amount_minor),
    currency: String(intent.currency).toUpperCase(),
    gwd_ref: attribution.gwd_ref,
  });
  const timestamp = String(Date.now());
  try {
    const response = await fetch(GWD_EVENTS_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-gwd-timestamp": timestamp,
        "x-gwd-signature": await hmacHex(secretRow.secret_value as string, timestamp + "." + body),
      },
      body,
      signal: AbortSignal.timeout(8000),
    });
    const result = await response.json().catch(() => ({}));
    return response.ok ? "gwd_" + String(result?.outcome ?? "received") : "gwd_http_" + response.status;
  } catch {
    return "gwd_unreachable";
  }
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") return json({ received: false, error: "method_not_allowed" }, 405);

  try {
    const raw = await req.text();
    const signature = req.headers.get("x-nexflowx-signature") || "";

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceRole = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceRole, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { data: config, error: configError } = await supabase
      .from("digital_webhook_config")
      .select("signing_secret")
      .eq("store_code", "NOVIDADES-BRL")
      .eq("active", true)
      .single();

    if (configError || !config?.signing_secret) return json({ received: false, error: "config_missing" }, 500);
    const expected = await hmacHex(config.signing_secret, raw);
    if (!safeEqual(expected, signature.toLowerCase())) {
      return json({ received: false, error: "invalid_signature" }, 401);
    }

    const payload = JSON.parse(raw);
    const reference = String(payload.reference || "").trim();
    if (!reference) return json({ received: true, ignored: true, reason: "reference_missing" });

    const { data: intent } = await supabase
      .from("digital_checkout_intents")
      .select("*")
      .eq("reference", reference)
      .maybeSingle();

    if (!intent) return json({ received: true, ignored: true, reason: "not_digital_intent" });

    const amountMinor = Math.round(Number(payload.amount) * 100);
    const currency = String(payload.currency || "").toUpperCase();
    if (amountMinor !== Number(intent.amount_minor) || currency !== String(intent.currency).toUpperCase()) {
      return json({ received: false, error: "reconciliation_mismatch" }, 409);
    }

    const status = mapStatus(String(payload.event || ""), String(payload.status || ""));
    const transactionId = payload.transaction_id ? String(payload.transaction_id) : (intent.transaction_id ?? null);
    const now = new Date().toISOString();

    const { error: updateError } = await supabase
      .from("digital_checkout_intents")
      .update({
        status,
        transaction_id: transactionId,
        // merge: the checkout metadata (product, listing, delivery modes) is kept
        metadata: {
          ...((intent.metadata ?? {}) as Record<string, unknown>),
          last_event: payload.event || null,
          payment_method: payload.method || null,
          webhook_received_at: now,
        },
        updated_at: now,
      })
      .eq("reference", reference);
    if (updateError) throw updateError;

    let entitlementSkus: string[] = [];

    if (status === "succeeded") {
      const { data: inclusions, error: inclusionError } = await supabase
        .from("digital_product_inclusions")
        .select("included_sku,sort_order")
        .eq("parent_sku", intent.product_sku)
        .eq("active", true)
        .order("sort_order", { ascending: true });

      if (inclusionError) throw inclusionError;

      entitlementSkus = [
        intent.product_sku,
        ...(inclusions || []).map((item) => item.included_sku),
      ];

      const rows = entitlementSkus.map((sku) => ({
        product_sku: sku,
        customer_email: intent.customer_email,
        xpayments_reference: reference,
        transaction_id: transactionId,
        status: "active",
        granted_at: now,
        metadata: {
          source: "xpayments-webhook-edge",
          parent_sku: intent.product_sku,
          included: sku !== intent.product_sku,
        },
        updated_at: now,
      }));

      const { error: entitlementError } = await supabase
        .from("digital_entitlements")
        .upsert(rows, { onConflict: "product_sku,xpayments_reference" });

      if (entitlementError) throw entitlementError;
    }

    // refund / chargeback: access to the purchased content ends with the payment
    if (status === "refunded" || status === "chargeback") {
      const { error: revokeError } = await supabase
        .from("digital_entitlements")
        .update({ status: status === "refunded" ? "refunded" : "revoked", updated_at: now })
        .eq("xpayments_reference", reference);
      if (revokeError) throw revokeError;
    }

    const gwd = await forwardToGwd(supabase, intent, status);
    if (gwd !== "not_applicable") {
      await supabase
        .from("digital_checkout_intents")
        .update({ attribution: { ...((intent.attribution ?? {}) as Record<string, unknown>), ["gwd_" + status]: gwd, gwd_at: now } })
        .eq("reference", reference);
    }

    return json({
      received: true,
      reference,
      status,
      entitlementGranted: status === "succeeded",
      entitlementSkus,
      gwd,
    });
  } catch (error) {
    console.error(error);
    return json({ received: false, error: "internal_error" }, 500);
  }
});

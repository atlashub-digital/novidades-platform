import { createClient } from "jsr:@supabase/supabase-js@2";

const ALLOWED_ORIGINS = new Set([
  "https://novidades.store",
  "https://www.novidades.store",
  "https://digital.novidades.store",
]);

const STOREFRONT_CODE = "NOVIDADES-BRL";
const RETURN_BASE = "https://novidades.store/conteudos-digitais/acesso";

function cors(req: Request) {
  const origin = req.headers.get("origin");
  const allowed = !origin || ALLOWED_ORIGINS.has(origin);
  return {
    allowed,
    headers: {
      "Access-Control-Allow-Origin":
        origin && ALLOWED_ORIGINS.has(origin)
          ? origin
          : "https://novidades.store",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Content-Type": "application/json",
      "Cache-Control": "no-store",
      "Vary": "Origin",
    },
  };
}

function randomHex(bytes: number) {
  const data = new Uint8Array(bytes);
  crypto.getRandomValues(data);
  return Array.from(data, (b) => b.toString(16).padStart(2, "0")).join("");
}

async function sha256Hex(value: string) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(value),
  );
  return Array.from(
    new Uint8Array(digest),
    (b) => b.toString(16).padStart(2, "0"),
  ).join("");
}

/** GWD affiliate attribution (optional): opaque member code + utm_*. Anything malformed is dropped, never rejected,
 *  so a bad attribution can never block a sale. Price, currency and SKU stay server-side as before. */
function sanitizeAttribution(value: unknown): Record<string, string> | null {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  const ref = String(input.gwd_ref ?? "").toLowerCase();
  if (!/^[a-z0-9]{8,16}$/.test(ref)) return null;
  const out: Record<string, string> = { gwd_ref: ref };
  const utm = (input.utm && typeof input.utm === "object" ? input.utm : {}) as Record<string, unknown>;
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    const v = utm[key];
    if (typeof v === "string" && /^[A-Za-z0-9._-]{1,128}$/.test(v)) out[key] = v;
  }
  const landing = input.landing;
  if (typeof landing === "string" && /^\/[A-Za-z0-9/_-]{0,199}$/.test(landing)) out.landing = landing;
  return out;
}

Deno.serve(async (req: Request) => {
  const c = cors(req);
  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), { status, headers: c.headers });

  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: c.allowed ? 204 : 403,
      headers: c.headers,
    });
  }
  if (!c.allowed) return json({ message: "origin_not_allowed" }, 403);
  if (req.method !== "POST") return json({ message: "method_not_allowed" }, 405);

  try {
    const { productSlug, email, attribution: rawAttribution } = await req.json();
    const slug = String(productSlug || "").trim().toLowerCase();
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const attribution = sanitizeAttribution(rawAttribution);

    if (
      !/^[a-z0-9][a-z0-9-]{1,100}$/.test(slug) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)
    ) {
      return json({ message: "Dados de checkout inválidos." }, 400);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { persistSession: false, autoRefreshToken: false } },
    );

    const { data: storefront, error: storefrontError } = await supabase
      .from("storefronts")
      .select("id,status")
      .eq("code", STOREFRONT_CODE)
      .eq("status", "live")
      .maybeSingle();

    if (storefrontError || !storefront?.id) {
      return json({ message: "Loja digital indisponível." }, 503);
    }

    const { data: listing, error: listingError } = await supabase
      .from("product_listings")
      .select("id,product_id,slug,status,metadata")
      .eq("storefront_id", storefront.id)
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (listingError || !listing?.id) {
      return json({ message: "Produto digital indisponível." }, 404);
    }

    const { data: product, error: productError } = await supabase
      .from("products")
      .select("sku,slug,title,published,fulfillment_type,requires_shipping")
      .eq("id", listing.product_id)
      .maybeSingle();

    if (
      productError ||
      !product?.sku ||
      !product.published ||
      product.fulfillment_type !== "digital" ||
      product.requires_shipping
    ) {
      return json({ message: "Produto digital indisponível." }, 409);
    }

    const { data: price, error: priceError } = await supabase
      .from("listing_prices")
      .select("currency,amount_cents")
      .eq("listing_id", listing.id)
      .eq("active", true)
      .order("amount_cents", { ascending: true })
      .limit(1)
      .maybeSingle();

    if (priceError || !price?.amount_cents || !price?.currency) {
      return json({ message: "Preço indisponível." }, 409);
    }

    const { data: inclusions, error: inclusionError } = await supabase
      .from("digital_product_inclusions")
      .select("included_sku,sort_order")
      .eq("parent_sku", product.sku)
      .eq("active", true)
      .order("sort_order", { ascending: true });

    if (inclusionError) throw inclusionError;

    const deliverySkus = [
      product.sku,
      ...(inclusions || []).map((item) => item.included_sku),
    ];

    const [{ count: assetCount }, deliveryProductsResult] = await Promise.all([
      supabase
        .from("digital_assets")
        .select("id", { count: "exact", head: true })
        .in("product_sku", deliverySkus)
        .eq("active", true),
      supabase
        .from("products")
        .select("sku,slug")
        .in("sku", deliverySkus)
        .eq("published", true),
    ]);

    if (deliveryProductsResult.error) throw deliveryProductsResult.error;

    const deliverySlugs = (deliveryProductsResult.data || [])
      .map((item) => item.slug)
      .filter(Boolean);

    let readerBlockCount = 0;
    if (deliverySlugs.length) {
      const { count, error } = await supabase
        .from("digital_content_blocks")
        .select("id", { count: "exact", head: true })
        .in("product_slug", deliverySlugs)
        .eq("active", true);
      if (error) throw error;
      readerBlockCount = count || 0;
    }

    if (!(assetCount || 0) && !readerBlockCount) {
      return json({ message: "Entrega digital ainda não está pronta." }, 409);
    }

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();
    const { count } = await supabase
      .from("digital_checkout_intents")
      .select("reference", { count: "exact", head: true })
      .eq("customer_email", normalizedEmail)
      .gte("created_at", fiveMinutesAgo);

    if ((count || 0) >= 5) {
      return json(
        {
          message:
            "Muitas tentativas de checkout. Tente novamente em alguns minutos.",
        },
        429,
      );
    }

    const { data: secretRow, error: secretError } = await supabase
      .from("digital_runtime_secrets")
      .select("secret_value")
      .eq("name", "xpayments_api_key")
      .single();

    if (secretError || !secretRow?.secret_value) {
      return json({ message: "Checkout temporariamente indisponível." }, 503);
    }

    const reference =
      "NVD-" + product.sku + "-" + Date.now() + "-" + randomHex(4);
    const claim = randomHex(32);
    const claimTokenHash = await sha256Hex(claim);
    const claimExpiresAt = new Date(
      Date.now() + 30 * 24 * 60 * 60 * 1000,
    ).toISOString();

    const returnUrl =
      RETURN_BASE +
      "?reference=" +
      encodeURIComponent(reference) +
      "&claim=" +
      encodeURIComponent(claim);

    const publicProductId =
      listing.metadata?.digital_product_id || product.slug;

    const { error: intentError } = await supabase
      .from("digital_checkout_intents")
      .insert({
        reference,
        product_sku: product.sku,
        product_slug: product.slug,
        customer_email: normalizedEmail,
        amount_minor: price.amount_cents,
        currency: String(price.currency).trim(),
        status: "creating",
        claim_token_hash: claimTokenHash,
        claim_expires_at: claimExpiresAt,
        attribution: attribution ?? {},
        metadata: {
          source: "novidades-store",
          product_id: publicProductId,
          listing_id: listing.id,
          release: "1.0",
          delivery_modes: {
            files: (assetCount || 0) > 0,
            reader: readerBlockCount > 0,
          },
        },
      });

    if (intentError) throw intentError;

    const xpayResponse = await fetch(
      "https://api.xpayments.digital/api/v1/checkout/session",
      {
        method: "POST",
        headers: {
          Authorization: "Bearer " + secretRow.secret_value,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          amount: price.amount_cents,
          currency: String(price.currency).trim(),
          reference,
          customerEmail: normalizedEmail,
          metadata: {
            source: "novidades-store",
            productId: publicProductId,
            productSlug: product.slug,
            sku: product.sku,
            fulfillment: "digital",
            customerEmail: normalizedEmail,
            returnUrl,
            ...(attribution ? { gwdRef: attribution.gwd_ref, utmSource: attribution.utm_source ?? "", utmCampaign: attribution.utm_campaign ?? "" } : {}),
          },
        }),
      },
    );

    const payload = await xpayResponse.json().catch(() => ({}));

    if (
      !xpayResponse.ok ||
      !payload?.success ||
      !payload?.data?.checkoutUrl
    ) {
      await supabase
        .from("digital_checkout_intents")
        .update({
          status: "failed",
          metadata: {
            xpayments_error: payload?.message || "session_create_failed",
          },
          updated_at: new Date().toISOString(),
        })
        .eq("reference", reference);

      return json(
        {
          message:
            payload?.message || "Não foi possível iniciar o checkout.",
        },
        502,
      );
    }

    await supabase
      .from("digital_checkout_intents")
      .update({
        session_id: payload.data.sessionId,
        status: "pending",
        updated_at: new Date().toISOString(),
      })
      .eq("reference", reference);

    return json({
      checkoutUrl: payload.data.checkoutUrl,
      sessionId: payload.data.sessionId,
      reference,
      claim,
      product: {
        slug: product.slug,
        sku: product.sku,
        amountMinor: price.amount_cents,
        currency: String(price.currency).trim(),
      },
    });
  } catch (error) {
    console.error(error);
    return json({ message: "Falha ao iniciar checkout." }, 500);
  }
});

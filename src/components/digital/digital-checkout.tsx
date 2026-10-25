"use client";

import { useEffect, useState } from "react";
import { ArrowRight, LoaderCircle, ShieldCheck } from "lucide-react";
import { captureGwdAttribution, readGwdAttribution } from "@/lib/gwd-attribution";

const CHECKOUT_URL =
  "https://eivqvrfsreaopzlvhadu.supabase.co/functions/v1/digital-checkout";

type SavedAccess = {
  reference: string;
  claim: string;
  productSlug: string;
  createdAt: string;
};

function saveAccess(access: SavedAccess) {
  localStorage.setItem("nv:digital:last-access", JSON.stringify(access));

  try {
    const existing = JSON.parse(
      localStorage.getItem("nv:digital:accesses") || "[]",
    ) as SavedAccess[];

    const next = [
      access,
      ...existing.filter(
        (item) =>
          item &&
          typeof item.reference === "string" &&
          item.reference !== access.reference,
      ),
    ].slice(0, 20);

    localStorage.setItem("nv:digital:accesses", JSON.stringify(next));
  } catch {
    localStorage.setItem("nv:digital:accesses", JSON.stringify([access]));
  }
}

export function DigitalCheckout({
  productSlug,
  priceLabel,
  microcopy = "Produto digital · sem frete · sem assinatura.",
}: {
  productSlug: string;
  priceLabel: string;
  microcopy?: string;
}) {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // GWD affiliate links land here with gwd_ref + utm_*: keep them until the checkout request.
  useEffect(() => {
    captureGwdAttribution();
  }, []);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    setError("");

    const normalized = email.trim().toLowerCase();
    if (!normalized || !normalized.includes("@")) {
      setError("Informe um email válido para receber o acesso.");
      return;
    }

    setBusy(true);
    try {
      const response = await fetch(CHECKOUT_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          productSlug,
          email: normalized,
          attribution: readGwdAttribution() ?? undefined,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data?.checkoutUrl) {
        throw new Error(
          data?.message || "Checkout temporariamente indisponível.",
        );
      }

      if (data.reference && data.claim) {
        saveAccess({
          reference: data.reference,
          claim: data.claim,
          productSlug,
          createdAt: new Date().toISOString(),
        });
      }

      window.location.assign(data.checkoutUrl);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível iniciar o checkout.",
      );
      setBusy(false);
    }
  }

  return (
    <form
      id="comprar"
      onSubmit={submit}
      className="mt-6 rounded-2xl border border-cyan-200 bg-cyan-50/60 p-4 md:p-5"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck
          className="mt-0.5 h-5 w-5 shrink-0 text-cyan-700"
          aria-hidden="true"
        />
        <div>
          <p className="text-sm font-extrabold text-foreground">
            Checkout seguro via XPAYMENTS
          </p>
          <p className="mt-1 text-xs leading-5 text-muted-foreground">
            O preço é resolvido no servidor a partir do catálogo publicado. O
            navegador não define valor nem moeda.
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-[1fr_auto]">
        <input
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          type="email"
          autoComplete="email"
          inputMode="email"
          placeholder="Seu melhor email"
          className="h-12 rounded-xl border border-border bg-white px-4 text-sm outline-none transition focus:border-cyan-500"
        />
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-extrabold text-white transition hover:bg-brand-dark disabled:cursor-wait disabled:opacity-70"
        >
          {busy ? (
            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          )}
          {busy ? "Abrindo checkout..." : "Comprar por " + priceLabel}
        </button>
      </div>

      <p className="mt-2 text-[11px] text-muted-foreground">{microcopy}</p>

      {error ? (
        <p className="mt-3 text-sm font-semibold text-red-700">{error}</p>
      ) : null}
    </form>
  );
}

"use client";

import { ShieldCheck } from "lucide-react";

export function DigitalCheckout({
  productSlug,
  priceLabel,
  microcopy = "Produto digital · acesso protegido.",
}: {
  productSlug: string;
  priceLabel: string;
  microcopy?: string;
}) {
  return (
    <div
      id="comprar"
      data-product-slug={productSlug}
      className="mt-6 rounded-2xl border border-amber-200 bg-amber-50/70 p-4 md:p-5"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" aria-hidden="true" />
        <div>
          <p className="text-sm font-extrabold text-amber-950">
            Checkout em migração para a infraestrutura ARO
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-900/75">
            Esta oferta mantém o preço de referência {priceLabel}, mas a compra
            permanece bloqueada neste rebaseline até checkout, entitlement e
            acesso digital via ARO passarem pelo gate E2E.
          </p>
          <p className="mt-2 text-[11px] text-amber-900/65">{microcopy}</p>
        </div>
      </div>
    </div>
  );
}

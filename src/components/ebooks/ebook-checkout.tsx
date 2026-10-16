"use client";

import { LockKeyhole } from "lucide-react";

type Props = {
  productSlug: string;
  productTitle: string;
  status: "live" | "preparing";
};

export function EbookCheckout({ productSlug, productTitle, status }: Props) {
  return (
    <div
      data-product-slug={productSlug}
      className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
    >
      <div className="flex items-start gap-3">
        <LockKeyhole className="mt-0.5 h-5 w-5 shrink-0 text-amber-700" />
        <div>
          <p className="text-sm font-black text-amber-950">
            {status === "preparing" ? "Edição em preparação" : "Venda temporariamente bloqueada"}
          </p>
          <p className="mt-1 text-xs leading-5 text-amber-900/75">
            {productTitle} está no catálogo editorial, mas o checkout direto legado
            foi desativado neste rebaseline. A venda volta a ser habilitada apenas
            através do ARO, com entitlement e acesso digital homologados.
          </p>
        </div>
      </div>
    </div>
  );
}

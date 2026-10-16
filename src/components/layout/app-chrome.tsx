"use client";

import type { ReactNode } from "react";
import { SiteHeader } from "@/components/layout/top-header";
import { SiteFooter } from "@/components/layout/footer";
import { CookieConsent } from "@/components/privacy/cookie-consent";
import { Toaster } from "@/components/ui/sonner";

export function AppChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <CookieConsent />
      <Toaster position="top-center" richColors closeButton />
    </>
  );
}

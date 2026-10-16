import type { Metadata, Viewport } from "next";
import { Inter, Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { AppChrome } from "@/components/layout/app-chrome";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"], display: "swap" });
const montserrat = Montserrat({ variable: "--font-montserrat", subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://novidades.store"),
  title: {
    default: "Novidades.store | E-Books, Cursos, Aulas e Conteúdo Digital",
    template: "%s · Novidades.store",
  },
  description:
    "E-books, aulas, webinars, cursos, formações e conteúdos digitais para aprender e aplicar, com WebReader, WebPlayer e biblioteca protegida.",
  keywords: [
    "novidades.store",
    "ebooks",
    "cursos online",
    "aulas online",
    "webinars",
    "formações",
    "conteúdo digital",
    "webreader",
    "webplayer",
  ],
  applicationName: "Novidades.store",
  openGraph: {
    title: "Novidades.store — Conteúdo para aprender, aplicar e evoluir.",
    description: "E-books, aulas, webinars, cursos e experiências digitais curadas.",
    url: "https://novidades.store",
    siteName: "Novidades.store",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Novidades.store",
    description: "Conteúdo digital para aprender, aplicar e evoluir.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#03152f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} ${playfair.variable} antialiased bg-background text-foreground min-h-screen flex flex-col`}>
        <AppChrome>{children}</AppChrome>
      </body>
    </html>
  );
}

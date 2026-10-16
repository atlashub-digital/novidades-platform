import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  LibraryBig,
  PlayCircle,
  Radio,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { ProductCard } from "@/components/commerce/product-card";
import { getPublicCatalog } from "@/lib/commerce-db";
import { CATEGORIES, type BadgeId, type Product } from "@/lib/data";

export const metadata: Metadata = {
  title: "Conteúdos Digitais",
  description:
    "E-books, cursos, aulas, webinars e experiências digitais curadas pela Novidades.store.",
  alternates: { canonical: "https://novidades.store/conteudos-digitais" },
};

const validBadges = new Set<BadgeId>(["novo", "em-alta", "oferta", "tendencia", "mais-vendido"]);

const formats = [
  { href: "/ebooks", label: "E-Books", icon: BookOpen },
  { href: "/cursos", label: "Cursos", icon: GraduationCap },
  { href: "/aulas", label: "Aulas", icon: PlayCircle },
  { href: "/webinars", label: "Webinars", icon: Radio },
];

export default async function DigitalContentPage() {
  const catalog = await getPublicCatalog();
  const category = CATEGORIES.find((item) => item.slug === "conteudos-digitais");

  const products: Product[] = catalog
    .filter((listing) => listing.fulfillmentType === "digital" && listing.priceCents !== null)
    .map((listing) => ({
      id: listing.productId,
      slug: listing.slug,
      name: listing.title,
      categoryId: category?.id ?? "conteudos-digitais",
      price: (listing.priceCents ?? 0) / 100,
      currency: listing.currency,
      badge: listing.badges.find((badge): badge is BadgeId => validBadges.has(badge as BadgeId)),
      image: listing.image,
      tagline: listing.subtitle,
      description: listing.description,
      storefrontUrl: listing.funnelUrl ?? undefined,
      published: true,
      fulfillmentType: listing.fulfillmentType,
      requiresShipping: false,
    }));

  return (
    <main className="min-h-screen bg-[#f5f8fc]">
      <section className="bg-[radial-gradient(circle_at_80%_15%,rgba(34,211,238,.2),transparent_30rem),linear-gradient(135deg,#03152f,#082d5e_62%,#031126)] px-4 py-12 text-white md:py-16">
        <div className="mx-auto max-w-[1180px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/6 px-3 py-1.5 text-xs font-black uppercase tracking-[.14em] text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Novidades Digital
          </span>
          <h1 className="mt-5 max-w-4xl text-4xl font-black tracking-[-.05em] md:text-6xl">
            Leia, assista e aprenda no formato certo para cada conteúdo.
          </h1>
          <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
            A biblioteca está a ser normalizada para reunir e-books, aulas, webinars,
            formações completas, vídeo, áudio, downloads e experiências nativas de
            WebReader e WebPlayer.
          </p>

          <div className="mt-7 flex flex-wrap gap-2">
            {formats.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/12 bg-white/6 px-4 text-xs font-black text-white transition hover:border-cyan-300/40">
                  <Icon className="h-4 w-4 text-cyan-300" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-8">
        <div className="grid gap-3 md:grid-cols-[1fr_auto]">
          <div className="flex items-start gap-3 rounded-2xl border border-blue-100 bg-white p-4 text-sm leading-6 text-slate-600 shadow-sm">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-blue-700" />
            <p>
              O catálogo está em rebaseline. Direitos, fontes, QA, oferta ARO e
              entitlement serão homologados por release antes de qualquer venda.
            </p>
          </div>
          <Link href="/conteudos-digitais/biblioteca" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-[#07142a] px-5 text-sm font-black text-white">
            <LibraryBig className="h-4 w-4" />
            Minha biblioteca
          </Link>
        </div>

        <div className="mt-10 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">Catálogo legado em revisão</p>
            <h2 className="mt-1 text-3xl font-black tracking-[-.04em] text-[#07142a]">Produtos digitais já estruturados</h2>
          </div>
        </div>

        {products.length ? (
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <li key={product.id}>
                <ProductCard product={product} className="h-full" />
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-500">
            O catálogo comercial será republicado release a release após homologação.
          </div>
        )}

        <section className="mt-12 rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">Ferramentas & extras</p>
          <h2 className="mt-2 text-2xl font-black tracking-[-.03em] text-[#07142a]">
            Recursos atuais serão curados como freebies, bónus ou packs.
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-600">
            Templates, ferramentas e materiais existentes deixam de competir com o
            produto principal. Os que tiverem qualidade e direitos claros podem voltar
            como downloads, bónus ou produtos complementares.
          </p>
          <Link href="/ferramentas" className="mt-5 inline-flex items-center gap-2 text-sm font-black text-blue-700">
            Ver ferramentas existentes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </section>
      </section>
    </main>
  );
}

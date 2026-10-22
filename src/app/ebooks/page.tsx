import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Layers3,
  LockKeyhole,
  PackageOpen,
  ShieldCheck,
} from "lucide-react";
import { EBOOKS, EBOOK_CATEGORIES } from "@/lib/ebooks";

export const metadata: Metadata = {
  title: "E-Books & Packs Digitais",
  description:
    "Biblioteca editorial de E-Books e packs em revalidação de conteúdo, direitos, checkout ARO e acesso digital.",
  alternates: { canonical: "https://novidades.store/ebooks" },
};

function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}

export default function EbooksPage() {
  const live = EBOOKS.filter((item) => item.status === "live");
  const packs = EBOOKS.filter((item) => item.kind === "pack");
  const upcoming = EBOOKS.filter(
    (item) => item.status === "preparing" && item.kind === "ebook",
  );

  return (
    <main className="min-h-screen bg-[#f5f7fb] text-slate-950">
      <section className="overflow-hidden bg-[radial-gradient(circle_at_78%_18%,rgba(56,189,248,.2),transparent_28rem),linear-gradient(135deg,#020817,#082047_62%,#07162e)] text-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-12 md:px-6 md:py-16 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/5 px-3 py-1.5 text-xs font-black uppercase tracking-[0.14em] text-cyan-200">
              <BookOpen className="h-4 w-4" />
              Biblioteca Digital Novidades
            </span>
            <h1 className="mt-6 max-w-4xl text-4xl font-black tracking-[-0.05em] md:text-6xl">
              E-Books individuais e packs, organizados para encontrar e comprar sem complicação.
            </h1>
            <p className="mt-5 max-w-3xl text-sm leading-7 text-slate-300 md:text-base">
              Catálogo curado e reconstruído a partir do nosso acervo editorial. Cada edição
              comercial separa o RAW SOURCE da versão moderna, com QA por risco, Reader
              protegido e pagamento individual.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href="#disponiveis"
                className="inline-flex h-12 items-center gap-2 rounded-xl bg-cyan-400 px-5 text-sm font-black text-slate-950"
              >
                Ver disponíveis
                <ArrowRight className="h-4 w-4" />
              </a>
              <Link
                href="/conteudos-digitais/biblioteca"
                className="inline-flex h-12 items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 text-sm font-bold text-white"
              >
                Minha biblioteca
              </Link>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {[
              [ShieldCheck, "Curadoria", "Venda só depois do QA editorial e de direitos."],
              [LockKeyhole, "Acesso protegido", "Pagamento confirmado antes de liberar o conteúdo."],
              [PackageOpen, "Compra única", "Sem assinatura escondida nos títulos desta coleção."],
              [Layers3, "Packs", "Combinações temáticas com acesso aos títulos incluídos."],
            ].map(([Icon, title, text]) => {
              const IconComponent = Icon as typeof ShieldCheck;
              return (
                <div key={String(title)} className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                  <IconComponent className="h-6 w-6 text-cyan-300" />
                  <p className="mt-4 font-extrabold">{String(title)}</p>
                  <p className="mt-2 text-xs leading-5 text-slate-300">{String(text)}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1280px] gap-2 overflow-x-auto px-4 py-4 md:px-6 lg:px-8">
          {EBOOK_CATEGORIES.map((category) => (
            <a
              key={category.slug}
              href={`#${category.slug}`}
              className="whitespace-nowrap rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-300 hover:bg-blue-50"
            >
              {category.name}
            </a>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 pt-8 md:px-6 lg:px-8">
        <Link
          href="/relacionamentos"
          className="group grid gap-5 overflow-hidden rounded-[24px] bg-[radial-gradient(circle_at_85%_10%,rgba(244,114,182,.28),transparent_24rem),linear-gradient(135deg,#211619,#512431_72%,#25151a)] p-6 text-white shadow-[0_18px_50px_rgba(45,25,32,.16)] md:grid-cols-[1fr_auto] md:items-center md:p-8"
        >
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.16em] text-rose-200">
              Novo · Quiz Relacionamentos
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.045em]">
              Não sabe qual guia escolher? Descubra em 4 perguntas.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-6 text-white/65">
              O quiz recomenda o melhor ponto de partida entre encontros, reconexão,
              romance e recomeços — e compara o título individual com o pack completo.
            </p>
          </div>
          <span className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-rose-200 px-5 text-sm font-black text-slate-950 transition group-hover:scale-[1.02]">
            Fazer quiz
            <ArrowRight className="h-4 w-4" />
          </span>
        </Link>
      </section>

      <section id="disponiveis" className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.14em] text-blue-700">
              Catálogo editorial em revalidação
            </p>
            <h2 className="mt-1 text-3xl font-black tracking-[-0.04em]">
              Biblioteca em expansão · {live.filter((item) => item.kind === "ebook").length} títulos estruturados
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-6 text-slate-500">
            Edições aprovadas para venda com entrega digital ativa. Materiais antigos
            são reescritos quando necessário; títulos ainda sem QA permanecem bloqueados.
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {live.filter((item) => item.kind === "ebook").map((item) => (
            <Link
              key={item.slug}
              href={`/ebooks/${item.slug}`}
              className="group overflow-hidden rounded-[22px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,.08)] transition hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(15,23,42,.14)]"
            >
              <div className={`relative aspect-[4/5] overflow-hidden bg-gradient-to-br ${item.coverTone} text-white`}>
                {item.coverImage ? (
                  <Image
                    src={item.coverImage}
                    alt={item.coverAlt ?? item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/15 to-slate-950/15" />
                <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="rounded-full border border-white/25 bg-black/20 px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.16em] text-white/90 backdrop-blur">
                    E-Book
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.14em] text-white/65">
                    Novidades
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="max-w-[92%] text-2xl font-black leading-[1.02] tracking-[-0.045em] drop-shadow-lg">
                    {item.title}
                  </p>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-white/70">
                    Pré-capa editorial
                  </p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[10px] font-black uppercase tracking-[0.12em] text-blue-700">
                  {item.category}
                </p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                  {item.subtitle}
                </p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-xl font-black text-slate-950">{money(item.price)}</span>
                  <span className="inline-flex items-center gap-1 text-xs font-black text-blue-700">
                    Ver E-Book
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 text-white">
        <div className="mx-auto max-w-[1280px] px-4 py-10 md:px-6 lg:px-8">
          <p className="text-xs font-black uppercase tracking-[0.14em] text-cyan-300">Packs</p>
          <h2 className="mt-1 text-3xl font-black tracking-[-0.04em]">
            Mais conteúdo numa única compra
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {packs.map((item) => (
              <Link
                key={item.slug}
                href={`/ebooks/${item.slug}`}
                className="grid gap-5 rounded-[24px] border border-white/10 bg-white/5 p-6 transition hover:border-cyan-300/40 md:grid-cols-[.8fr_1.2fr]"
              >
                <div className={`rounded-2xl bg-gradient-to-br ${item.coverTone} p-5`}>
                  <PackageOpen className="h-7 w-7 text-white/80" />
                  <p className="mt-8 text-2xl font-black leading-tight">{item.title}</p>
                </div>
                <div>
                  <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-2xl font-black">{money(item.price)}</span>
                    {item.compareAt ? (
                      <span className="pb-1 text-sm text-slate-500 line-through">
                        {money(item.compareAt)}
                      </span>
                    ) : null}
                  </div>
                  <span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-cyan-300">
                    Ver pack <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-4 py-12 md:px-6 lg:px-8">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-amber-700">
          Próximos títulos
        </p>
        <h2 className="mt-1 text-3xl font-black tracking-[-0.04em]">
          Já catalogados, mas ainda bloqueados para venda
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-500">
          Estes produtos ficam públicos para dar transparência ao catálogo, mas não
          aceitam pagamento enquanto atualização, revisão técnica ou packaging não
          estiverem concluídos.
        </p>

        <div className="mt-7 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((item) => (
            <Link
              id={item.categorySlug}
              key={item.slug}
              href={`/ebooks/${item.slug}`}
              className="group grid min-h-[190px] grid-cols-[118px_1fr] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,.05)] transition hover:-translate-y-0.5 hover:border-blue-300 hover:shadow-[0_14px_34px_rgba(15,23,42,.1)]"
            >
              <div className={`relative min-h-full overflow-hidden bg-gradient-to-br ${item.coverTone}`}>
                {item.coverImage ? (
                  <Image
                    src={item.coverImage}
                    alt={item.coverAlt ?? item.title}
                    fill
                    sizes="118px"
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-slate-950/10" />
                <BookOpen className="absolute bottom-3 right-3 h-5 w-5 text-white/80" />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-[0.12em] text-slate-500">
                      {item.category}
                    </p>
                    <h3 className="mt-1 text-lg font-black leading-tight">{item.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-black text-amber-900">
                    EM QA
                  </span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">{item.subtitle}</p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-slate-500">
                  <CheckCircle2 className="h-4 w-4 text-slate-400" />
                  Checkout desativado até aprovação
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

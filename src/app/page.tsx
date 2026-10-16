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

const formats = [
  {
    href: "/ebooks",
    title: "E-Books & Guias",
    description: "Leitura digital estruturada, coleções e edições versionadas no WebReader.",
    icon: BookOpen,
  },
  {
    href: "/cursos",
    title: "Cursos & Formações",
    description: "Percursos completos por módulos, aulas, materiais de apoio e comunidade.",
    icon: GraduationCap,
  },
  {
    href: "/aulas",
    title: "Aulas & Vídeos",
    description: "Conteúdo prático em vídeo com previews, WebPlayer e progressão por release.",
    icon: PlayCircle,
  },
  {
    href: "/webinars",
    title: "Webinars",
    description: "Sessões especiais, eventos gravados e conteúdos aprofundados por tema.",
    icon: Radio,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f6f8fb] text-[#07142a]">
      <section className="overflow-hidden bg-[radial-gradient(circle_at_75%_15%,rgba(34,211,238,.24),transparent_28rem),linear-gradient(135deg,#021126,#073465_62%,#03152f)] px-4 py-16 text-white md:py-24">
        <div className="mx-auto max-w-[1180px]">
          <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200/20 bg-white/7 px-3 py-1.5 text-xs font-black uppercase tracking-[.14em] text-cyan-200">
            <Sparkles className="h-4 w-4" />
            Conteúdo para aprender, aplicar e evoluir
          </span>

          <h1 className="mt-6 max-w-5xl text-5xl font-black leading-[.96] tracking-[-.055em] md:text-7xl">
            Conhecimento útil em formatos que cabem na sua rotina.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-slate-300 md:text-lg">
            E-books, aulas, webinars, formações completas e experiências digitais
            curadas. Leia no WebReader, assista no WebPlayer e acesse materiais e
            comunidades associados ao seu conteúdo.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/conteudos-digitais"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-cyan-400 px-6 text-sm font-black text-[#021126] transition hover:bg-cyan-300"
            >
              Explorar conteúdos
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/conteudos-digitais/biblioteca"
              className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-white/20 bg-white/7 px-6 text-sm font-black text-white transition hover:bg-white/12"
            >
              <LibraryBig className="h-4 w-4" />
              Minha biblioteca
            </Link>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Conteúdo homologado", "Direitos, fontes e QA antes da publicação"],
              ["Acesso protegido", "Entitlement comercial separado da mídia"],
              ["Multiformato", "Reader, Player, downloads e comunidade"],
            ].map(([title, body]) => (
              <div key={title} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <ShieldCheck className="h-5 w-5 text-cyan-300" />
                <p className="mt-3 text-sm font-black">{title}</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1180px] px-4 py-12 md:py-16">
        <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">
          Formatos
        </p>
        <div className="mt-2 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <h2 className="max-w-3xl text-3xl font-black tracking-[-.04em] md:text-4xl">
            Uma biblioteca viva, não uma prateleira de ficheiros.
          </h2>
          <Link
            href="/conteudos-digitais"
            className="inline-flex items-center gap-2 text-sm font-black text-blue-700"
          >
            Ver catálogo
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {formats.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                href={item.href}
                className="group rounded-[22px] border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-black">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-500">{item.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-black text-blue-700">
                  Explorar
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white px-4 py-12">
        <div className="mx-auto grid max-w-[1180px] gap-8 md:grid-cols-[1fr_.75fr] md:items-center">
          <div>
            <p className="text-xs font-black uppercase tracking-[.14em] text-blue-700">
              Descobrir antes de comprar
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-[-.04em]">
              A primeira aula, um trecho ou um preview pode ser aberto.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              A experiência foi desenhada para separar conteúdo de descoberta do
              conteúdo premium. Uma release pode combinar preview público, WebReader
              ou WebPlayer protegido, downloads e acesso a comunidade.
            </p>
          </div>
          <div className="rounded-[24px] bg-[#07142a] p-6 text-white">
            <PlayCircle className="h-8 w-8 text-cyan-300" />
            <p className="mt-5 text-sm font-black">WebPlayer + WebReader</p>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              O acesso final será validado pelo entitlement ARO, independentemente
              de onde o ficheiro ou vídeo esteja alojado.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

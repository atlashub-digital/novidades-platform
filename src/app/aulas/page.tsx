import Link from "next/link";
import { PlayCircle, ArrowLeft, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Aulas & Vídeos",
  robots: { index: true, follow: true },
};

export default function Page() {
  return (
    <main className="min-h-[70vh] bg-[#f5f8fc] px-4 py-12">
      <section className="mx-auto max-w-[900px]">
        <Link href="/conteudos-digitais" className="inline-flex items-center gap-2 text-sm font-bold text-slate-500">
          <ArrowLeft className="h-4 w-4" />
          Conteúdos digitais
        </Link>
        <div className="mt-8 rounded-[28px] bg-[#07142a] p-8 text-white md:p-12">
          <PlayCircle className="h-9 w-9 text-cyan-300" />
          <h1 className="mt-5 text-4xl font-black tracking-[-.05em] md:text-5xl">Aulas & Vídeos</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300">Aulas individuais, séries e previews em vídeo preparados para o WebPlayer protegido.</p>
        </div>
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
          <p>O catálogo desta área está em homologação. Nenhum item é declarado vendável até direitos, conteúdo, media, ARO e acesso passarem pelos gates documentados.</p>
        </div>
      </section>
    </main>
  );
}

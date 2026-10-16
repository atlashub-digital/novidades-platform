import Link from "next/link";
import { BookOpen, ShieldCheck } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="bg-[#011126] text-white">
      <div className="mx-auto grid w-full max-w-[1280px] gap-6 px-4 py-8 md:grid-cols-[1fr_auto] md:items-end md:px-6">
        <div>
          <div className="flex items-center gap-2 text-sm font-black">
            <BookOpen className="h-4 w-4 text-cyan-300" />
            Novidades.store
          </div>
          <p className="mt-2 max-w-xl text-xs leading-5 text-white/50">
            Conteúdo digital, aprendizagem e experiências multimédia com publicação versionada e acesso protegido.
          </p>
          <p className="mt-4 text-[9px] text-white/34">
            © {new Date().getFullYear()} Novidades.store. Todos os direitos reservados.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] text-white/55">
          <Link href="/termos" className="hover:text-cyan-300">Termos</Link>
          <Link href="/privacidade" className="hover:text-cyan-300">Privacidade</Link>
          <Link href="/cookies" className="hover:text-cyan-300">Cookies</Link>
          <Link href="/ajuda" className="hover:text-cyan-300">Ajuda</Link>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            Acesso digital protegido
          </span>
        </div>
      </div>
    </footer>
  );
}

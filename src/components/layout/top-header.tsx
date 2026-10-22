import Image from "next/image";
import Link from "next/link";
import { BookOpen, GraduationCap, LibraryBig, PlayCircle, Radio } from "lucide-react";

const nav = [
  { href: "/conteudos-digitais", label: "Conteúdos", icon: BookOpen },
  { href: "/cursos", label: "Cursos", icon: GraduationCap },
  { href: "/aulas", label: "Aulas", icon: PlayCircle },
  { href: "/webinars", label: "Webinars", icon: Radio },
  { href: "/ebooks", label: "E-Books", icon: BookOpen },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-cyan-200/10 bg-[#021a38]/95 text-white shadow-[0_8px_28px_rgba(0,8,28,.2)] backdrop-blur">
      <div className="mx-auto flex min-h-[72px] w-full max-w-[1280px] items-center gap-4 px-4 md:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2" aria-label="Novidades.store">
          <span className="relative block h-12 w-12 overflow-hidden rounded-lg">
            <Image src="/brand/reference/header-logo.webp" alt="" fill priority sizes="48px" className="object-cover" />
          </span>
          <div className="leading-none">
            <p className="nv-display text-xl font-black tracking-[-.045em]">Novidades</p>
            <p className="mt-1 text-[8px] font-black tracking-[.42em] text-cyan-300">STORE</p>
          </div>
        </Link>

        <nav className="scrollbar-none ml-auto hidden items-center gap-1 overflow-x-auto md:flex" aria-label="Navegação principal">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link key={item.href} href={item.href} className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-lg px-3 text-xs font-extrabold text-white/78 transition hover:bg-white/7 hover:text-cyan-300">
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Link href="/conteudos-digitais/biblioteca" className="ml-auto inline-flex h-10 items-center gap-2 rounded-lg border border-cyan-300/25 bg-cyan-300/10 px-3 text-xs font-black text-cyan-200 md:ml-2">
          <LibraryBig className="h-4 w-4" />
          <span className="hidden sm:inline">Biblioteca</span>
        </Link>
      </div>

      <nav className="scrollbar-none flex gap-1 overflow-x-auto border-t border-white/7 px-3 py-2 md:hidden" aria-label="Navegação mobile">
        {nav.map((item) => (
          <Link key={item.href} href={item.href} className="shrink-0 rounded-full bg-white/6 px-3 py-1.5 text-[10px] font-black text-white/80">
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

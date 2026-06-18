import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#6f1018]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex flex-col leading-none text-white">
          <span className="font-serif text-3xl font-bold tracking-tight">
            Popidi
          </span>

          <span className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">
            Pizzaria
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
          <Link href="/#inicio" className="transition hover:text-white">
            Início
          </Link>

          <Link href="/#cardapio" className="transition hover:text-white">
            Cardápio
          </Link>

          <Link href="/#sobre" className="transition hover:text-white">
            Sobre Nós
          </Link>

          <Link href="/#contato" className="transition hover:text-white">
            Contato
          </Link>
        </nav>

        <Link
          href="/#contato"
          className="rounded-md bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
        >
          Peça Agora
        </Link>
      </div>
    </header>
  );
}
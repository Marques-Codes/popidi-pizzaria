import Image from "next/image";
import { SectionScrollLink } from "@/components/section-scroll-link";

const orderUrl = "https://pratodigital.com.br/pizzariapopidi/#/&s=4akMkWVkuI";

export function SiteHeader() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full bg-[#6f1018]">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        <SectionScrollLink href="/#inicio" className="flex items-center">
          <Image
            src="/images/head/01.png"
            alt="Popidi Delivery"
            width={120}
            height={50}
            priority
            className="h-auto w-auto object-contain"
          />
        </SectionScrollLink>

        <nav className="hidden items-center gap-8 text-sm font-medium text-white/80 md:flex">
          <SectionScrollLink
            href="/#inicio"
            className="transition hover:text-white"
          >
            Início
          </SectionScrollLink>

          <SectionScrollLink
            href="/#cardapio"
            className="transition hover:text-white"
          >
            Cardápio
          </SectionScrollLink>

          <SectionScrollLink
            href="/#sobre"
            className="transition hover:text-white"
          >
            Sobre Nós
          </SectionScrollLink>

          <SectionScrollLink
            href="/#contato"
            className="transition hover:text-white"
          >
            Contato
          </SectionScrollLink>
        </nav>

        <a
          href={orderUrl}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
        >
          Faça o seu pedido
        </a>
      </div>
    </header>
  );
}
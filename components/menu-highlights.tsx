import Image from "next/image";

const menuItems = [
  {
    title: "Salgadas",
    description: "Clássicas e especiais para todos os gostos.",
    button: "Ver opções",
    href: "/cardapio/salgadas",
    image: "/images/menu/pizza-salgada.jpg",
    alt: "Pizza salgada da Pópidi Pizzaria",
  },
  {
    title: "Doces",
    description: "Pizzas doces irresistíveis para adoçar seu dia.",
    button: "Ver opções",
    href: "/cardapio/doces",
    image: "/images/menu/pizza-doce.jpg",
    alt: "Pizza doce da Pópidi Pizzaria",
  },
  {
    title: "Bebidas",
    description: "Refrigerantes, sucos e muito mais.",
    button: "Ver opções",
    href: "/cardapio/bebidas",
    image: "/images/menu/bebidas.webp",
    alt: "Bebidas geladas da Pópidi Pizzaria",
  },
  {
    title: "Combos",
    description: "Combos completos para compartilhar e economizar.",
    button: "Ver opções",
    href: "/cardapio/combos",
    image: "/images/menu/combo.jpg",
    alt: "Combo de pizza da Pópidi Pizzaria",
  },
];

export function MenuHighlights() {
  return (
    <section
      id="cardapio"
      className="scroll-mt-28 bg-[#fff8ed] px-6 py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 text-center">
          <div className="mx-auto mb-4 h-px w-24 bg-[#f5bf24]" />

          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#b20f18]">
            Nosso cardápio
          </p>

          <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17120f] md:text-5xl">
            Destaques do Cardápio
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-black/60">
            Uma seleção pensada para quem ama pizza de verdade: sabores
            tradicionais, opções doces, bebidas e combos para todos os momentos.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {menuItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition duration-500 hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                <div className="absolute bottom-4 left-4 rounded-full bg-[#f5bf24] px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-black shadow-lg">
                  {item.title}
                </div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-2xl font-black text-[#b20f18]">
                  {item.title}
                </h3>

                <p className="mt-3 min-h-12 text-sm leading-6 text-black/60">
                  {item.description}
                </p>

                <a
                  href={item.href}
                  className="mt-6 inline-flex rounded-full bg-[#f5bf24] px-5 py-2 text-sm font-black text-black transition hover:bg-[#e0aa13]"
                >
                  {item.button}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
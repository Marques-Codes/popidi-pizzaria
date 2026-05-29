const menuItems = [
  {
    title: "Salgadas",
    description: "Clássicas e especiais para todos os gostos.",
    button: "Ver opções",
    label: "PIZZA",
    href: "/cardapio/salgadas",
    gradient: "from-red-950 via-red-800 to-orange-500",
  },
  {
    title: "Doces",
    description: "Pizzas doces irresistíveis para adoçar seu dia.",
    button: "Ver opções",
    label: "DOCE",
    href: "/cardapio/doces",
    gradient: "from-stone-950 via-amber-950 to-yellow-700",
  },
  {
    title: "Bebidas",
    description: "Refrigerantes, sucos e muito mais.",
    button: "Ver opções",
    label: "DRINK",
    href: "/cardapio/bebidas",
    gradient: "from-zinc-950 via-stone-800 to-amber-600",
  },
  {
    title: "Combos",
    description: "Combos completos para compartilhar e economizar.",
    button: "Ver opções",
    label: "COMBO",
    href: "/cardapio/combos",
    gradient: "from-red-950 via-black to-yellow-700",
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
              <div
                className={`relative flex h-44 items-center justify-center bg-gradient-to-br ${item.gradient}`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.25),transparent_32%)]" />

                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border-4 border-white/30 bg-black/25 text-sm font-black tracking-[0.18em] text-white shadow-2xl backdrop-blur">
                  {item.label}
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
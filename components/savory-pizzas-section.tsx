const savoryPizzas = [
  {
    name: "Margherita",
    description: "Molho de tomate, muçarela, tomate fresco, manjericão e azeite.",
    price: "R$ 44,90",
    highlight: true,
  },
  {
    name: "Calabresa",
    description: "Molho de tomate, muçarela, calabresa fatiada e cebola.",
    price: "R$ 46,90",
    highlight: false,
  },
  {
    name: "Frango com Catupiry",
    description: "Molho de tomate, muçarela, frango desfiado e catupiry.",
    price: "R$ 49,90",
    highlight: false,
  },
  {
    name: "Portuguesa",
    description: "Molho de tomate, muçarela, presunto, ovos, cebola, pimentão e azeitonas.",
    price: "R$ 48,90",
    highlight: false,
  },
  {
    name: "Quatro Queijos",
    description: "Muçarela, provolone, parmesão, gorgonzola e molho de tomate.",
    price: "R$ 52,90",
    highlight: true,
  },
  {
    name: "Lombo Canadense",
    description: "Molho de tomate, muçarela, lombo canadense e cebola.",
    price: "R$ 49,90",
    highlight: false,
  },
];

const categoryLinks = [
  {
    label: "Pizzas Salgadas",
    href: "#pizzas-salgadas",
    active: true,
  },
  {
    label: "Pizzas Doces",
    href: "#pizzas-doces",
    active: false,
  },
  {
    label: "Bebidas",
    href: "#bebidas",
    active: false,
  },
  {
    label: "Combos",
    href: "#combos",
    active: false,
  },
];

export function SavoryPizzasSection() {
  return (
    <section
      id="pizzas-salgadas"
      className="scroll-mt-28 bg-[#fff8ed] px-6 pb-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] border border-black/10 bg-white p-6 shadow-2xl shadow-black/5 md:p-10">
          <div className="mb-10 flex flex-col gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#b20f18]">
                Cardápio completo
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17120f] md:text-5xl">
                Pizzas Salgadas
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
                Sabores clássicos e especiais preparados com massa artesanal,
                molho selecionado e ingredientes frescos.
              </p>
            </div>

            <a
              href="https://wa.me/5511987654321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit rounded-full bg-[#23a334] px-6 py-3 text-sm font-black text-white shadow-lg transition hover:scale-105"
            >
              Pedir pelo WhatsApp
            </a>
          </div>

          <div className="mb-10 flex flex-wrap gap-3">
            {categoryLinks.map((category) => (
              <a
                key={category.label}
                href={category.href}
                className={`rounded-full px-5 py-3 text-sm font-black transition ${
                  category.active
                    ? "bg-[#b20f18] text-white"
                    : "bg-[#fff8ed] text-black/70 hover:bg-[#f5bf24] hover:text-black"
                }`}
              >
                {category.label}
              </a>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <div className="overflow-hidden rounded-3xl bg-[#111] text-white">
              <div className="relative min-h-80 bg-[radial-gradient(circle_at_50%_40%,#f8c14a_0%,#d56b16_30%,#8d1016_60%,#250406_100%)]">
                <div className="absolute left-8 top-8 rounded-full bg-[#f5bf24] px-5 py-4 text-center font-black text-[#b20f18] shadow-xl">
                  <span className="block text-xs uppercase tracking-widest">
                    Mais pedidas
                  </span>
                  <span className="block text-3xl">6</span>
                </div>

                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f5bf24]">
                    Pópidi Pizzaria
                  </p>

                  <h3 className="mt-3 text-3xl font-black leading-tight">
                    Sabores para todos os momentos.
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/70">
                    Quando as fotos reais chegarem, este bloco será substituído
                    por uma imagem bonita da pizza principal.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {savoryPizzas.map((pizza) => (
                <article
                  key={pizza.name}
                  className="rounded-3xl border border-black/10 bg-[#fff8ed] p-6 transition hover:-translate-y-1 hover:bg-white hover:shadow-xl hover:shadow-black/5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-black text-[#17120f]">
                          {pizza.name}
                        </h3>

                        {pizza.highlight ? (
                          <span className="rounded-full bg-[#f5bf24] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                            Popular
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-3 text-sm leading-6 text-black/60">
                        {pizza.description}
                      </p>
                    </div>

                    <strong className="shrink-0 text-lg font-black text-[#b20f18]">
                      {pizza.price}
                    </strong>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div
            id="pizzas-doces"
            className="mt-10 rounded-3xl border border-dashed border-[#b20f18]/30 bg-[#fff8ed] p-6 text-center"
          >
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b20f18]">
              Também temos pizzas doces
            </p>

            <h3 className="mt-3 text-2xl font-black text-[#17120f]">
              Quer ver as opções doces também?
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-black/60">
              Na próxima etapa vamos montar a lista completa de pizzas doces.
              Por enquanto, esse espaço já fica preparado para o cliente navegar
              sem se perder.
            </p>

            <a
              href="#pizzas-doces"
              className="mt-5 inline-flex rounded-full bg-[#f5bf24] px-6 py-3 text-sm font-black text-black transition hover:bg-[#e0aa13]"
            >
              Ver pizzas doces
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
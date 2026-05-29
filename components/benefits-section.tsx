const benefits = [
  {
    title: "Ingredientes Frescos",
    description: "Selecionamos os melhores ingredientes todos os dias.",
    icon: "✦",
  },
  {
    title: "Entrega Rápida",
    description: "Seu pedido chega quentinho e no tempo certo.",
    icon: "↗",
  },
  {
    title: "Combos Especiais",
    description: "Opções deliciosas com preços que cabem no bolso.",
    icon: "★",
  },
];

export function BenefitsSection() {
  return (
    <section className="border-b border-black/10 bg-[#fff8ed]">
      <div className="mx-auto grid max-w-7xl gap-6 px-6 py-10 md:grid-cols-3">
        {benefits.map((benefit) => (
          <div
            key={benefit.title}
            className="flex items-center gap-5 border-black/10 md:border-r md:last:border-r-0"
          >
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#f5bf24] text-2xl font-black text-black">
              {benefit.icon}
            </div>

            <div>
              <h2 className="text-xl font-black text-[#17120f]">
                {benefit.title}
              </h2>
              <p className="mt-1 max-w-xs text-sm leading-6 text-black/65">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
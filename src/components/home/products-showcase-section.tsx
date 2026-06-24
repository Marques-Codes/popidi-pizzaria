import Image from "next/image";

const showcaseItems = [
  {
    title: "Pizzas preparadas com sabor e tradição",
    description:
      "Massas douradas, ingredientes selecionados e aquele sabor marcante que combina com qualquer momento.",
    image: "/images/home/pizza-forno.png",
    alt: "Pizza artesanal preparada no forno",
  },
  {
    title: "Esfirras doces e salgadas para completar o pedido",
    description:
      "Opções de esfirras bem recheadas, feitas com cuidado para deixar a experiência ainda mais completa.",
    image: "/images/home/esfirras-forno.png",
    alt: "Esfirras doces e salgadas da Popidi",
  },
];

export function ProductsShowcaseSection() {
  return (
    <section className="bg-[#fff7ed] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Sabor em cada detalhe
          </p>

          <h2 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-6xl">
            Pizzas e esfirras feitas para surpreender
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#76524a]">
            Da pizza saindo do forno às esfirras doces e salgadas, a Popidi
            prepara cada pedido com cuidado, qualidade e muito sabor.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {showcaseItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl bg-[#3a0a0f] shadow-sm ring-1 ring-[#6f1018]/10"
            >
              <div className="relative h-[360px] overflow-hidden md:h-[440px]">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-9">
                  <h3 className="font-serif text-3xl font-bold leading-tight md:text-4xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 max-w-xl text-sm leading-7 text-white/85 md:text-base">
                    {item.description}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
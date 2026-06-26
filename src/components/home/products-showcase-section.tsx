import Image from "next/image";

const showcaseItems = [
  {
    title: "Pizzas preparadas com sabor e tradição",
    description:
      "Massas douradas, ingredientes selecionados e aquele sabor marcante que combina com qualquer momento.",
    image: "/images/home/products/pizza-margherita.jpg",
    alt: "Pizza da Popidi com queijo derretido",
  },
  {
    title: "Esfirras salgadas para completar o pedido",
    description:
      "Opções bem recheadas, preparadas com cuidado para deixar cada pedido ainda mais completo.",
    image: "/images/home/products/esfiha-salgada.jpg",
    alt: "Esfirras salgadas da Popidi",
  },
  {
    title: "Esfirras doces para finalizar com sabor",
    description:
      "Sabores doces, cremosos e especiais para quem quer terminar o pedido com aquele toque gostoso.",
    image: "/images/home/products/esfiha-doce.jpg",
    alt: "Esfirras doces da Popidi",
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
            Da pizza às esfirras doces e salgadas, a Popidi prepara cada pedido
            com cuidado, qualidade e muito sabor.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {showcaseItems.map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-3xl bg-[#3a0a0f] shadow-sm ring-1 ring-[#6f1018]/10"
            >
              <div className="relative h-[360px] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                  <h3 className="font-serif text-3xl font-bold leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-white/85">
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

import Link from "next/link";

const menuItems = [
  {
    name: "Calabresa",
    tag: "Tradicional",
    description:
      "Molho especial, muçarela, calabresa fatiada, cebola e orégano.",
    price: "A partir de R$ 39,90",
    image: "/images/menu/pizza-card-1.jpg",
  },
  {
    name: "Frango com Catupiry",
    tag: "Clássica",
    description: "Frango desfiado, muçarela, Catupiry cremoso e orégano.",
    price: "A partir de R$ 44,90",
    image: "/images/menu/pizza-card-2.webp",
  },
  {
    name: "Quatro Queijos",
    tag: "Especial",
    description:
      "Muçarela, provolone, parmesão, Catupiry e um toque especial da casa.",
    price: "A partir de R$ 46,90",
    image: "/images/menu/pizza-card-3.jpg",
  },
  {
    name: "Portuguesa",
    tag: "Tradicional",
    description: "Presunto, ovos, cebola, muçarela, azeitonas, milho e orégano.",
    price: "A partir de R$ 42,90",
    image: "/images/menu/pizza-card-4.jpg",
  },
  {
    name: "Moda da Casa",
    tag: "Da Popidi",
    description:
      "Uma combinação especial pensada para quem quer experimentar algo marcante.",
    price: "A partir de R$ 49,90",
    image: "/images/menu/pizza-card-5.jpg",
  },
  {
    name: "Chocolate com Morango",
    tag: "Doce",
    description:
      "Chocolate cremoso, morangos selecionados e finalização especial.",
    price: "A partir de R$ 45,90",
    image: "/images/menu/pizza-card-6.jpg",
  },
];

export function MenuHighlightsSection() {
  return (
    <section id="cardapio" className="bg-[#fff7ed] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Nosso cardápio
          </p>

          <h2 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-6xl">
            Destaques da Popidi
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#76524a]">
            Conheça algumas opções preparadas para deixar seu pedido ainda mais
            gostoso.
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {menuItems.map((item) => (
            <article
              key={item.name}
              className="overflow-hidden rounded-2xl bg-[#f6efe8] shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="relative h-64 bg-cover bg-center"
                style={{
                  backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.35)), url(${item.image})`,
                }}
              >
                <span className="absolute left-5 top-5 rounded-full bg-[#b51f2b] px-4 py-2 text-xs font-bold text-white">
                  {item.tag}
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="font-serif text-2xl font-semibold text-[#3a0a0f]">
                    {item.name}
                  </h3>

                  <p className="max-w-32 text-right text-sm font-bold leading-6 text-[#d79a22]">
                    {item.price}
                  </p>
                </div>

                <p className="mt-4 text-sm leading-7 text-[#76524a]">
                  {item.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/cardapio"
            className="inline-flex rounded-md bg-[#e5393f] px-8 py-4 text-base font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
          >
            Ver cardápio completo
          </Link>
        </div>
      </div>
    </section>
  );
}
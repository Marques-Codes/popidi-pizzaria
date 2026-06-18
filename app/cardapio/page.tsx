import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";

type MenuItem = {
  name: string;
  description: string;
  price: string;
  image: string;
};

const savoryPizzas: MenuItem[] = [
  {
    name: "Calabresa",
    description:
      "Molho especial, muçarela, calabresa fatiada, cebola e orégano.",
    price: "R$ 39,90",
    image: "/images/menu/pizza-card-1.jpg",
  },
  {
    name: "Frango com Catupiry",
    description: "Frango desfiado, muçarela, Catupiry cremoso e orégano.",
    price: "R$ 44,90",
    image: "/images/menu/pizza-card-2.webp",
  },
  {
    name: "Quatro Queijos",
    description:
      "Muçarela, provolone, parmesão, Catupiry e um toque especial da casa.",
    price: "R$ 46,90",
    image: "/images/menu/pizza-card-3.jpg",
  },
  {
    name: "Portuguesa",
    description: "Presunto, ovos, cebola, muçarela, azeitonas, milho e orégano.",
    price: "R$ 42,90",
    image: "/images/menu/pizza-card-4.jpg",
  },
  {
    name: "Moda da Casa",
    description:
      "Uma combinação especial da Popidi para quem quer experimentar algo marcante.",
    price: "R$ 49,90",
    image: "/images/menu/pizza-card-5.jpg",
  },
];

const sweetPizzas: MenuItem[] = [
  {
    name: "Chocolate com Morango",
    description:
      "Chocolate cremoso, morangos selecionados e finalização especial.",
    price: "R$ 45,90",
    image: "/images/menu/pizza-card-6.jpg",
  },
  {
    name: "Brigadeiro",
    description:
      "Chocolate, granulado e cobertura cremosa para quem ama pizza doce.",
    price: "R$ 42,90",
    image: "/images/menu/pizza-card-6.jpg",
  },
  {
    name: "Romeu e Julieta",
    description:
      "Muçarela, goiabada cremosa e uma combinação clássica de sabor.",
    price: "R$ 43,90",
    image: "/images/menu/pizza-card-6.jpg",
  },
];

const drinks: MenuItem[] = [
  {
    name: "Coca-Cola 2L",
    description: "Refrigerante Coca-Cola 2 litros.",
    price: "R$ 14,00",
    image: "/images/menu/drink-card-1.webp",
  },
  {
    name: "Guaraná 2L",
    description: "Refrigerante Guaraná 2 litros.",
    price: "R$ 12,00",
    image: "/images/menu/drink-card-2.jpg",
  },
  {
    name: "Suco Natural",
    description: "Opções de sucos para acompanhar seu pedido.",
    price: "R$ 9,00",
    image: "/images/menu/drink-card-3.webp",
  },
];

function MenuCategory({
  title,
  description,
  items,
}: {
  title: string;
  description: string;
  items: MenuItem[];
}) {
  return (
    <section className="mt-20">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
          Cardápio
        </p>

        <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-[#3a0a0f] md:text-5xl">
          {title}
        </h2>

        <p className="mt-4 max-w-2xl text-base leading-8 text-[#76524a]">
          {description}
        </p>
      </div>

      <div className="space-y-5">
        {items.map((item) => (
          <article
            key={item.name}
            className="grid gap-5 overflow-hidden rounded-2xl bg-[#f7efe8] p-4 shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-md md:grid-cols-[180px_1fr_auto] md:items-center md:p-5"
          >
            <div className="relative h-44 overflow-hidden rounded-xl bg-[#e8d7cf] md:h-32">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 180px"
              />
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-[#3a0a0f]">
                {item.name}
              </h3>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#76524a]">
                {item.description}
              </p>
            </div>

            <div className="rounded-xl bg-[#fff7ed] px-5 py-4 text-left ring-1 ring-[#6f1018]/10 md:min-w-36 md:text-right">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b51f2b]">
                Valor
              </p>

              <p className="mt-1 text-xl font-black text-[#d79a22]">
                {item.price}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function CardapioPage() {
  return (
    <>
      <SiteHeader />

      <main className="min-h-screen bg-[#fff7ed] pt-20">
        <section className="px-6 py-20">
          <div className="mx-auto max-w-7xl">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-[#b51f2b] transition hover:text-[#7d1119]"
            >
              <ArrowLeft className="h-4 w-4" />
              Voltar para a página inicial
            </Link>

            <div className="mt-12 max-w-4xl">
              <p className="text-sm font-bold uppercase tracking-[0.32em] text-[#b51f2b]">
                Popidi Pizzaria
              </p>

              <h1 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-7xl">
                Cardápio completo
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-[#76524a]">
                Escolha entre pizzas salgadas, doces e bebidas para montar seu
                pedido do seu jeito. Os valores abaixo são exemplos iniciais e
                podem ser ajustados depois conforme o cardápio real da Popidi.
              </p>
            </div>

            <MenuCategory
              title="Pizzas salgadas"
              description="Sabores tradicionais e especiais para quem ama uma boa pizza bem recheada."
              items={savoryPizzas}
            />

            <MenuCategory
              title="Pizzas doces"
              description="Opções doces para fechar o pedido com aquele sabor especial."
              items={sweetPizzas}
            />

            <MenuCategory
              title="Bebidas"
              description="Bebidas para acompanhar sua pizza, combo ou rodízio."
              items={drinks}
            />

            <div className="mt-20 rounded-3xl bg-[#6f1018] px-8 py-12 text-center text-white">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-yellow-300">
                Faça seu pedido
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
                Gostou de algum sabor?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/80">
                Entre em contato com a Popidi Pizzaria e confirme sabores,
                valores, rodízio, esfihas e opções de delivery.
              </p>

              <a
                href="tel:+554330553535"
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-yellow-400 px-8 py-4 text-base font-black text-[#220305] transition hover:bg-yellow-300"
              >
                <MessageCircle className="h-5 w-5" />
                Pedir agora
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
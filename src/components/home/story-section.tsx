import { Heart, Pizza, Sparkles, UsersRound } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type StoryCard = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const storyCards: StoryCard[] = [
  {
    icon: UsersRound,
    title: "Quem Somos",
    description:
      "Uma marca feita para quem ama pizzas, esfirras, bons momentos e atendimento próximo.",
  },
  {
    icon: Pizza,
    title: "O Que Fazemos",
    description:
      "Preparamos pizzas, esfirras, combos e bebidas com sabor marcante e ingredientes selecionados.",
  },
  {
    icon: Heart,
    title: "Como Fazemos",
    description:
      "Cada pedido é preparado com cuidado, massa saborosa, recheio generoso e aquele toque especial da Popidi.",
  },
  {
    icon: Sparkles,
    title: "Por Que Fazemos",
    description:
      "Para transformar pedidos simples em momentos especiais com pizzas e esfirras bem preparadas.",
  },
];

export function StorySection() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden bg-[#fff7ed] px-6 py-28"
    >
      <div className="absolute inset-0 opacity-[0.45]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,#f0d8bd_1px,transparent_0)] bg-[length:22px_22px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.45em] text-[#b51f2b]">
            Nossa essência
          </p>

          <h2 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-6xl">
            A Realização de um sonho.
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#76524a]">
            A PÓPIDI Delivery nasceu do empreendedorismo e da vontade de
            oferecer um serviço de qualidade e com a máxima eficiência.
            Apoiados na premissa de que cada detalhe é extremamente importante,
            todos os nossos produtos são preparados com ingredientes de primeira
            linha em um ambiente de altíssima higiene e rigoroso controle.
          </p>
        </div>

        <div className="mt-20 grid gap-7 md:grid-cols-2 lg:grid-cols-4">
          {storyCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.title}
                className="rounded-2xl bg-white/75 px-8 py-10 text-center shadow-sm ring-1 ring-[#6f1018]/10 backdrop-blur transition hover:-translate-y-1 hover:shadow-md"
              >
                <Icon className="mx-auto h-10 w-10 text-[#b51f2b]" />

                <h3 className="mt-6 font-serif text-2xl font-semibold text-[#3a0a0f]">
                  {card.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-[#76524a]">
                  {card.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mx-auto mt-20 max-w-3xl text-center">
          <p className="font-serif text-3xl italic leading-tight text-[#5a2a2f] md:text-4xl">
            “Cada pedido carrega o sabor de um bom momento.”
          </p>

          <p className="mt-5 text-sm font-bold text-[#d79a22]">
            — Popidi Delivery
          </p>
        </div>
      </div>
    </section>
  );
}
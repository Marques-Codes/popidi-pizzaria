import {
  BadgeCheck,
  Bike,
  Clock3,
  Flame,
  Gift,
  MapPin,
  Pizza,
  Sandwich,
  Utensils,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Differential = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const differentials: Differential[] = [
  {
    icon: Flame,
    title: "Pizza feita com carinho",
    description:
      "Cada pizza é preparada com atenção, sabor marcante e aquele cuidado que faz diferença no pedido.",
  },
  {
    icon: BadgeCheck,
    title: "Ingredientes selecionados",
    description:
      "Usamos ingredientes pensados para entregar uma pizza saborosa, bonita e bem recheada.",
  },
  {
    icon: Clock3,
    title: "Perfeita para qualquer momento",
    description:
      "Uma boa escolha para jantar em família, encontrar os amigos ou pedir algo especial no fim do dia.",
  },
  {
    icon: Sandwich,
    title: "Salgadas, doces e combos",
    description:
      "Opções para quem ama sabores tradicionais, especiais, doces e pedidos completos.",
  },
  {
    icon: MapPin,
    title: "Feita em Arapongas",
    description:
      "Uma pizzaria local, com identidade própria e atendimento próximo para a cidade de Arapongas.",
  },
  {
    icon: Gift,
    title: "Experiência completa",
    description:
      "Além da pizza, queremos entregar uma experiência gostosa, simples e memorável.",
  },
  {
    icon: Pizza,
    title: "Cardápio variado",
    description:
      "Pizzas salgadas, doces e opções para todos os gostos.",
  },
  {
    icon: Utensils,
    title: "Rodízio e esfihas",
    description:
      "Uma experiência completa para aproveitar com família e amigos.",
  },
  {
    icon: Bike,
    title: "Delivery",
    description:
      "Peça sua pizza e aproveite o sabor da Popidi em casa.",
  },
];

export function DifferentialsSection() {
  return (
    <section id="diferenciais" className="bg-[#f4eee8] px-6 py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Por que nos escolher
          </p>

          <h2 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-6xl">
            Nossos diferenciais
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#76524a]">
            O que torna a Popidi Pizzaria uma escolha especial para quem ama uma
            boa pizza em Arapongas.
          </p>
        </div>

        <div className="mt-20 grid gap-x-20 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
          {differentials.map((item) => {
            const Icon = item.icon;

            return (
              <article key={item.title}>
                <Icon className="h-9 w-9 text-[#b51f2b]" />

                <h3 className="mt-7 font-serif text-2xl font-semibold text-[#3a0a0f]">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-sm text-base leading-8 text-[#76524a]">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
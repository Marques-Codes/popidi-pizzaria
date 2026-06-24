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
    title: "Pizzas e esfirras feitas com carinho",
    description:
      "Cada pedido é preparado com atenção, sabor marcante e aquele cuidado que faz diferença.",
  },
  {
    icon: BadgeCheck,
    title: "Ingredientes selecionados",
    description:
      "Usamos ingredientes pensados para entregar pizzas e esfirras saborosas, bonitas e bem recheadas.",
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
    title: "Atendimento próximo",
    description:
      "Uma marca com identidade própria, atendimento cuidadoso e foco em entregar uma boa experiência.",
  },
  {
    icon: Gift,
    title: "Experiência completa",
    description:
      "Além do sabor, queremos entregar uma experiência gostosa, simples e memorável em cada pedido.",
  },
  {
    icon: Pizza,
    title: "Cardápio variado",
    description:
      "Pizzas, esfirras, bebidas, combos e opções para diferentes momentos e gostos.",
  },
  {
    icon: Utensils,
    title: "Rodízio e esfirras",
    description:
      "Uma experiência completa para aproveitar com família, amigos e quem gosta de variedade.",
  },
  {
    icon: Bike,
    title: "Delivery",
    description:
      "Peça sua pizza ou esfirra e aproveite o sabor da Popidi onde estiver.",
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
            O que torna a Popidi Delivery uma escolha especial para quem ama
            pizzas, esfirras e uma experiência completa.
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
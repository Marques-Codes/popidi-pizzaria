import Image from "next/image";
import { Bike, MousePointerClick, Pizza } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const orderUrl = "https://pratodigital.com.br/pizzariapopidi/#/&s=4akMkWVkuI";

type OrderStep = {
  icon: LucideIcon;
  number: string;
  title: string;
  description: string;
};

const orderSteps: OrderStep[] = [
  {
    icon: Pizza,
    number: "01",
    title: "Escolha seus sabores",
    description:
      "Veja pizzas, esfirras, bebidas e combos preparados para diferentes gostos e momentos.",
  },
  {
    icon: MousePointerClick,
    number: "02",
    title: "Faça seu pedido",
    description:
      "Clique no botão de pedido e finalize diretamente pela plataforma de atendimento da Popidi.",
  },
  {
    icon: Bike,
    number: "03",
    title: "Aproveite do seu jeito",
    description:
      "Receba no delivery ou consulte as opções disponíveis para aproveitar com família e amigos.",
  },
];

export function OrderStepsSection() {
  return (
    <section className="bg-[#fff7ed] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Como funciona
          </p>

          <h2 className="mt-5 font-serif text-5xl font-bold tracking-tight text-[#3a0a0f] md:text-6xl">
            Do cardápio ao seu momento especial
          </h2>

          <p className="mt-6 text-lg leading-8 text-[#76524a]">
            Escolha suas pizzas, esfirras e combos favoritos e faça seu pedido
            de forma simples, rápida e prática.
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {orderSteps.map((step) => {
            const Icon = step.icon;

            return (
              <article
                key={step.title}
                className="relative overflow-hidden rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="absolute right-6 top-5 font-serif text-6xl font-bold text-[#6f1018]/5">
                  {step.number}
                </span>

                <div className="relative z-10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#b51f2b] ring-1 ring-[#6f1018]/10">
                    <Icon className="h-8 w-8" />
                  </div>

                  <h3 className="mt-8 font-serif text-3xl font-bold text-[#3a0a0f]">
                    {step.title}
                  </h3>

                  <p className="mt-4 text-base leading-8 text-[#76524a]">
                    {step.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-14 overflow-hidden rounded-3xl bg-[#3a0a0f] shadow-sm ring-1 ring-[#6f1018]/10">
          <div className="relative h-[360px] md:h-[460px]">
            <Image
              src="/images/home/order-experience.png"
              alt="Pizza preparada com queijo derretido e forno ao fundo"
              fill
              sizes="100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

            <div className="absolute bottom-0 left-0 max-w-3xl p-7 text-white md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-yellow-300">
                Preparado com carinho
              </p>

              <h3 className="mt-4 font-serif text-4xl font-bold leading-tight md:text-5xl">
                Sabor, qualidade e aquele cuidado em cada pedido
              </h3>

              <p className="mt-5 max-w-2xl text-base leading-8 text-white/85">
                Da escolha dos sabores ao momento de aproveitar, a Popidi busca
                entregar uma experiência gostosa, prática e especial.
              </p>

              <a
                href={orderUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex rounded-md bg-[#e5393f] px-8 py-4 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
              >
                Fazer pedido agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

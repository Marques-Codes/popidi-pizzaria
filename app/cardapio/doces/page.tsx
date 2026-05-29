import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const sweetPizzas = [
  {
    name: "Chocolate com Morango",
    description:
      "Chocolate ao leite, morangos frescos e finalização com calda especial.",
    price: "R$ 39,90",
    highlight: true,
    imageLabel: "CHO",
    gradient: "from-stone-950 via-amber-950 to-red-700",
  },
  {
    name: "Brigadeiro",
    description:
      "Brigadeiro cremoso, chocolate granulado e massa levemente crocante.",
    price: "R$ 37,90",
    highlight: true,
    imageLabel: "BRI",
    gradient: "from-zinc-950 via-stone-900 to-yellow-700",
  },
  {
    name: "Banana com Canela",
    description:
      "Banana fatiada, canela, açúcar e leite condensado na medida certa.",
    price: "R$ 36,90",
    highlight: false,
    imageLabel: "BAN",
    gradient: "from-yellow-700 via-orange-500 to-amber-900",
  },
  {
    name: "Romeu e Julieta",
    description:
      "Queijo, goiabada cremosa e um toque especial para equilibrar o sabor.",
    price: "R$ 38,90",
    highlight: false,
    imageLabel: "RJ",
    gradient: "from-red-900 via-pink-800 to-yellow-600",
  },
  {
    name: "Doce de Leite",
    description:
      "Doce de leite cremoso, toque de canela e finalização caramelizada.",
    price: "R$ 40,90",
    highlight: false,
    imageLabel: "DDL",
    gradient: "from-amber-950 via-yellow-800 to-orange-500",
  },
  {
    name: "Nutella com Morango",
    description:
      "Creme de avelã, morangos frescos e finalização com açúcar de confeiteiro.",
    price: "R$ 49,90",
    highlight: true,
    imageLabel: "NUT",
    gradient: "from-stone-950 via-red-950 to-orange-600",
  },
];

const categoryLinks = [
  {
    label: "Pizzas Salgadas",
    href: "/cardapio/salgadas",
    active: false,
  },
  {
    label: "Pizzas Doces",
    href: "/cardapio/doces",
    active: true,
  },
  {
    label: "Bebidas",
    href: "/cardapio/bebidas",
    active: false,
  },
  {
    label: "Combos",
    href: "/cardapio/combos",
    active: false,
  },
];

export default function SweetPizzasPage() {
  return (
    <main className="bg-[#fff8ed]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#080808] px-6 pb-20 pt-40 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,191,36,0.24),transparent_32%),radial-gradient(circle_at_30%_70%,rgba(178,15,24,0.25),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#f5bf24]">
              Cardápio
            </p>

            <h1 className="mt-4 max-w-2xl text-5xl font-black leading-tight md:text-7xl">
              Pizzas Doces
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Sabores doces preparados para fechar sua refeição com aquele toque
              especial de sobremesa.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {categoryLinks.map((category) => (
                <a
                  key={category.label}
                  href={category.href}
                  className={`rounded-full px-5 py-3 text-sm font-black transition ${
                    category.active
                      ? "bg-[#f5bf24] text-black"
                      : "border border-white/20 text-white hover:border-[#f5bf24] hover:text-[#f5bf24]"
                  }`}
                >
                  {category.label}
                </a>
              ))}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="relative aspect-square rounded-full bg-[radial-gradient(circle_at_50%_45%,#f8d37a_0%,#b86b28_28%,#5b2113_48%,#2a0b08_70%,#120606_100%)] shadow-2xl shadow-black/60">
              <div className="absolute inset-10 rounded-full border-[18px] border-[#d88b38]/70 bg-[radial-gradient(circle_at_50%_50%,#f9d47a_0%,#7a2d18_32%,#3d1210_58%,#1a0505_100%)] shadow-inner" />

              <div className="absolute left-[24%] top-[30%] h-12 w-12 rounded-full bg-red-700 ring-4 ring-red-900/40" />
              <div className="absolute right-[28%] top-[26%] h-10 w-10 rounded-full bg-red-700 ring-4 ring-red-900/40" />
              <div className="absolute bottom-[32%] left-[34%] h-10 w-10 rounded-full bg-red-700 ring-4 ring-red-900/40" />
              <div className="absolute bottom-[26%] right-[32%] h-12 w-12 rounded-full bg-red-700 ring-4 ring-red-900/40" />

              <div className="absolute left-[42%] top-[22%] h-5 w-20 -rotate-12 rounded-full bg-[#f5bf24]" />
              <div className="absolute right-[23%] top-[43%] h-5 w-20 rotate-12 rounded-full bg-[#f5bf24]" />
              <div className="absolute bottom-[24%] left-[48%] h-5 w-20 rotate-45 rounded-full bg-[#f5bf24]" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#b20f18]">
                Sobremesa em forma de pizza
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17120f] md:text-5xl">
                Sabores doces disponíveis
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
                Opções doces para compartilhar depois da pizza salgada ou para
                transformar qualquer momento em sobremesa especial.
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

          <div className="grid gap-5 md:grid-cols-2">
            {sweetPizzas.map((pizza) => (
              <article
                key={pizza.name}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid min-h-44 grid-cols-1 sm:grid-cols-[140px_1fr]">
                  <div
                    className={`relative flex min-h-40 items-center justify-center bg-gradient-to-br sm:min-h-full ${pizza.gradient}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.35),transparent_35%)]" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-black/25 text-sm font-black tracking-[0.2em] text-white shadow-2xl backdrop-blur">
                      {pizza.imageLabel}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-black text-[#17120f]">
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

                      <strong className="shrink-0 text-xl font-black text-[#b20f18]">
                        {pizza.price}
                      </strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-dashed border-[#b20f18]/30 bg-white p-8 text-center shadow-xl shadow-black/5">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b20f18]">
              Quer voltar para as salgadas?
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#17120f]">
              Veja também nossas pizzas salgadas.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-black/60">
              Temos opções clássicas e especiais como calabresa, portuguesa,
              quatro queijos e frango com catupiry.
            </p>

            <a
              href="/cardapio/salgadas"
              className="mt-6 inline-flex rounded-full bg-[#f5bf24] px-6 py-3 text-sm font-black text-black transition hover:bg-[#e0aa13]"
            >
              Ver pizzas salgadas
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
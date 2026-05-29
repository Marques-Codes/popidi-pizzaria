import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const drinks = [
  {
    name: "Refrigerante Lata",
    description: "Coca-Cola, Guaraná, Fanta ou Sprite em lata 350ml.",
    price: "R$ 6,00",
    highlight: true,
    imageLabel: "LATA",
    gradient: "from-red-950 via-red-700 to-zinc-900",
  },
  {
    name: "Refrigerante 1L",
    description: "Opção ideal para compartilhar com pizzas médias e grandes.",
    price: "R$ 10,00",
    highlight: false,
    imageLabel: "1L",
    gradient: "from-zinc-950 via-red-900 to-orange-600",
  },
  {
    name: "Refrigerante 2L",
    description: "Perfeito para combos família e pedidos para grupos.",
    price: "R$ 14,00",
    highlight: true,
    imageLabel: "2L",
    gradient: "from-red-900 via-black to-yellow-700",
  },
  {
    name: "Suco Natural 300ml",
    description: "Sabores selecionados para acompanhar sua pizza.",
    price: "R$ 8,00",
    highlight: false,
    imageLabel: "SUCO",
    gradient: "from-orange-700 via-yellow-500 to-green-700",
  },
  {
    name: "Água Mineral 500ml",
    description: "Água mineral sem gás ou com gás, gelada.",
    price: "R$ 4,00",
    highlight: false,
    imageLabel: "ÁGUA",
    gradient: "from-sky-900 via-cyan-700 to-zinc-900",
  },
  {
    name: "Chá Gelado",
    description: "Bebida leve e refrescante para acompanhar qualquer sabor.",
    price: "R$ 7,00",
    highlight: false,
    imageLabel: "CHÁ",
    gradient: "from-green-950 via-emerald-800 to-yellow-700",
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
    active: false,
  },
  {
    label: "Bebidas",
    href: "/cardapio/bebidas",
    active: true,
  },
  {
    label: "Combos",
    href: "/cardapio/combos",
    active: false,
  },
];

export default function DrinksPage() {
  return (
    <main className="bg-[#fff8ed]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#080808] px-6 pb-20 pt-40 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,191,36,0.24),transparent_32%),radial-gradient(circle_at_30%_70%,rgba(35,163,52,0.2),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#f5bf24]">
              Cardápio
            </p>

            <h1 className="mt-4 max-w-2xl text-5xl font-black leading-tight md:text-7xl">
              Bebidas
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Bebidas geladas para acompanhar sua pizza e deixar o pedido ainda
              mais completo.
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
            <div className="relative aspect-square rounded-[3rem] bg-[radial-gradient(circle_at_50%_35%,#f8c14a_0%,#23a334_26%,#0f5132_48%,#061a12_70%,#020605_100%)] shadow-2xl shadow-black/60">
              <div className="absolute left-1/2 top-1/2 h-[70%] w-[36%] -translate-x-1/2 -translate-y-1/2 rounded-b-[3rem] rounded-t-xl border-8 border-white/20 bg-[linear-gradient(180deg,rgba(255,255,255,0.35),rgba(255,255,255,0.05)_18%,rgba(245,191,36,0.75)_19%,rgba(178,15,24,0.9)_100%)] shadow-2xl" />

              <div className="absolute left-[43%] top-[12%] h-16 w-[14%] rounded-t-xl bg-white/20" />
              <div className="absolute left-[38%] top-[34%] h-8 w-8 rounded-full bg-white/35" />
              <div className="absolute right-[36%] top-[44%] h-6 w-6 rounded-full bg-white/30" />
              <div className="absolute left-[41%] bottom-[30%] h-7 w-7 rounded-full bg-white/25" />

              <div className="absolute bottom-8 left-1/2 h-10 w-[55%] -translate-x-1/2 rounded-full bg-black/40 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#b20f18]">
                Para acompanhar
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17120f] md:text-5xl">
                Bebidas disponíveis
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
                Escolha uma bebida gelada para completar seu pedido. Depois,
                podemos adicionar fotos reais para cada opção.
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
            {drinks.map((drink) => (
              <article
                key={drink.name}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid min-h-44 grid-cols-1 sm:grid-cols-[140px_1fr]">
                  <div
                    className={`relative flex min-h-40 items-center justify-center bg-gradient-to-br sm:min-h-full ${drink.gradient}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.35),transparent_35%)]" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-black/25 text-xs font-black tracking-[0.16em] text-white shadow-2xl backdrop-blur">
                      {drink.imageLabel}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-black text-[#17120f]">
                            {drink.name}
                          </h3>

                          {drink.highlight ? (
                            <span className="rounded-full bg-[#f5bf24] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                              Popular
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-3 text-sm leading-6 text-black/60">
                          {drink.description}
                        </p>
                      </div>

                      <strong className="shrink-0 text-xl font-black text-[#b20f18]">
                        {drink.price}
                      </strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-dashed border-[#b20f18]/30 bg-white p-8 text-center shadow-xl shadow-black/5">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b20f18]">
              Quer economizar?
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#17120f]">
              Veja nossos combos com pizza e bebida.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-black/60">
              Temos opções completas para compartilhar com família e amigos.
            </p>

            <a
              href="/cardapio/combos"
              className="mt-6 inline-flex rounded-full bg-[#f5bf24] px-6 py-3 text-sm font-black text-black transition hover:bg-[#e0aa13]"
            >
              Ver combos
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
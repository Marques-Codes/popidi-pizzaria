import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const combos = [
  {
    name: "Combo Individual",
    description: "1 pizza broto salgada + 1 refrigerante lata 350ml.",
    price: "R$ 39,90",
    highlight: false,
    imageLabel: "IND",
    gradient: "from-red-950 via-orange-700 to-yellow-500",
  },
  {
    name: "Combo Casal",
    description: "1 pizza grande salgada + 1 refrigerante 1L.",
    price: "R$ 69,90",
    highlight: true,
    imageLabel: "CASAL",
    gradient: "from-red-950 via-red-700 to-orange-500",
  },
  {
    name: "Combo Família",
    description: "2 pizzas grandes salgadas + 1 refrigerante 2L.",
    price: "R$ 119,90",
    highlight: true,
    imageLabel: "FAM",
    gradient: "from-red-900 via-black to-yellow-700",
  },
  {
    name: "Combo Doce Final",
    description: "1 pizza grande salgada + 1 pizza doce média.",
    price: "R$ 89,90",
    highlight: false,
    imageLabel: "DOCE",
    gradient: "from-stone-950 via-amber-950 to-red-700",
  },
  {
    name: "Combo Amigos",
    description: "3 pizzas grandes salgadas + 1 refrigerante 2L.",
    price: "R$ 169,90",
    highlight: true,
    imageLabel: "AMG",
    gradient: "from-zinc-950 via-red-900 to-orange-600",
  },
  {
    name: "Combo Pópidi",
    description: "2 pizzas grandes + 1 pizza doce média + 1 refrigerante 2L.",
    price: "R$ 149,90",
    highlight: true,
    imageLabel: "POP",
    gradient: "from-yellow-700 via-red-800 to-black",
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
    active: false,
  },
  {
    label: "Combos",
    href: "/cardapio/combos",
    active: true,
  },
];

export default function CombosPage() {
  return (
    <main className="bg-[#fff8ed]">
      <SiteHeader />

      <section className="relative overflow-hidden bg-[#080808] px-6 pb-20 pt-40 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,191,36,0.24),transparent_32%),radial-gradient(circle_at_30%_70%,rgba(178,15,24,0.28),transparent_35%)]" />

        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.3em] text-[#f5bf24]">
              Cardápio
            </p>

            <h1 className="mt-4 max-w-2xl text-5xl font-black leading-tight md:text-7xl">
              Combos
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/75">
              Combinações completas para compartilhar, economizar e aproveitar
              o melhor da Pópidi Pizzaria.
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
            <div className="relative aspect-square rounded-[3rem] bg-[radial-gradient(circle_at_50%_40%,#f8c14a_0%,#d56b16_24%,#9b1119_46%,#2a0505_70%,#080808_100%)] shadow-2xl shadow-black/60">
              <div className="absolute left-[12%] top-[18%] h-[46%] w-[46%] rounded-full border-[12px] border-[#d88b38]/70 bg-[radial-gradient(circle_at_50%_50%,#f6d37b_0%,#d73f25_32%,#7d1212_58%,#2a0505_100%)] shadow-inner" />

              <div className="absolute right-[13%] top-[26%] h-[40%] w-[40%] rounded-full border-[10px] border-[#d88b38]/70 bg-[radial-gradient(circle_at_50%_50%,#f6d37b_0%,#d73f25_32%,#7d1212_58%,#2a0505_100%)] shadow-inner" />

              <div className="absolute bottom-[16%] left-[22%] h-[20%] w-[56%] rounded-3xl bg-[linear-gradient(135deg,#b20f18,#080808_55%,#f5bf24)] shadow-2xl">
                <div className="absolute left-5 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#f5bf24]" />
                <div className="absolute left-16 top-1/2 h-9 w-9 -translate-y-1/2 rounded-full bg-[#b20f18]" />
                <div className="absolute right-5 top-1/2 h-12 w-8 -translate-y-1/2 rounded bg-white/20" />
              </div>

              <div className="absolute bottom-8 left-1/2 h-10 w-[65%] -translate-x-1/2 rounded-full bg-black/40 blur-xl" />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.3em] text-[#b20f18]">
                Mais sabor e economia
              </p>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-[#17120f] md:text-5xl">
                Combos disponíveis
              </h2>

              <p className="mt-4 max-w-2xl text-base leading-7 text-black/60">
                Escolha uma combinação pronta para facilitar seu pedido. Quando
                as fotos reais chegarem, podemos colocar uma imagem para cada
                combo.
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
            {combos.map((combo) => (
              <article
                key={combo.name}
                className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-xl shadow-black/5 transition hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="grid min-h-44 grid-cols-1 sm:grid-cols-[140px_1fr]">
                  <div
                    className={`relative flex min-h-40 items-center justify-center bg-gradient-to-br sm:min-h-full ${combo.gradient}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,0.35),transparent_35%)]" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-white/30 bg-black/25 text-xs font-black tracking-[0.14em] text-white shadow-2xl backdrop-blur">
                      {combo.imageLabel}
                    </div>
                  </div>

                  <div className="flex flex-col justify-center p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-2xl font-black text-[#17120f]">
                            {combo.name}
                          </h3>

                          {combo.highlight ? (
                            <span className="rounded-full bg-[#f5bf24] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-black">
                              Popular
                            </span>
                          ) : null}
                        </div>

                        <p className="mt-3 text-sm leading-6 text-black/60">
                          {combo.description}
                        </p>
                      </div>

                      <strong className="shrink-0 text-xl font-black text-[#b20f18]">
                        {combo.price}
                      </strong>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 rounded-3xl border border-dashed border-[#b20f18]/30 bg-white p-8 text-center shadow-xl shadow-black/5">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#b20f18]">
              Quer escolher separado?
            </p>

            <h2 className="mt-3 text-3xl font-black text-[#17120f]">
              Monte seu pedido com pizzas e bebidas.
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-black/60">
              Você também pode navegar pelas pizzas salgadas, doces e bebidas
              para montar um pedido personalizado.
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <a
                href="/cardapio/salgadas"
                className="inline-flex rounded-full bg-[#f5bf24] px-6 py-3 text-sm font-black text-black transition hover:bg-[#e0aa13]"
              >
                Ver salgadas
              </a>

              <a
                href="/cardapio/doces"
                className="inline-flex rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-black text-black transition hover:border-[#f5bf24]"
              >
                Ver doces
              </a>

              <a
                href="/cardapio/bebidas"
                className="inline-flex rounded-full border border-black/10 bg-white px-6 py-3 text-sm font-black text-black transition hover:border-[#f5bf24]"
              >
                Ver bebidas
              </a>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
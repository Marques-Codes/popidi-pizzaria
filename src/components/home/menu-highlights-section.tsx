import Link from "next/link";
import { getFeaturedMenuProducts } from "@/lib/menu-product-storage";

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceCents / 100);
}

export async function MenuHighlightsSection() {
  const featuredProducts = await getFeaturedMenuProducts();

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

        {featuredProducts.length === 0 ? (
          <div className="mx-auto mt-12 max-w-3xl rounded-3xl bg-[#f6efe8] p-8 text-center shadow-sm ring-1 ring-[#6f1018]/10">
            <h3 className="font-serif text-3xl font-bold text-[#3a0a0f]">
              Nenhum destaque selecionado ainda
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#76524a]">
              Em breve vamos destacar algumas opções especiais da Popidi aqui.
              Para ver todos os produtos, acesse o cardápio completo.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {featuredProducts.map((product) => {
              const promotionalPriceText =
                product.promotionalPriceCents === null
                  ? null
                  : formatPrice(product.promotionalPriceCents);

              const hasPromotion = promotionalPriceText !== null;

              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl bg-[#f6efe8] shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="relative h-64 bg-[#eadfd6]">
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={product.imageAlt ?? product.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-[#76524a]">
                        Produto sem imagem
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/35" />

                    <span className="absolute left-5 top-5 rounded-full bg-[#b51f2b] px-4 py-2 text-xs font-bold text-white">
                      {hasPromotion
                        ? product.promotionLabel ?? "Promoção"
                        : "Destaque"}
                    </span>
                  </div>

                  <div className="p-7">
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-2xl font-semibold text-[#3a0a0f]">
                        {product.name}
                      </h3>

                      <div className="max-w-36 text-right">
                        {hasPromotion ? (
                          <>
                            <p className="text-xs font-bold text-[#76524a] line-through">
                              {formatPrice(product.priceCents)}
                            </p>

                            <p className="mt-1 text-sm font-bold leading-6 text-[#d79a22]">
                              {promotionalPriceText}
                            </p>
                          </>
                        ) : (
                          <p className="text-sm font-bold leading-6 text-[#d79a22]">
                            {formatPrice(product.priceCents)}
                          </p>
                        )}
                      </div>
                    </div>

                    {product.description && (
                      <p className="mt-4 text-sm leading-7 text-[#76524a]">
                        {product.description}
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        )}

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
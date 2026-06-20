import { SiteHeader } from "@/components/site-header";
import {
  getChildCategories,
  getMenuCategories,
  getParentCategories,
} from "@/lib/menu-storage";
import { getMenuProducts } from "@/lib/menu-product-storage";

export const dynamic = "force-dynamic";

const orderUrl = "https://pratodigital.com.br/pizzariapopidi/#/&s=4akMkWVkuI";

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceCents / 100);
}

function getSectionTitle(parentName: string, childName?: string) {
  if (!childName) {
    return parentName;
  }

  const normalizedParent = parentName.toLowerCase();
  const normalizedChild = childName.toLowerCase();

  if (normalizedParent === "pizza") {
    return `Pizzas ${normalizedChild}s`;
  }

  if (normalizedParent === "esfirra") {
    return `Esfirras ${normalizedChild}s`;
  }

  return `${parentName} - ${childName}`;
}

function getSectionDescription(parentName: string, childName?: string) {
  const normalizedParent = parentName.toLowerCase();
  const normalizedChild = childName?.toLowerCase();

  if (normalizedParent === "pizza" && normalizedChild === "salgada") {
    return "Sabores tradicionais e especiais para quem ama uma boa pizza bem recheada.";
  }

  if (normalizedParent === "pizza" && normalizedChild === "doce") {
    return "Opções doces para fechar o pedido com aquele sabor especial.";
  }

  if (normalizedParent === "esfirra" && normalizedChild === "salgada") {
    return "Esfirras salgadas preparadas para completar seu pedido.";
  }

  if (normalizedParent === "esfirra" && normalizedChild === "doce") {
    return "Esfirras doces para quem quer uma opção diferente e saborosa.";
  }

  if (normalizedParent === "esfirra" && normalizedChild === "vegetariana") {
    return "Opções vegetarianas preparadas com cuidado e sabor.";
  }

  if (normalizedParent === "bebidas") {
    return "Bebidas para acompanhar sua pizza, combo ou rodízio.";
  }

  return "Confira as opções disponíveis no cardápio da Popidi.";
}

export default async function CardapioPage() {
  const [categories, products] = await Promise.all([
    getMenuCategories(),
    getMenuProducts(),
  ]);

  const activeCategories = categories.filter((category) => category.isActive);
  const activeProducts = products.filter((product) => product.isActive);

  const parentCategories = getParentCategories(activeCategories);

  const sections = parentCategories.flatMap((parentCategory) => {
    const childCategories = getChildCategories(
      activeCategories,
      parentCategory.id,
    );

    if (childCategories.length === 0) {
      const categoryProducts = activeProducts.filter(
        (product) => product.categoryId === parentCategory.id,
      );

      if (categoryProducts.length === 0) {
        return [];
      }

      return [
        {
          id: parentCategory.id,
          title: getSectionTitle(parentCategory.name),
          description:
            parentCategory.description ??
            getSectionDescription(parentCategory.name),
          products: categoryProducts,
        },
      ];
    }

    return childCategories
      .map((childCategory) => {
        const categoryProducts = activeProducts.filter(
          (product) => product.categoryId === childCategory.id,
        );

        return {
          id: childCategory.id,
          title: getSectionTitle(parentCategory.name, childCategory.name),
          description:
            childCategory.description ??
            getSectionDescription(parentCategory.name, childCategory.name),
          products: categoryProducts,
        };
      })
      .filter((section) => section.products.length > 0);
  });

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Cardápio
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f] md:text-6xl">
            Cardápio da Popidi
          </h1>

          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#76524a]">
            Confira pizzas, esfirras, bebidas e opções especiais preparadas para
            deixar seu pedido ainda mais gostoso.
          </p>
        </div>

        {sections.length === 0 ? (
          <div className="mt-12 rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-[#6f1018]/10">
            <h2 className="font-serif text-3xl font-bold text-[#3a0a0f]">
              Nenhum produto disponível no momento
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#76524a]">
              O cardápio ainda está sendo atualizado. Volte em breve ou entre em
              contato com a Popidi para consultar as opções disponíveis.
            </p>
          </div>
        ) : (
          <div className="mt-14 space-y-20">
            {sections.map((section) => (
              <section key={section.id}>
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                    Cardápio
                  </p>

                  <h2 className="mt-3 font-serif text-4xl font-bold text-[#3a0a0f] md:text-5xl">
                    {section.title}
                  </h2>

                  <p className="mt-4 max-w-3xl text-base leading-8 text-[#76524a]">
                    {section.description}
                  </p>
                </div>

                <div className="mt-8 space-y-5">
                  {section.products.map((product) => (
                    <article
                      key={product.id}
                      className="grid gap-6 rounded-2xl bg-[#f6efe8] p-5 shadow-sm ring-1 ring-[#6f1018]/10 md:grid-cols-[160px_1fr_150px] md:items-center"
                    >
                      <div className="h-32 overflow-hidden rounded-xl bg-[#eadfd6]">
                        {product.imageUrl ? (
                          <img
                            src={product.imageUrl}
                            alt={product.imageAlt ?? product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center px-4 text-center text-xs font-semibold text-[#76524a]">
                            Produto sem imagem
                          </div>
                        )}
                      </div>

                      <div>
                        <h3 className="font-serif text-2xl font-bold text-[#3a0a0f]">
                          {product.name}
                        </h3>

                        {product.description && (
                          <p className="mt-3 text-sm leading-7 text-[#76524a]">
                            {product.description}
                          </p>
                        )}
                      </div>

                      <div className="rounded-xl bg-[#fff7ed] px-5 py-4 text-center ring-1 ring-[#6f1018]/10">
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                          Valor
                        </p>

                        <p className="mt-2 text-xl font-bold text-[#d79a22]">
                          {formatPrice(product.priceCents)}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        <section className="mt-20 rounded-3xl bg-[#6f1018] px-6 py-14 text-center text-white">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-yellow-300">
            Faça seu pedido
          </p>

          <h2 className="mt-4 font-serif text-4xl font-bold md:text-5xl">
            Gostou de algum sabor?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/85">
            Entre em contato com a Popidi Pizzaria e confirme sabores, valores,
            rodízio, esfihas e opções de delivery.
          </p>

          <a
            href={orderUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-7 py-4 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            Pedir agora
          </a>
        </section>
      </section>
    </main>
  );
}
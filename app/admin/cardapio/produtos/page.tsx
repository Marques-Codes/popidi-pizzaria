import Link from "next/link";
import {
  deleteMenuProduct,
  moveMenuProduct,
  toggleMenuProductFeatured,
  toggleMenuProductStatus,
} from "./actions";
import {
  getChildCategories,
  getMenuCategories,
  getParentCategories,
} from "@/lib/menu-storage";
import {
  getMenuProducts,
  sortMenuProducts,
  type MenuProduct,
} from "@/lib/menu-product-storage";

export const dynamic = "force-dynamic";

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

function getCategoryLabel(
  categoryId: string,
  categories: Awaited<ReturnType<typeof getMenuCategories>>,
) {
  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return "Sem categoria";
  }

  if (!category.parentId) {
    return category.name;
  }

  const parentCategory = categories.find(
    (item) => item.id === category.parentId,
  );

  if (!parentCategory) {
    return category.name;
  }

  return `${parentCategory.name} > ${category.name}`;
}

type ProductSection = {
  id: string;
  title: string;
  categoryId: string;
  products: MenuProduct[];
};

function buildProductSections(
  categories: Awaited<ReturnType<typeof getMenuCategories>>,
  products: MenuProduct[],
): ProductSection[] {
  const parentCategories = getParentCategories(categories);

  return parentCategories.flatMap((parentCategory) => {
    const childCategories = getChildCategories(categories, parentCategory.id);

    if (childCategories.length === 0) {
      const categoryProducts = sortMenuProducts(
        products.filter((product) => product.categoryId === parentCategory.id),
      );

      if (categoryProducts.length === 0) {
        return [];
      }

      return [
        {
          id: parentCategory.id,
          title: getSectionTitle(parentCategory.name),
          categoryId: parentCategory.id,
          products: categoryProducts,
        },
      ];
    }

    return childCategories
      .map((childCategory) => {
        const categoryProducts = sortMenuProducts(
          products.filter((product) => product.categoryId === childCategory.id),
        );

        return {
          id: childCategory.id,
          title: getSectionTitle(parentCategory.name, childCategory.name),
          categoryId: childCategory.id,
          products: categoryProducts,
        };
      })
      .filter((section) => section.products.length > 0);
  });
}

export default async function AdminCardapioProdutosPage() {
  const [categories, products] = await Promise.all([
    getMenuCategories(),
    getMenuProducts(),
  ]);

  const productSections = buildProductSections(categories, products);

  const activeProductsCount = products.filter((product) => product.isActive).length;

  const promotionalProductsCount = products.filter(
    (product) => product.promotionalPriceCents !== null,
  ).length;

  const featuredProductsCount = products.filter(
    (product) => product.isFeatured,
  ).length;

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <header className="bg-[#6f1018] px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/admin/cardapio"
            className="text-sm font-bold text-yellow-300 transition hover:text-white"
          >
            ← Voltar para o cardápio
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Produtos
              </p>

              <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
                Produtos do cardápio
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-[#76524a]">
                Gerencie pizzas, esfirras, bebidas, fotos, valores, promoções,
                destaques da home, ordem e itens ativos do cardápio.
              </p>
            </div>

            <Link
              href="/admin/cardapio/produtos/novo"
              className="rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
            >
              Novo produto
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Total
              </p>

              <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
                {products.length}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Produtos cadastrados no cardápio.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Ativos
              </p>

              <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
                {activeProductsCount}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Produtos visíveis no cardápio público.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Promoções
              </p>

              <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
                {promotionalProductsCount}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Produtos com preço promocional ativo.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Home
              </p>

              <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
                {featuredProductsCount}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Produtos destacados na página inicial.
              </p>
            </div>
          </div>

          {products.length === 0 ? (
            <div className="mt-10 rounded-2xl bg-[#fff7ed] p-8 text-center ring-1 ring-[#6f1018]/10">
              <p className="font-serif text-3xl font-bold text-[#3a0a0f]">
                Nenhum produto cadastrado ainda
              </p>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#76524a]">
                Agora vamos cadastrar os produtos reais do cardápio, como
                pizzas salgadas, pizzas doces, esfirras e bebidas.
              </p>

              <Link
                href="/admin/cardapio/produtos/novo"
                className="mt-6 inline-flex rounded-xl bg-[#6f1018] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8f1721]"
              >
                Cadastrar primeiro produto
              </Link>
            </div>
          ) : (
            <div className="mt-12 space-y-12">
              {productSections.map((section) => (
                <section
                  key={section.id}
                  className="rounded-3xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10"
                >
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                        Categoria
                      </p>

                      <h2 className="mt-2 font-serif text-3xl font-bold text-[#3a0a0f]">
                        {section.title}
                      </h2>
                    </div>

                    <p className="text-sm font-semibold text-[#76524a]">
                      {section.products.length} produto
                      {section.products.length === 1 ? "" : "s"}
                    </p>
                  </div>

                  <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {section.products.map((product, productIndex) => {
                      const canMoveUp = productIndex > 0;
                      const canMoveDown =
                        productIndex < section.products.length - 1;

                      const promotionalPriceText =
                        product.promotionalPriceCents === null
                          ? null
                          : formatPrice(product.promotionalPriceCents);

                      const hasPromotion = promotionalPriceText !== null;

                      return (
                        <article
                          key={product.id}
                          className="overflow-hidden rounded-2xl bg-white ring-1 ring-[#6f1018]/10"
                        >
                          <div className="relative h-56 bg-[#eadfd6]">
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

                            <span
                              className={`absolute left-5 top-5 rounded-full px-4 py-2 text-xs font-bold text-white ${
                                product.isActive
                                  ? "bg-green-600"
                                  : "bg-zinc-500"
                              }`}
                            >
                              {product.isActive ? "Ativo" : "Inativo"}
                            </span>

                            {hasPromotion && (
                              <span className="absolute right-5 top-5 rounded-full bg-yellow-400 px-4 py-2 text-xs font-bold text-[#3a0a0f] shadow-sm">
                                {product.promotionLabel ?? "Promoção"}
                              </span>
                            )}

                            {product.isFeatured && (
                              <span className="absolute bottom-5 left-5 rounded-full bg-[#6f1018] px-4 py-2 text-xs font-bold text-white shadow-sm">
                                Na home
                              </span>
                            )}
                          </div>

                          <div className="p-6">
                            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                              Ordem {product.order}
                            </p>

                            <p className="mt-2 text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                              {getCategoryLabel(product.categoryId, categories)}
                            </p>

                            <div className="mt-3 flex items-start justify-between gap-4">
                              <h3 className="font-serif text-2xl font-bold text-[#3a0a0f]">
                                {product.name}
                              </h3>

                              <div className="text-right">
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

                            <div className="mt-6 flex flex-wrap gap-3">
                              <Link
                                href={`/admin/cardapio/produtos/${product.id}/editar`}
                                className="rounded-xl bg-[#6f1018] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
                              >
                                Editar
                              </Link>

                              <form action={moveMenuProduct}>
                                <input
                                  type="hidden"
                                  name="productId"
                                  value={product.id}
                                />

                                <input
                                  type="hidden"
                                  name="direction"
                                  value="up"
                                />

                                <button
                                  type="submit"
                                  disabled={!canMoveUp}
                                  className={`rounded-xl border border-[#6f1018]/20 px-4 py-3 text-sm font-bold transition ${
                                    canMoveUp
                                      ? "text-[#6f1018] hover:bg-[#fff7ed]"
                                      : "cursor-not-allowed text-[#6f1018]/35"
                                  }`}
                                >
                                  ↑ Subir
                                </button>
                              </form>

                              <form action={moveMenuProduct}>
                                <input
                                  type="hidden"
                                  name="productId"
                                  value={product.id}
                                />

                                <input
                                  type="hidden"
                                  name="direction"
                                  value="down"
                                />

                                <button
                                  type="submit"
                                  disabled={!canMoveDown}
                                  className={`rounded-xl border border-[#6f1018]/20 px-4 py-3 text-sm font-bold transition ${
                                    canMoveDown
                                      ? "text-[#6f1018] hover:bg-[#fff7ed]"
                                      : "cursor-not-allowed text-[#6f1018]/35"
                                  }`}
                                >
                                  ↓ Descer
                                </button>
                              </form>

                              <form action={toggleMenuProductFeatured}>
                                <input
                                  type="hidden"
                                  name="productId"
                                  value={product.id}
                                />

                                <button
                                  type="submit"
                                  className={`rounded-xl px-4 py-3 text-sm font-bold transition ${
                                    product.isFeatured
                                      ? "bg-yellow-400 text-[#3a0a0f] hover:bg-yellow-300"
                                      : "border border-[#6f1018]/20 text-[#6f1018] hover:bg-[#fff7ed]"
                                  }`}
                                >
                                  {product.isFeatured
                                    ? "Remover da home"
                                    : "Mostrar na home"}
                                </button>
                              </form>

                              <form action={toggleMenuProductStatus}>
                                <input
                                  type="hidden"
                                  name="productId"
                                  value={product.id}
                                />

                                <button
                                  type="submit"
                                  className="rounded-xl border border-[#6f1018]/20 px-4 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-[#fff7ed]"
                                >
                                  {product.isActive ? "Desativar" : "Ativar"}
                                </button>
                              </form>

                              <form action={deleteMenuProduct}>
                                <input
                                  type="hidden"
                                  name="productId"
                                  value={product.id}
                                />

                                <button
                                  type="submit"
                                  className="rounded-xl bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                                >
                                  Remover
                                </button>
                              </form>
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
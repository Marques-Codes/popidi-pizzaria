import Link from "next/link";
import { notFound } from "next/navigation";
import { updateMenuProduct } from "../../actions";
import {
  getChildCategories,
  getMenuCategories,
} from "@/lib/menu-storage";
import { getMenuProductById } from "@/lib/menu-product-storage";

type EditProductPageProps = {
  params: Promise<{
    productId: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

function formatPriceInput(priceCents: number) {
  return (priceCents / 100).toFixed(2).replace(".", ",");
}

function formatOptionalPriceInput(priceCents: number | null) {
  if (priceCents === null) {
    return "";
  }

  return formatPriceInput(priceCents);
}

function getCategoryLabel(
  categoryId: string,
  categories: Awaited<ReturnType<typeof getMenuCategories>>,
) {
  const category = categories.find((item) => item.id === categoryId);

  if (!category) {
    return "Categoria";
  }

  if (!category.parentId) {
    return category.name;
  }

  const parentCategory = categories.find((item) => item.id === category.parentId);

  if (!parentCategory) {
    return category.name;
  }

  return `${parentCategory.name} > ${category.name}`;
}

export default async function EditProductPage({
  params,
  searchParams,
}: EditProductPageProps) {
  const { productId } = await params;
  const queryParams = await searchParams;

  const [product, categories] = await Promise.all([
    getMenuProductById(productId),
    getMenuCategories(),
  ]);

  if (!product) {
    notFound();
  }

  const activeCategories = categories.filter((category) => category.isActive);

  const selectableCategories = activeCategories.filter((category) => {
    const children = getChildCategories(activeCategories, category.id);

    return children.length === 0;
  });

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <header className="bg-[#6f1018] px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/admin/cardapio/produtos"
            className="text-sm font-bold text-yellow-300 transition hover:text-white"
          >
            ← Voltar para produtos
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Produto
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
            Editar produto
          </h1>

          <p className="mt-4 text-base leading-8 text-[#76524a]">
            Altere categoria, nome, descrição, preço, promoção e foto do
            produto.
          </p>

          {queryParams.error === "category" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Selecione uma categoria válida.
            </div>
          )}

          {queryParams.error === "name" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Informe o nome do produto.
            </div>
          )}

          {queryParams.error === "price" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Informe um preço válido. Exemplo: 39,90
            </div>
          )}

          {queryParams.error === "promotion-price" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Informe um preço promocional válido e menor que o preço normal.
              Exemplo: preço normal 40,99 e promocional 34,99.
            </div>
          )}

          {queryParams.error === "file-type" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Envie apenas arquivos de imagem.
            </div>
          )}

          {queryParams.error === "file-size" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              A imagem precisa ter no máximo 5MB.
            </div>
          )}

          <form
            action={updateMenuProduct}
            className="mt-8 space-y-6"
          >
            <input type="hidden" name="productId" value={product.id} />

            <div>
              <label
                htmlFor="categoryId"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Categoria
              </label>

              <select
                id="categoryId"
                name="categoryId"
                required
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                defaultValue={product.categoryId}
              >
                {selectableCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {getCategoryLabel(category.id, categories)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="name"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Nome
              </label>

              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={product.name}
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                placeholder="Ex: Calabresa"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Descrição / composição
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={product.description ?? ""}
                className="mt-2 w-full resize-none rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              />
            </div>

            <div>
              <label
                htmlFor="price"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Preço normal
              </label>

              <input
                id="price"
                name="price"
                type="text"
                required
                inputMode="decimal"
                defaultValue={formatPriceInput(product.priceCents)}
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              />
            </div>

            <div className="rounded-2xl bg-[#fff7ed] p-5 ring-1 ring-[#6f1018]/10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                Promoção
              </p>

              <p className="mt-2 text-sm leading-7 text-[#76524a]">
                Para remover a promoção, apague o preço promocional e salve.
              </p>

              <div className="mt-5 space-y-5">
                <div>
                  <label
                    htmlFor="promotionalPrice"
                    className="text-sm font-bold text-[#3a0a0f]"
                  >
                    Preço promocional
                  </label>

                  <input
                    id="promotionalPrice"
                    name="promotionalPrice"
                    type="text"
                    inputMode="decimal"
                    defaultValue={formatOptionalPriceInput(
                      product.promotionalPriceCents,
                    )}
                    className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-white px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                    placeholder="Ex: 34,99"
                  />
                </div>

                <div>
                  <label
                    htmlFor="promotionLabel"
                    className="text-sm font-bold text-[#3a0a0f]"
                  >
                    Etiqueta da promoção
                  </label>

                  <input
                    id="promotionLabel"
                    name="promotionLabel"
                    type="text"
                    defaultValue={product.promotionLabel ?? ""}
                    className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-white px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                    placeholder="Ex: Promoção, Oferta, Por tempo limitado"
                  />
                </div>
              </div>
            </div>

            {product.imageUrl && (
              <div>
                <p className="text-sm font-bold text-[#3a0a0f]">Imagem atual</p>

                <img
                  src={product.imageUrl}
                  alt={product.imageAlt ?? product.name}
                  className="mt-3 h-56 w-full rounded-2xl object-cover ring-1 ring-[#6f1018]/10"
                />
              </div>
            )}

            <div>
              <label
                htmlFor="image"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Nova foto do produto
              </label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#6f1018] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#8f1721]"
              />

              <p className="mt-2 text-xs leading-6 text-[#76524a]">
                Envie uma nova imagem apenas se quiser trocar a foto atual.
              </p>
            </div>

            <div>
              <label
                htmlFor="imageAlt"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Texto alternativo da imagem
              </label>

              <input
                id="imageAlt"
                name="imageAlt"
                type="text"
                defaultValue={product.imageAlt ?? ""}
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#6f1018] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8f1721]"
              >
                Salvar alterações
              </button>

              <Link
                href="/admin/cardapio/produtos"
                className="rounded-xl border border-[#6f1018]/20 px-6 py-4 text-sm font-bold text-[#6f1018] transition hover:bg-[#fff7ed]"
              >
                Cancelar
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
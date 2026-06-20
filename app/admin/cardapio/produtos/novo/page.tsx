import Link from "next/link";
import { createMenuProduct } from "../actions";
import {
  getChildCategories,
  getMenuCategories,
} from "@/lib/menu-storage";

type NewProductPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

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

export default async function NewProductPage({
  searchParams,
}: NewProductPageProps) {
  const params = await searchParams;
  const categories = await getMenuCategories();

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
            Novo produto
          </h1>

          <p className="mt-4 text-base leading-8 text-[#76524a]">
            Cadastre pizzas, esfirras, bebidas, fotos e valores do cardápio.
          </p>

          {params.error === "category" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Selecione uma categoria válida.
            </div>
          )}

          {params.error === "name" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Informe o nome do produto.
            </div>
          )}

          {params.error === "price" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Informe um preço válido. Exemplo: 39,90
            </div>
          )}

          {params.error === "file-type" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Envie apenas arquivos de imagem.
            </div>
          )}

          {params.error === "file-size" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              A imagem precisa ter no máximo 5MB.
            </div>
          )}

          {selectableCategories.length === 0 ? (
            <div className="mt-8 rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10">
              <p className="font-serif text-2xl font-bold text-[#3a0a0f]">
                Nenhuma categoria disponível
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Antes de cadastrar produtos, crie ou ative pelo menos uma
                categoria no cardápio.
              </p>

              <Link
                href="/admin/cardapio/categorias"
                className="mt-5 inline-flex rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
              >
                Gerenciar categorias
              </Link>
            </div>
          ) : (
            <form
              action={createMenuProduct}
              className="mt-8 space-y-6"
              encType="multipart/form-data"
            >
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
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione uma categoria
                  </option>

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
                  className="mt-2 w-full resize-none rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                  placeholder="Ex: Molho especial, muçarela, calabresa fatiada, cebola e orégano."
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="text-sm font-bold text-[#3a0a0f]"
                >
                  Preço
                </label>

                <input
                  id="price"
                  name="price"
                  type="text"
                  required
                  inputMode="decimal"
                  className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                  placeholder="Ex: 39,90"
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-[#3a0a0f]"
                >
                  Foto do produto
                </label>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition file:mr-4 file:rounded-lg file:border-0 file:bg-[#6f1018] file:px-4 file:py-2 file:text-sm file:font-bold file:text-white hover:file:bg-[#8f1721]"
                />

                <p className="mt-2 text-xs leading-6 text-[#76524a]">
                  Imagem opcional por enquanto. Tamanho máximo: 5MB.
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
                  className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                  placeholder="Ex: Pizza de calabresa da Popidi"
                />
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  type="submit"
                  className="rounded-xl bg-[#6f1018] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8f1721]"
                >
                  Salvar produto
                </button>

                <Link
                  href="/admin/cardapio/produtos"
                  className="rounded-xl border border-[#6f1018]/20 px-6 py-4 text-sm font-bold text-[#6f1018] transition hover:bg-[#fff7ed]"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import {
  deleteMenuCategory,
  toggleMenuCategoryStatus,
} from "./actions";
import {
  getChildCategories,
  getMenuCategories,
  getParentCategories,
} from "@/lib/menu-storage";

type AdminCardapioCategoriasPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function AdminCardapioCategoriasPage({
  searchParams,
}: AdminCardapioCategoriasPageProps) {
  const params = await searchParams;
  const categories = await getMenuCategories();
  const parentCategories = getParentCategories(categories);

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
                Categorias
              </p>

              <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
                Categorias do cardápio
              </h1>

              <p className="mt-4 max-w-2xl text-base leading-8 text-[#76524a]">
                Gerencie categorias principais e subcategorias do cardápio.
              </p>
            </div>

            <Link
              href="/admin/cardapio/categorias/nova"
              className="rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
            >
              Nova categoria
            </Link>
          </div>

          {params.error === "has-children" && (
            <div className="mt-8 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold leading-7 text-red-700">
              Essa categoria possui subcategorias. Remova ou edite as
              subcategorias antes de remover a categoria principal.
            </div>
          )}

          {params.error === "has-products" && (
            <div className="mt-8 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold leading-7 text-red-700">
              Não foi possível remover esta categoria porque existem produtos
              cadastrados nela. Remova os produtos dessa categoria ou mova os
              produtos para outra categoria antes de excluir.
            </div>
          )}

          {params.error === "delete" && (
            <div className="mt-8 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold leading-7 text-red-700">
              Não foi possível remover esta categoria agora. Tente novamente em
              alguns instantes.
            </div>
          )}

          <div className="mt-10 space-y-6">
            {parentCategories.length === 0 ? (
              <div className="rounded-2xl bg-[#fff7ed] p-8 text-center ring-1 ring-[#6f1018]/10">
                <h2 className="font-serif text-3xl font-bold text-[#3a0a0f]">
                  Nenhuma categoria cadastrada
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[#76524a]">
                  Crie categorias para organizar pizzas, esfirras, bebidas,
                  combos e outros itens do cardápio.
                </p>
              </div>
            ) : (
              parentCategories.map((parentCategory) => {
                const childCategories = getChildCategories(
                  categories,
                  parentCategory.id,
                );

                return (
                  <article
                    key={parentCategory.id}
                    className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10"
                  >
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                          Categoria principal
                        </p>

                        <h2 className="mt-2 font-serif text-3xl font-bold text-[#3a0a0f]">
                          {parentCategory.name}
                        </h2>

                        {parentCategory.description && (
                          <p className="mt-3 max-w-2xl text-sm leading-7 text-[#76524a]">
                            {parentCategory.description}
                          </p>
                        )}

                        <div className="mt-5 flex flex-wrap gap-3">
                          <Link
                            href={`/admin/cardapio/categorias/${parentCategory.id}/editar`}
                            className="rounded-xl bg-[#6f1018] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
                          >
                            Editar
                          </Link>

                          <form action={toggleMenuCategoryStatus}>
                            <input
                              type="hidden"
                              name="categoryId"
                              value={parentCategory.id}
                            />

                            <button
                              type="submit"
                              className="rounded-xl border border-[#6f1018]/20 px-4 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-white"
                            >
                              {parentCategory.isActive ? "Desativar" : "Ativar"}
                            </button>
                          </form>

                          <form action={deleteMenuCategory}>
                            <input
                              type="hidden"
                              name="categoryId"
                              value={parentCategory.id}
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

                      <span
                        className={`w-fit rounded-full px-4 py-2 text-xs font-bold text-white ${
                          parentCategory.isActive
                            ? "bg-green-600"
                            : "bg-zinc-500"
                        }`}
                      >
                        {parentCategory.isActive ? "Ativa" : "Inativa"}
                      </span>
                    </div>

                    {childCategories.length > 0 && (
                      <div className="mt-6 grid gap-4 md:grid-cols-3">
                        {childCategories.map((childCategory) => (
                          <div
                            key={childCategory.id}
                            className="rounded-xl bg-white p-5 ring-1 ring-[#6f1018]/10"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div>
                                <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                                  Subcategoria
                                </p>

                                <h3 className="mt-2 font-serif text-2xl font-bold text-[#3a0a0f]">
                                  {childCategory.name}
                                </h3>
                              </div>

                              <span
                                className={`w-fit rounded-full px-3 py-1 text-xs font-bold text-white ${
                                  childCategory.isActive
                                    ? "bg-green-600"
                                    : "bg-zinc-500"
                                }`}
                              >
                                {childCategory.isActive ? "Ativa" : "Inativa"}
                              </span>
                            </div>

                            {childCategory.description && (
                              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                                {childCategory.description}
                              </p>
                            )}

                            <div className="mt-5 flex flex-wrap gap-3">
                              <Link
                                href={`/admin/cardapio/categorias/${childCategory.id}/editar`}
                                className="rounded-xl bg-[#6f1018] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
                              >
                                Editar
                              </Link>

                              <form action={toggleMenuCategoryStatus}>
                                <input
                                  type="hidden"
                                  name="categoryId"
                                  value={childCategory.id}
                                />

                                <button
                                  type="submit"
                                  className="rounded-xl border border-[#6f1018]/20 px-4 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-[#fff7ed]"
                                >
                                  {childCategory.isActive
                                    ? "Desativar"
                                    : "Ativar"}
                                </button>
                              </form>

                              <form action={deleteMenuCategory}>
                                <input
                                  type="hidden"
                                  name="categoryId"
                                  value={childCategory.id}
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
                        ))}
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

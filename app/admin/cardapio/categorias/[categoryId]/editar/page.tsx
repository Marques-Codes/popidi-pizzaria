import Link from "next/link";
import { notFound } from "next/navigation";
import { updateMenuCategory } from "../../actions";
import { getMenuCategoryById } from "@/lib/menu-storage";

type EditCategoryPageProps = {
  params: Promise<{
    categoryId: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function EditCategoryPage({
  params,
  searchParams,
}: EditCategoryPageProps) {
  const { categoryId } = await params;
  const queryParams = await searchParams;

  const category = await getMenuCategoryById(categoryId);

  if (!category) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <header className="bg-[#6f1018] px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/admin/cardapio/categorias"
            className="text-sm font-bold text-yellow-300 transition hover:text-white"
          >
            ← Voltar para categorias
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Categoria
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
            Editar categoria
          </h1>

          <p className="mt-4 text-base leading-8 text-[#76524a]">
            Altere o nome e a descrição da categoria do cardápio.
          </p>

          {queryParams.error === "name" && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              Informe o nome da categoria.
            </div>
          )}

          <form action={updateMenuCategory} className="mt-8 space-y-6">
            <input type="hidden" name="categoryId" value={category.id} />

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
                defaultValue={category.name}
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                placeholder="Nome da categoria"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Descrição
              </label>

              <textarea
                id="description"
                name="description"
                rows={4}
                defaultValue={category.description ?? ""}
                className="mt-2 w-full resize-none rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                placeholder="Descrição curta da categoria."
              />
            </div>

            <div className="rounded-2xl bg-[#fff7ed] p-5 ring-1 ring-[#6f1018]/10">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                Informações
              </p>

              <div className="mt-4 space-y-2 text-sm text-[#76524a]">
                <p>
                  <strong className="text-[#3a0a0f]">Slug:</strong>{" "}
                  {category.slug}
                </p>

                <p>
                  <strong className="text-[#3a0a0f]">Tipo:</strong>{" "}
                  {category.parentId ? "Subcategoria" : "Categoria principal"}
                </p>

                <p>
                  <strong className="text-[#3a0a0f]">Status:</strong>{" "}
                  {category.isActive ? "Ativa" : "Inativa"}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                className="rounded-xl bg-[#6f1018] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#8f1721]"
              >
                Salvar alterações
              </button>

              <Link
                href="/admin/cardapio/categorias"
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
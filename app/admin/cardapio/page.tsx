import Link from "next/link";
import {
  getChildCategories,
  getMenuCategories,
  getParentCategories,
} from "@/lib/menu-storage";
import { getMenuProducts } from "@/lib/menu-product-storage";

export default async function AdminCardapioPage() {
  const [categories, products] = await Promise.all([
    getMenuCategories(),
    getMenuProducts(),
  ]);

  const parentCategories = getParentCategories(categories);
  const activeProducts = products.filter((product) => product.isActive);

  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <header className="bg-[#6f1018] px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/admin" className="flex flex-col leading-none text-white">
            <span className="font-serif text-3xl font-bold tracking-tight">
              Popidi
            </span>

            <span className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">
              Pizzaria
            </span>
          </Link>

          <Link
            href="/admin"
            className="rounded-xl bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
          >
            Voltar ao painel
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
              Cardápio
            </p>

            <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
              Gerenciar cardápio
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-8 text-[#76524a]">
              Controle categorias, pizzas, esfirras, bebidas, fotos, valores e
              itens ativos do cardápio da Popidi.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/admin/cardapio/categorias"
              className="rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
            >
              Gerenciar categorias
            </Link>

            <Link
              href="/admin/cardapio/produtos"
              className="rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
            >
              Gerenciar produtos
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#6f1018]/10">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
              Categorias
            </p>

            <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
              {categories.length}
            </p>

            <p className="mt-3 text-sm leading-7 text-[#76524a]">
              Categorias principais e subcategorias cadastradas.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#6f1018]/10">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
              Produtos
            </p>

            <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
              {products.length}
            </p>

            <p className="mt-3 text-sm leading-7 text-[#76524a]">
              Produtos cadastrados no cardápio.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-7 shadow-sm ring-1 ring-[#6f1018]/10">
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
              Ativos
            </p>

            <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
              {activeProducts.length}
            </p>

            <p className="mt-3 text-sm leading-7 text-[#76524a]">
              Produtos visíveis no cardápio público.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#3a0a0f]">
                Estrutura atual
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#76524a]">
                Categorias principais e subcategorias que organizam o cardápio.
              </p>
            </div>

            <Link
              href="/admin/cardapio/categorias"
              className="rounded-xl border border-[#6f1018]/20 px-5 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-[#fff7ed]"
            >
              Ver categorias
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {parentCategories.map((parentCategory) => {
              const childCategories = getChildCategories(
                categories,
                parentCategory.id,
              );

              return (
                <article
                  key={parentCategory.id}
                  className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif text-2xl font-bold text-[#3a0a0f]">
                        {parentCategory.name}
                      </h3>

                      {parentCategory.description && (
                        <p className="mt-3 text-sm leading-7 text-[#76524a]">
                          {parentCategory.description}
                        </p>
                      )}
                    </div>

                    <span
                      className={`w-fit rounded-full px-4 py-2 text-xs font-bold text-white ${
                        parentCategory.isActive ? "bg-green-600" : "bg-zinc-500"
                      }`}
                    >
                      {parentCategory.isActive ? "Ativa" : "Inativa"}
                    </span>
                  </div>

                  {childCategories.length > 0 && (
                    <div className="mt-5 space-y-3">
                      {childCategories.map((childCategory) => (
                        <div
                          key={childCategory.id}
                          className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#6f1018] ring-1 ring-[#6f1018]/10"
                        >
                          {childCategory.name}
                        </div>
                      ))}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-bold text-[#3a0a0f]">
                Produtos do cardápio
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#76524a]">
                Cadastre pizzas, esfirras, bebidas, fotos e valores para montar
                o cardápio público.
              </p>
            </div>

            <Link
              href="/admin/cardapio/produtos"
              className="rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
            >
              Gerenciar produtos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
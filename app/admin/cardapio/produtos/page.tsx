import Link from "next/link";
import {
  deleteMenuProduct,
  toggleMenuProductStatus,
} from "./actions";
import { getMenuCategories } from "@/lib/menu-storage";
import { getMenuProducts } from "@/lib/menu-product-storage";

function formatPrice(priceCents: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(priceCents / 100);
}

export default async function AdminCardapioProdutosPage() {
  const [categories, products] = await Promise.all([
    getMenuCategories(),
    getMenuProducts(),
  ]);

  const categoryById = new Map(
    categories.map((category) => [category.id, category]),
  );

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
                Gerencie pizzas, esfirras, bebidas, fotos, valores e itens
                ativos do cardápio.
              </p>
            </div>

            <Link
              href="/admin/cardapio/produtos/novo"
              className="rounded-xl bg-[#6f1018] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
            >
              Novo produto
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
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
                {products.filter((product) => product.isActive).length}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Produtos visíveis no cardápio público.
              </p>
            </div>

            <div className="rounded-2xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10">
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Categorias
              </p>

              <p className="mt-4 font-serif text-4xl font-bold text-[#3a0a0f]">
                {categories.length}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                Categorias disponíveis para vincular produtos.
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
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => {
                const category = categoryById.get(product.categoryId);

                return (
                  <article
                    key={product.id}
                    className="overflow-hidden rounded-2xl bg-[#fff7ed] ring-1 ring-[#6f1018]/10"
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
                          product.isActive ? "bg-green-600" : "bg-zinc-500"
                        }`}
                      >
                        {product.isActive ? "Ativo" : "Inativo"}
                      </span>
                    </div>

                    <div className="p-6">
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#b51f2b]">
                        {category?.name ?? "Sem categoria"}
                      </p>

                      <div className="mt-3 flex items-start justify-between gap-4">
                        <h2 className="font-serif text-2xl font-bold text-[#3a0a0f]">
                          {product.name}
                        </h2>

                        <p className="text-right text-sm font-bold leading-6 text-[#d79a22]">
                          {formatPrice(product.priceCents)}
                        </p>
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

                        <form action={toggleMenuProductStatus}>
                          <input
                            type="hidden"
                            name="productId"
                            value={product.id}
                          />

                          <button
                            type="submit"
                            className="rounded-xl border border-[#6f1018]/20 px-4 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-white"
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
          )}
        </div>
      </section>
    </main>
  );
}
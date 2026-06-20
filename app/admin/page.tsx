import Link from "next/link";

export default function AdminPage() {
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

          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="rounded-md bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              Sair
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
          Administração
        </p>

        <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
          Painel da Popidi
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-[#76524a]">
          Gerencie as principais áreas do site da Popidi Pizzaria: carrossel da
          página inicial, categorias, produtos, fotos e valores do cardápio.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <Link
            href="/admin/carrossel"
            className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#b51f2b] ring-1 ring-[#6f1018]/10">
              <svg
                aria-hidden="true"
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M4 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5Z" />
                <path d="m4 15 4-4a2 2 0 0 1 3 0l2 2 1-1a2 2 0 0 1 3 0l3 3" />
                <path d="M14 8h.01" />
              </svg>
            </div>

            <h2 className="mt-8 font-serif text-3xl font-bold text-[#3a0a0f]">
              Carrossel inicial
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#76524a]">
              Alterar imagens do carrossel da página inicial, definir ordem,
              ativar, desativar, editar e remover imagens.
            </p>

            <p className="mt-6 text-sm font-bold text-[#b51f2b] transition group-hover:translate-x-1">
              Gerenciar carrossel →
            </p>
          </Link>

          <Link
            href="/admin/cardapio"
            className="group rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#fff7ed] text-[#b51f2b] ring-1 ring-[#6f1018]/10">
              <svg
                aria-hidden="true"
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M12 2 4 20h16L12 2Z" />
                <path d="M12 8v4" />
                <path d="M9.5 14h5" />
              </svg>
            </div>

            <h2 className="mt-8 font-serif text-3xl font-bold text-[#3a0a0f]">
              Cardápio
            </h2>

            <p className="mt-4 text-sm leading-7 text-[#76524a]">
              Gerenciar categorias, subcategorias, pizzas, esfirras, bebidas,
              fotos, valores e itens ativos.
            </p>

            <p className="mt-6 text-sm font-bold text-[#b51f2b] transition group-hover:translate-x-1">
              Gerenciar cardápio →
            </p>
          </Link>
        </div>
      </section>
    </main>
  );
}
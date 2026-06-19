import Link from "next/link";
import { ImageIcon, LogOut, Pizza } from "lucide-react";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <header className="border-b border-[#6f1018]/10 bg-[#6f1018] px-6 py-5">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link href="/" className="flex flex-col leading-none text-white">
            <span className="font-serif text-3xl font-bold">Popidi</span>
            <span className="mt-1 text-xs font-bold uppercase tracking-[0.28em] text-yellow-300">
              Pizzaria
            </span>
          </Link>

          <form action="/api/admin/logout" method="post">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-md bg-yellow-400 px-5 py-3 text-sm font-bold text-black transition hover:bg-yellow-300"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
          </form>
        </div>
      </header>

      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Administração
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
            Painel da Popidi
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-8 text-[#76524a]">
            Gerencie as principais áreas do site da Popidi Pizzaria. Vamos
            começar pelo carrossel da página inicial.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Link
              href="/admin/carrossel"
              className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:shadow-md"
            >
              <ImageIcon className="h-10 w-10 text-[#b51f2b]" />

              <h2 className="mt-6 font-serif text-3xl font-bold text-[#3a0a0f]">
                Carrossel inicial
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#76524a]">
                Alterar imagens do carrossel da página inicial, definir ordem e
                controlar imagens ativas.
              </p>
            </Link>

            <div className="rounded-3xl bg-white/60 p-8 opacity-70 ring-1 ring-[#6f1018]/10">
              <Pizza className="h-10 w-10 text-[#b51f2b]" />

              <h2 className="mt-6 font-serif text-3xl font-bold text-[#3a0a0f]">
                Cardápio
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#76524a]">
                Em breve: categorias, pizzas, esfihas, bebidas, fotos e valores.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
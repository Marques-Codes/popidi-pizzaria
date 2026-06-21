import Link from "next/link";

const documents = [
  {
    title: "Carrossel",
    description:
      "Manual para gerenciar imagens, ordem, status e informações do carrossel inicial.",
    fileName: "carrossel.pdf",
    href: "/docs/admin/carrossel.pdf",
  },
  {
    title: "Colocar produto em promoção",
    description:
      "Manual para cadastrar preço promocional, etiqueta de promoção e exibição no cardápio.",
    fileName: "colocar-produto-em-promocao.pdf",
    href: "/docs/admin/colocar-produto-em-promocao.pdf",
  },
  {
    title: "Criar categoria",
    description:
      "Manual para criar categorias e subcategorias do cardápio, como Pizza, Esfirra, Bebidas e Combos.",
    fileName: "criar-categoria.pdf",
    href: "/docs/admin/criar-categoria.pdf",
  },
  {
    title: "Criar produto",
    description:
      "Manual para cadastrar produtos com categoria, descrição, preço, imagem, promoção e destaque na home.",
    fileName: "criar-produto.pdf",
    href: "/docs/admin/criar-produto.pdf",
  },
];

export default function AdminDocumentationPage() {
  return (
    <main className="min-h-screen bg-[#fff7ed]">
      <header className="bg-[#6f1018] px-6 py-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link
            href="/admin"
            className="text-sm font-bold text-yellow-300 transition hover:text-white"
          >
            ← Voltar para o painel
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Documentação
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
            Manuais do painel
          </h1>

          <p className="mt-4 max-w-3xl text-base leading-8 text-[#76524a]">
            Baixe os arquivos em PDF com instruções para usar as principais
            funções do painel administrativo da Popidi Pizzaria.
          </p>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {documents.map((document) => (
              <a
                key={document.href}
                href={document.href}
                download
                className="group rounded-3xl bg-[#fff7ed] p-6 ring-1 ring-[#6f1018]/10 transition hover:-translate-y-1 hover:bg-white hover:shadow-lg"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#b51f2b] ring-1 ring-[#6f1018]/10">
                  <svg
                    aria-hidden="true"
                    className="h-8 w-8"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6 2h9l5 5v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Z" />
                    <path d="M14 2v6h6" />
                    <path d="M8 13h8" />
                    <path d="M8 17h8" />
                    <path d="M8 9h2" />
                  </svg>
                </div>

                <h2 className="mt-6 font-serif text-3xl font-bold text-[#3a0a0f]">
                  {document.title}
                </h2>

                <p className="mt-4 text-sm leading-7 text-[#76524a]">
                  {document.description}
                </p>

                <p className="mt-5 text-xs font-bold uppercase tracking-[0.18em] text-[#76524a]">
                  {document.fileName}
                </p>

                <p className="mt-6 text-sm font-bold text-[#b51f2b] transition group-hover:translate-x-1">
                  Baixar PDF →
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
import Link from "next/link";
import { ArrowLeft, ImagePlus } from "lucide-react";
import { createHeroCarouselSlide } from "../actions";

type NewCarouselImagePageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "title") {
    return "Informe um título para a imagem.";
  }

  if (error === "image") {
    return "Selecione uma imagem para enviar.";
  }

  if (error === "file-type") {
    return "O arquivo precisa ser uma imagem.";
  }

  if (error === "file-size") {
    return "A imagem precisa ter no máximo 5MB.";
  }

  return null;
}

export default async function NewCarouselImagePage({
  searchParams,
}: NewCarouselImagePageProps) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params.error);

  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/admin/carrossel"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#b51f2b] transition hover:text-[#7d1119]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o carrossel
        </Link>

        <section className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <div className="inline-flex rounded-full bg-[#6f1018]/10 p-4">
            <ImagePlus className="h-9 w-9 text-[#b51f2b]" />
          </div>

          <p className="mt-7 text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
            Carrossel
          </p>

          <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
            Adicionar imagem
          </h1>

          <p className="mt-5 text-base leading-8 text-[#76524a]">
            Envie uma nova imagem para aparecer no carrossel principal da página
            inicial.
          </p>

          {errorMessage && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          <form action={createHeroCarouselSlide} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="title"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Título da imagem
              </label>

              <input
                id="title"
                name="title"
                type="text"
                required
                placeholder="Ex: Pizza saindo do forno"
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              />
            </div>

            <div>
              <label htmlFor="alt" className="text-sm font-bold text-[#3a0a0f]">
                Texto alternativo
              </label>

              <input
                id="alt"
                name="alt"
                type="text"
                placeholder="Ex: Pizza artesanal com queijo derretido"
                className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
              />

              <p className="mt-2 text-xs leading-6 text-[#76524a]">
                Esse texto ajuda acessibilidade e SEO. Se deixar vazio, usaremos
                o título.
              </p>
            </div>

            <div>
              <label
                htmlFor="image"
                className="text-sm font-bold text-[#3a0a0f]"
              >
                Imagem
              </label>

              <input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                required
                className="mt-2 w-full rounded-xl border border-dashed border-[#b51f2b]/40 bg-[#fff7ed] px-4 py-6 text-sm text-[#76524a] file:mr-4 file:rounded-lg file:border-0 file:bg-[#6f1018] file:px-4 file:py-3 file:text-sm file:font-bold file:text-white"
              />

              <p className="mt-2 text-xs leading-6 text-[#76524a]">
                Recomendado: imagem horizontal, boa qualidade e até 5MB.
              </p>
            </div>

            <button
              type="submit"
              className="w-full rounded-xl bg-[#e5393f] px-6 py-4 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
            >
              Salvar imagem no carrossel
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft, Save } from "lucide-react";
import {
  getHeroCarouselSlides,
  sortHeroCarouselSlides,
} from "@/lib/hero-carousel-storage";
import { updateHeroCarouselSlide } from "../../actions";

type EditCarouselImagePageProps = {
  params: Promise<{
    slideId: string;
  }>;
  searchParams: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "title") {
    return "Informe um título para a imagem.";
  }

  if (error === "file-type") {
    return "O arquivo precisa ser uma imagem.";
  }

  if (error === "file-size") {
    return "A imagem precisa ter no máximo 5MB.";
  }

  return null;
}

export default async function EditCarouselImagePage({
  params,
  searchParams,
}: EditCarouselImagePageProps) {
  const { slideId } = await params;
  const query = await searchParams;

  const slides = await getHeroCarouselSlides();
  const orderedSlides = sortHeroCarouselSlides(slides);
  const slide = orderedSlides.find((item) => item.id === slideId);

  if (!slide) {
    redirect("/admin/carrossel");
  }

  const errorMessage = getErrorMessage(query.error);

  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/admin/carrossel"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#b51f2b] transition hover:text-[#7d1119]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o carrossel
        </Link>

        <section className="mt-10 grid gap-8 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="overflow-hidden rounded-2xl bg-[#fff7ed] ring-1 ring-[#6f1018]/10">
              <img
                src={slide.image}
                alt={slide.alt}
                className="h-80 w-full object-cover"
              />
            </div>

            <div className="mt-5 rounded-2xl bg-[#fff7ed] p-5 ring-1 ring-[#6f1018]/10">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b51f2b]">
                Ordem atual
              </p>

              <p className="mt-2 font-serif text-3xl font-bold text-[#3a0a0f]">
                {slide.order}
              </p>

              <p className="mt-3 text-sm leading-7 text-[#76524a]">
                A ordem é alterada pelos botões subir/descer na listagem do
                carrossel.
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
              Carrossel
            </p>

            <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
              Editar imagem
            </h1>

            <p className="mt-5 text-base leading-8 text-[#76524a]">
              Altere o título, texto alternativo ou substitua a imagem do
              carrossel.
            </p>

            {errorMessage && (
              <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                {errorMessage}
              </div>
            )}

            <form action={updateHeroCarouselSlide} className="mt-8 space-y-6">
              <input type="hidden" name="slideId" value={slide.id} />

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
                  defaultValue={slide.title}
                  className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                />
              </div>

              <div>
                <label
                  htmlFor="alt"
                  className="text-sm font-bold text-[#3a0a0f]"
                >
                  Texto alternativo
                </label>

                <input
                  id="alt"
                  name="alt"
                  type="text"
                  defaultValue={slide.alt}
                  className="mt-2 w-full rounded-xl border border-[#6f1018]/20 bg-[#fff7ed] px-4 py-4 text-[#3a0a0f] outline-none transition focus:border-[#b51f2b]"
                />

                <p className="mt-2 text-xs leading-6 text-[#76524a]">
                  Esse texto ajuda acessibilidade e SEO.
                </p>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="text-sm font-bold text-[#3a0a0f]"
                >
                  Trocar imagem
                </label>

                <input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                  className="mt-2 w-full rounded-xl border border-dashed border-[#b51f2b]/40 bg-[#fff7ed] px-4 py-6 text-sm text-[#76524a] file:mr-4 file:rounded-lg file:border-0 file:bg-[#6f1018] file:px-4 file:py-3 file:text-sm file:font-bold file:text-white"
                />

                <p className="mt-2 text-xs leading-6 text-[#76524a]">
                  Deixe vazio para manter a imagem atual.
                </p>
              </div>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#e5393f] px-6 py-4 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
              >
                <Save className="h-5 w-5" />
                Salvar alterações
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
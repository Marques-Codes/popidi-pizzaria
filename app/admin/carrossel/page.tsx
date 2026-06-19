import Link from "next/link";
import {
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  BadgeCheck,
  Eye,
  ImagePlus,
  Pencil,
  Power,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import {
  getHeroCarouselSlides,
  sortHeroCarouselSlides,
} from "@/lib/hero-carousel-storage";
import {
  deleteHeroCarouselSlide,
  moveHeroCarouselSlide,
  toggleHeroCarouselSlideStatus,
} from "./actions";

export const dynamic = "force-dynamic";

type AdminCarrosselPageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

function getErrorMessage(error?: string) {
  if (error === "min-active") {
    return "O carrossel precisa manter no mínimo 2 imagens ativas.";
  }

  return null;
}

export default async function AdminCarrosselPage({
  searchParams,
}: AdminCarrosselPageProps) {
  const params = await searchParams;
  const errorMessage = getErrorMessage(params.error);

  const slides = await getHeroCarouselSlides();
  const orderedSlides = sortHeroCarouselSlides(slides);
  const activeSlides = orderedSlides.filter((slide) => slide.isActive);
  const hasMinimumActiveSlides = activeSlides.length >= 2;

  return (
    <main className="min-h-screen bg-[#fff7ed] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm font-bold text-[#b51f2b] transition hover:text-[#7d1119]"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar para o painel
        </Link>

        <div className="mt-10 rounded-3xl bg-white p-8 shadow-sm ring-1 ring-[#6f1018]/10">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#b51f2b]">
                Carrossel
              </p>

              <h1 className="mt-4 font-serif text-5xl font-bold text-[#3a0a0f]">
                Imagens da página inicial
              </h1>

              <p className="mt-5 max-w-3xl text-base leading-8 text-[#76524a]">
                Controle as imagens que aparecem no carrossel principal do site.
                A regra é manter pelo menos 2 imagens ativas.
              </p>
            </div>

            <Link
              href="/admin/carrossel/nova"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#e5393f] px-6 py-4 text-sm font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
            >
              <ImagePlus className="h-5 w-5" />
              Adicionar imagem
            </Link>
          </div>

          {errorMessage && (
            <div className="mt-8 flex items-start gap-3 rounded-2xl bg-red-50 px-5 py-4 text-red-800">
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />

              <p className="text-sm font-semibold leading-6">
                {errorMessage}
              </p>
            </div>
          )}

          <div
            className={`mt-8 flex items-start gap-3 rounded-2xl px-5 py-4 ${
              hasMinimumActiveSlides
                ? "bg-green-50 text-green-800"
                : "bg-red-50 text-red-800"
            }`}
          >
            {hasMinimumActiveSlides ? (
              <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0" />
            ) : (
              <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0" />
            )}

            <p className="text-sm font-semibold leading-6">
              {hasMinimumActiveSlides
                ? `Tudo certo: existem ${activeSlides.length} imagens ativas no carrossel.`
                : "Atenção: o carrossel precisa ter no mínimo 2 imagens ativas."}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {orderedSlides.map((slide, index) => {
              const isFirst = index === 0;
              const isLast = index === orderedSlides.length - 1;

              return (
                <article
                  key={slide.id}
                  className="overflow-hidden rounded-2xl bg-[#fff7ed] ring-1 ring-[#6f1018]/10"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={slide.image}
                      alt={slide.alt}
                      className="h-full w-full object-cover"
                    />

                    <span
                      className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-bold text-white ${
                        slide.isActive ? "bg-green-600" : "bg-zinc-500"
                      }`}
                    >
                      {slide.isActive ? "Ativa" : "Inativa"}
                    </span>
                  </div>

                  <div className="p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#b51f2b]">
                      Ordem {slide.order}
                    </p>

                    <h2 className="mt-2 font-serif text-2xl font-bold text-[#3a0a0f]">
                      {slide.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-[#76524a]">
                      {slide.alt}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-3">
                      <a
                        href={slide.image}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-[#b51f2b]/25 px-4 py-3 text-sm font-bold text-[#b51f2b] transition hover:bg-[#b51f2b] hover:text-white"
                      >
                        <Eye className="h-4 w-4" />
                        Ver imagem
                      </a>

                      <Link
                        href={`/admin/carrossel/${slide.id}/editar`}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#6f1018] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
                      >
                        <Pencil className="h-4 w-4" />
                        Editar
                      </Link>

                      <form action={toggleHeroCarouselSlideStatus}>
                        <input type="hidden" name="slideId" value={slide.id} />

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-lg bg-[#6f1018] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#8f1721]"
                        >
                          <Power className="h-4 w-4" />
                          {slide.isActive ? "Desativar" : "Ativar"}
                        </button>
                      </form>

                      <form action={moveHeroCarouselSlide}>
                        <input type="hidden" name="slideId" value={slide.id} />
                        <input type="hidden" name="direction" value="up" />

                        <button
                          type="submit"
                          disabled={isFirst}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#6f1018]/20 px-4 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-[#6f1018] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowUp className="h-4 w-4" />
                          Subir
                        </button>
                      </form>

                      <form action={moveHeroCarouselSlide}>
                        <input type="hidden" name="slideId" value={slide.id} />
                        <input type="hidden" name="direction" value="down" />

                        <button
                          type="submit"
                          disabled={isLast}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#6f1018]/20 px-4 py-3 text-sm font-bold text-[#6f1018] transition hover:bg-[#6f1018] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                          <ArrowDown className="h-4 w-4" />
                          Descer
                        </button>
                      </form>

                      <form action={deleteHeroCarouselSlide}>
                        <input type="hidden" name="slideId" value={slide.id} />

                        <button
                          type="submit"
                          className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                          Remover
                        </button>
                      </form>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}
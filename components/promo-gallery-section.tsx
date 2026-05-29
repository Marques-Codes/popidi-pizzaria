export function PromoGallerySection() {
  return (
    <section className="bg-[#fff8ed] px-6 pb-20">
      <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[1fr_1fr]">
        <article
          id="promocoes"
          className="scroll-mt-28 overflow-hidden rounded-3xl bg-[#b20f18] p-8 text-white shadow-2xl shadow-black/10"
        >
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f5bf24]">
                Promoções
              </p>

              <h2 className="mt-3 text-4xl font-black leading-tight">
                Promoções imperdíveis para você!
              </h2>

              <p className="mt-4 text-white/80">
                Ofertas especiais toda semana para deixar tudo ainda mais
                gostoso.
              </p>

              <a
                href="#"
                className="mt-7 inline-flex rounded-full bg-[#f5bf24] px-6 py-3 text-sm font-black text-black transition hover:bg-white"
              >
                Ver promoções
              </a>
            </div>

            <div className="relative min-h-56 rounded-3xl bg-[radial-gradient(circle_at_50%_45%,#f8c14a_0%,#d56b16_30%,#8d1016_62%,#3b0508_100%)]">
              <div className="absolute right-5 top-5 rounded-full bg-[#f5bf24] px-5 py-4 text-center font-black text-[#b20f18] shadow-xl">
                <span className="block text-xs uppercase">A partir de</span>
                <span className="block text-3xl">49,90</span>
              </div>

              <div className="absolute bottom-6 left-6 right-6 h-10 rounded-full bg-black/35 blur-xl" />
            </div>
          </div>
        </article>

        <article
          id="galeria"
          className="scroll-mt-28 overflow-hidden rounded-3xl bg-[#111] p-8 text-white shadow-2xl shadow-black/10"
        >
          <div className="grid gap-8 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f5bf24]">
                Galeria
              </p>

              <h2 className="mt-3 text-4xl font-black leading-tight">
                Um olhar para o que preparamos com amor.
              </h2>

              <p className="mt-4 text-white/70">
                Em breve, fotos reais das pizzas, do ambiente e da equipe da
                Pópidi Pizzaria.
              </p>

              <a
                href="#"
                className="mt-7 inline-flex rounded-full border border-white/25 px-6 py-3 text-sm font-black text-white transition hover:border-[#f5bf24] hover:text-[#f5bf24]"
              >
                Ver galeria
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="h-28 rounded-2xl bg-gradient-to-br from-red-900 to-orange-500" />
              <div className="h-28 rounded-2xl bg-gradient-to-br from-stone-900 to-yellow-700" />
              <div className="h-28 rounded-2xl bg-gradient-to-br from-black to-red-900" />
              <div className="h-28 rounded-2xl bg-gradient-to-br from-yellow-700 to-red-900" />
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
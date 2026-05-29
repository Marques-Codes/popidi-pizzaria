export function HeroSection() {
  return (
    <section id="inicio" className="relative min-h-screen overflow-hidden bg-[#080808]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,191,36,0.22),transparent_32%),radial-gradient(circle_at_35%_75%,rgba(178,15,24,0.18),transparent_35%)]" />

      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 pt-32 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="mb-5 inline-flex rounded-full border border-[#f5bf24]/40 bg-[#f5bf24]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.28em] text-[#f5bf24]">
            Sabor artesanal todos os dias
          </p>

          <h1 className="max-w-2xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
            O sabor da pizza perfeita está aqui
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            Na Pópidi Pizzaria, cada pizza é preparada com massa artesanal,
            ingredientes frescos e aquele sabor que transforma qualquer momento
            em uma boa lembrança.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a
              href="#"
              className="rounded-full bg-[#23a334] px-8 py-4 text-center text-base font-black text-white shadow-xl shadow-green-950/40 transition hover:scale-105"
            >
              Pedir pelo WhatsApp
            </a>

            <a
              href="#cardapio"
              className="rounded-full border border-white/25 px-8 py-4 text-center text-base font-bold text-white transition hover:border-[#f5bf24] hover:text-[#f5bf24]"
            >
              Ver cardápio
            </a>
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute -left-8 top-10 z-10 rounded-2xl border border-white/10 bg-white/10 px-5 py-4 text-white shadow-2xl backdrop-blur">
            <strong className="block text-3xl text-[#f5bf24]">+20</strong>
            <span className="text-sm text-white/75">sabores especiais</span>
          </div>

          <div className="relative aspect-square rounded-full border border-white/10 bg-[radial-gradient(circle_at_50%_45%,#f8c14a_0%,#d56b16_28%,#9b1119_48%,#3b0909_70%,#120606_100%)] shadow-2xl shadow-black/60">
            <div className="absolute inset-10 rounded-full border-[18px] border-[#d88b38]/70 bg-[radial-gradient(circle_at_50%_50%,#f6d37b_0%,#d73f25_32%,#7d1212_58%,#2a0505_100%)] shadow-inner" />

            <div className="absolute left-[24%] top-[30%] h-12 w-12 rounded-full bg-red-700 ring-4 ring-red-900/40" />
            <div className="absolute right-[28%] top-[26%] h-10 w-10 rounded-full bg-red-700 ring-4 ring-red-900/40" />
            <div className="absolute bottom-[32%] left-[34%] h-10 w-10 rounded-full bg-red-700 ring-4 ring-red-900/40" />
            <div className="absolute bottom-[26%] right-[32%] h-12 w-12 rounded-full bg-red-700 ring-4 ring-red-900/40" />

            <div className="absolute left-[42%] top-[22%] h-7 w-16 -rotate-12 rounded-full bg-green-700" />
            <div className="absolute right-[23%] top-[43%] h-7 w-16 rotate-12 rounded-full bg-green-700" />
            <div className="absolute bottom-[24%] left-[48%] h-7 w-16 rotate-45 rounded-full bg-green-700" />

            <div className="absolute -bottom-4 left-1/2 h-20 w-[72%] -translate-x-1/2 rounded-[100%] bg-black/50 blur-xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
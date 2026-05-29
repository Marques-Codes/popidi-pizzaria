export function AboutSection() {
  return (
    <section id="sobre-nos" className="scroll-mt-28 bg-[#fff8ed] px-6 py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative overflow-hidden rounded-3xl bg-[#111] p-8 text-white shadow-2xl shadow-black/10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(245,191,36,0.35),transparent_35%),linear-gradient(135deg,#1a0505,#080808_60%,#3b070b)]" />

          <div className="relative">
            <p className="text-sm font-black uppercase tracking-[0.25em] text-[#f5bf24]">
              Desde 2026
            </p>

            <h2 className="mt-5 max-w-md text-4xl font-black leading-tight md:text-5xl">
              Uma pizzaria feita para criar bons momentos.
            </h2>

            <p className="mt-5 max-w-md text-base leading-7 text-white/70">
              A Pópidi Pizzaria nasceu com uma ideia simples: preparar pizzas
              saborosas, com massa artesanal, ingredientes selecionados e aquele
              cuidado que faz o cliente se sentir em casa.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <strong className="block text-2xl text-[#f5bf24]">100%</strong>
                <span className="text-sm text-white/70">massa artesanal</span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <strong className="block text-2xl text-[#f5bf24]">+20</strong>
                <span className="text-sm text-white/70">sabores especiais</span>
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur">
                <strong className="block text-2xl text-[#f5bf24]">Delivery</strong>
                <span className="text-sm text-white/70">rápido e seguro</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-black uppercase tracking-[0.3em] text-[#b20f18]">
            Sobre nós
          </p>

          <h2 className="mt-4 text-4xl font-black leading-tight text-[#17120f] md:text-5xl">
            Tradição, sabor e qualidade em cada detalhe.
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-black/65">
            Mais do que vender pizzas, queremos fazer parte dos momentos
            especiais dos nossos clientes. Por isso, cada receita é pensada para
            entregar sabor, carinho e uma experiência memorável.
          </p>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5bf24] font-black text-black">
                01
              </div>
              <h3 className="text-xl font-black text-[#17120f]">Tradição</h3>
              <p className="mt-3 text-sm leading-6 text-black/60">
                Receitas preparadas com cuidado e sabor de pizzaria de verdade.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5bf24] font-black text-black">
                02
              </div>
              <h3 className="text-xl font-black text-[#17120f]">Qualidade</h3>
              <p className="mt-3 text-sm leading-6 text-black/60">
                Ingredientes escolhidos para entregar uma pizza sempre melhor.
              </p>
            </div>

            <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-xl shadow-black/5">
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#f5bf24] font-black text-black">
                03
              </div>
              <h3 className="text-xl font-black text-[#17120f]">Experiência</h3>
              <p className="mt-3 text-sm leading-6 text-black/60">
                Atendimento próximo, pedidos práticos e momentos mais gostosos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
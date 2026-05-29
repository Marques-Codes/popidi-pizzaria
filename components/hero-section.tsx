"use client";

import { useEffect, useState } from "react";

const heroSlides = [
  {
    image: "/images/hero/pizza-hero-1.webp",
    title: "O sabor da pizza perfeita está aqui",
    description:
      "Na Pópidi Pizzaria, cada pizza é preparada com massa artesanal, ingredientes frescos e aquele sabor que transforma qualquer momento em uma boa lembrança.",
  },
  {
    image: "/images/hero/pizza-hero-2.jpg",
    title: "Pizza feita com carinho e tradição",
    description:
      "Sabores clássicos e especiais preparados para quem valoriza qualidade, massa no ponto certo e aquele aroma de pizza saindo do forno.",
  },
  {
    image: "/images/hero/pizza-hero-3.jpg",
    title: "Peça sua pizza e aproveite melhor o dia",
    description:
      "Combos, pizzas salgadas, doces e bebidas para deixar seu pedido completo e perfeito para dividir com quem você gosta.",
  },
];

export function HeroSection() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setActiveSlideIndex((currentIndex) =>
        currentIndex === heroSlides.length - 1 ? 0 : currentIndex + 1,
      );
    }, 4000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const activeSlide = heroSlides[activeSlideIndex];

  return (
    <section
      id="inicio"
      className="relative min-h-screen overflow-hidden bg-[#080808]"
    >
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              index === activeSlideIndex ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${slide.image}')`,
            }}
          />
        ))}

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.95)_0%,rgba(0,0,0,0.82)_38%,rgba(0,0,0,0.35)_70%,rgba(0,0,0,0.2)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(245,191,36,0.22),transparent_32%),radial-gradient(circle_at_35%_75%,rgba(178,15,24,0.18),transparent_35%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen w-full items-center justify-start px-5 pb-12 pt-32 sm:px-10 sm:pt-36 lg:px-16">
        <div className="max-w-xl translate-y-40 text-left md:max-w-2xl md:translate-y-20">
          <h1 className="max-w-xl text-left text-[1.3rem] font-black leading-[1.05] tracking-tight text-white sm:text-4xl md:text-5xl lg:text-3xl">
            {activeSlide.title}
          </h1>

          <p className="mt-3 max-w-lg text-left text-sm leading-6 text-white/75 sm:text-base sm:leading-7 md:text-lg md:leading-8">
            {activeSlide.description}
          </p>

          <div className="mt-3 flex flex-col items-start gap-3 sm:flex-row sm:gap-4">
            <a
              href="https://wa.me/5511987654321"
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-full bg-[#23a334] px-6 py-3.5 text-center text-sm font-black text-white shadow-xl shadow-green-950/40 transition hover:scale-105 sm:px-7 sm:py-3.5 sm:text-sm md:px-8 md:py-4 md:text-base"
            >
              Pedir pelo WhatsApp
            </a>

            <a
              href="#cardapio"
              className="inline-flex rounded-full border border-white/25 px-6 py-3.5 text-center text-sm font-bold text-white transition hover:border-[#f5bf24] hover:text-[#f5bf24] sm:px-7 sm:py-3.5 sm:text-sm md:px-8 md:py-4 md:text-base"
            >
              Ver cardápio
            </a>
          </div>

          <div className="mt-8 flex items-center justify-start gap-3 sm:mt-10">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.image}
                type="button"
                onClick={() => setActiveSlideIndex(index)}
                aria-label={`Ir para o slide ${index + 1}`}
                className={`h-3 rounded-full transition-all ${
                  index === activeSlideIndex
                    ? "w-9 bg-[#f5bf24]"
                    : "w-3 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
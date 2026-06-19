"use client";

import { useEffect, useMemo, useState } from "react";
import type { HeroCarouselSlide } from "@/data/hero-carousel-slides";
import { getActiveHeroCarouselSlides } from "@/lib/hero-carousel-storage";

type HeroCarouselProps = {
  slides: HeroCarouselSlide[];
};

export function HeroCarousel({ slides: initialSlides }: HeroCarouselProps) {
  const slides = useMemo(() => {
    return getActiveHeroCarouselSlides(initialSlides);
  }, [initialSlides]);

  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveImageIndex((currentIndex) => {
        const nextIndex = currentIndex + 1;

        if (nextIndex >= slides.length) {
          return 0;
        }

        return nextIndex;
      });
    }, 3000);

    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section
      id="inicio"
      className="relative flex min-h-[calc(100vh-80px)] items-center justify-center overflow-hidden px-6 text-center"
    >
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === activeImageIndex ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage: `url(${slide.image})`,
          }}
        />
      ))}

      <div className="absolute inset-0 bg-black/55" />

      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-[#fff7ed]" />

      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        <p className="rounded-full bg-[#6f1018]/80 px-5 py-2 text-sm font-bold text-white">
          Popidi Pizzaria em Arapongas - PR
        </p>

        <h1 className="mt-8 max-w-4xl font-serif text-5xl font-bold tracking-tight text-white md:text-7xl">
          O sabor da pizza perfeita está aqui
        </h1>

        <p className="mt-6 max-w-2xl text-xl leading-8 text-white/90">
          Pizzas salgadas, doces, combos e bebidas preparados para transformar
          qualquer momento em uma boa lembrança.
        </p>

        <a
          href="#cardapio"
          className="mt-10 rounded-md bg-[#e5393f] px-8 py-4 text-base font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
        >
          Ver Cardápio
        </a>
      </div>

      <div className="absolute bottom-16 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            aria-label={`Ir para imagem ${index + 1}`}
            onClick={() => setActiveImageIndex(index)}
            className={`h-2 rounded-full transition-all ${
              index === activeImageIndex
                ? "w-7 bg-white"
                : "w-2 bg-white/50 hover:bg-white"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
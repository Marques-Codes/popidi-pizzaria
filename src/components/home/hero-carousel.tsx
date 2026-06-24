"use client";

import { useEffect, useMemo, useState } from "react";
import type { HeroCarouselSlide } from "@/data/hero-carousel-slides";
import { getActiveHeroCarouselSlides } from "@/lib/hero-carousel-storage";

type HeroCarouselProps = {
  slides: HeroCarouselSlide[];
};

const instagramUrl = "https://www.instagram.com/popidipizzaria/";

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

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
      className="relative flex h-[560px] items-center justify-center overflow-hidden px-6 text-center md:h-[640px]"
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

      <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-[#fff7ed]" />

      <a
        href={instagramUrl}
        target="_blank"
        rel="noreferrer"
        aria-label="Abrir Instagram da Popidi Pizzaria"
        className="absolute right-6 top-6 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-[#b51f2b] shadow-lg ring-1 ring-white/40 backdrop-blur transition hover:-translate-y-0.5 hover:bg-yellow-400 hover:text-[#220305] md:right-10 md:top-8"
      >
        <InstagramIcon />
      </a>

      <div className="relative z-10 flex max-w-5xl flex-col items-center">
        <h1 className="max-w-4xl font-serif text-4xl font-bold tracking-tight text-white md:text-6xl">
          O sabor da pizza perfeita está aqui
        </h1>

        <p className="mt-5 max-w-2xl text-base leading-8 text-white/90 md:text-xl">
          Pizzas salgadas, doces, combos e bebidas preparados para transformar
          qualquer momento em uma boa lembrança.
        </p>

        <a
          href="#cardapio"
          className="mt-8 rounded-md bg-[#e5393f] px-8 py-4 text-base font-bold text-white transition hover:bg-yellow-400 hover:text-[#220305]"
        >
          Ver Cardápio
        </a>
      </div>

      <div className="absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 gap-2">
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
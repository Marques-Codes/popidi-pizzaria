import { list, put } from "@vercel/blob";
import {
  defaultHeroCarouselSlides,
  type HeroCarouselSlide,
} from "@/data/hero-carousel-slides";

const carouselConfigPath = "config/hero-carousel-slides.json";

function isValidSlide(slide: unknown): slide is HeroCarouselSlide {
  if (!slide || typeof slide !== "object") {
    return false;
  }

  const item = slide as HeroCarouselSlide;

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.image === "string" &&
    typeof item.alt === "string" &&
    typeof item.isActive === "boolean" &&
    typeof item.order === "number"
  );
}

export function sortHeroCarouselSlides(slides: HeroCarouselSlide[]) {
  return slides
    .slice()
    .sort((firstSlide, secondSlide) => firstSlide.order - secondSlide.order);
}

export function getActiveHeroCarouselSlides(slides: HeroCarouselSlide[]) {
  const orderedSlides = sortHeroCarouselSlides(slides);
  const activeSlides = orderedSlides.filter((slide) => slide.isActive);

  if (activeSlides.length >= 2) {
    return activeSlides;
  }

  return orderedSlides.slice(0, 2);
}

export async function getHeroCarouselSlides() {
  try {
    const result = await list({
      prefix: carouselConfigPath,
      limit: 1,
    });

    const configBlob = result.blobs.find(
      (blob) => blob.pathname === carouselConfigPath,
    );

    if (!configBlob) {
      return defaultHeroCarouselSlides;
    }

    const response = await fetch(`${configBlob.url}?v=${Date.now()}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      return defaultHeroCarouselSlides;
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      return defaultHeroCarouselSlides;
    }

    const validSlides = data.filter(isValidSlide);

    if (validSlides.length === 0) {
      return defaultHeroCarouselSlides;
    }

    return validSlides;
  } catch {
    return defaultHeroCarouselSlides;
  }
}

export async function saveHeroCarouselSlides(slides: HeroCarouselSlide[]) {
  const orderedSlides = sortHeroCarouselSlides(slides);

  await put(carouselConfigPath, JSON.stringify(orderedSlides, null, 2), {
    access: "public",
    allowOverwrite: true,
    contentType: "application/json",
  });
}
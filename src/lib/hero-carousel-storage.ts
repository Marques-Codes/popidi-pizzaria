import {
  defaultHeroCarouselSlides,
  type HeroCarouselSlide,
} from "@/data/hero-carousel-slides";
import { getSupabaseAdminClient } from "@/lib/supabase-admin";

type HeroCarouselSlideRow = {
  id: string;
  title: string;
  alt: string;
  image_url: string;
  is_active: boolean;
  display_order: number;
};

function mapRowToSlide(row: HeroCarouselSlideRow): HeroCarouselSlide {
  return {
    id: row.id,
    title: row.title,
    alt: row.alt,
    image: row.image_url,
    isActive: row.is_active,
    order: row.display_order,
  };
}

function mapSlideToRow(slide: HeroCarouselSlide) {
  return {
    id: slide.id,
    title: slide.title,
    alt: slide.alt,
    image_url: slide.image,
    is_active: slide.isActive,
    display_order: slide.order,
    updated_at: new Date().toISOString(),
  };
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
    const supabase = getSupabaseAdminClient();

    const { data, error } = await supabase
      .from("hero_carousel_slides")
      .select("id,title,alt,image_url,is_active,display_order")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Erro ao buscar carrossel no Supabase:", error.message);
      return defaultHeroCarouselSlides;
    }

    if (!data || data.length === 0) {
      return defaultHeroCarouselSlides;
    }

    return data.map((row) => mapRowToSlide(row as HeroCarouselSlideRow));
  } catch (error) {
    console.error("Erro inesperado ao buscar carrossel:", error);
    return defaultHeroCarouselSlides;
  }
}

export async function saveHeroCarouselSlides(slides: HeroCarouselSlide[]) {
  const supabase = getSupabaseAdminClient();

  const orderedSlides = sortHeroCarouselSlides(slides);
  const rows = orderedSlides.map(mapSlideToRow);

  const { error } = await supabase
    .from("hero_carousel_slides")
    .upsert(rows, { onConflict: "id" });

  if (error) {
    throw new Error(`Erro ao salvar carrossel no Supabase: ${error.message}`);
  }
}

export async function deleteHeroCarouselSlideRecord(slideId: string) {
  const supabase = getSupabaseAdminClient();

  const { error } = await supabase
    .from("hero_carousel_slides")
    .delete()
    .eq("id", slideId);

  if (error) {
    throw new Error(`Erro ao remover slide do Supabase: ${error.message}`);
  }
}
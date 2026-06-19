import { DifferentialsSection } from "@/components/home/differentials-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { LocationSection } from "@/components/home/location-section";
import { MenuHighlightsSection } from "@/components/home/menu-highlights-section";
import { StorySection } from "@/components/home/story-section";
import { SiteHeader } from "@/components/site-header";
import { getHeroCarouselSlides } from "@/lib/hero-carousel-storage";

export const dynamic = "force-dynamic";

export default async function Home() {
  const heroSlides = await getHeroCarouselSlides();

  return (
    <>
      <SiteHeader />

      <main className="bg-[#fff7ed] pt-20">
        <HeroCarousel slides={heroSlides} />
        <StorySection />
        <DifferentialsSection />
        <MenuHighlightsSection />
        <LocationSection />
      </main>
    </>
  );
}
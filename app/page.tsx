import { DifferentialsSection } from "@/components/home/differentials-section";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { LocationSection } from "@/components/home/location-section";
import { MenuHighlightsSection } from "@/components/home/menu-highlights-section";
import { StorySection } from "@/components/home/story-section";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <>
      <SiteHeader />

      <main className="bg-[#fff7ed] pt-20">
        <HeroCarousel />
        <StorySection />
        <DifferentialsSection />
        <MenuHighlightsSection />
        <LocationSection />
      </main>
    </>
  );
}
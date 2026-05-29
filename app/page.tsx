import { AboutSection } from "@/components/about-section";
import { BenefitsSection } from "@/components/benefits-section";
import { HeroSection } from "@/components/hero-section";
import { MenuHighlights } from "@/components/menu-highlights";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <BenefitsSection />
      <MenuHighlights />
      <AboutSection />
      <SiteFooter />
    </main>
  );
}
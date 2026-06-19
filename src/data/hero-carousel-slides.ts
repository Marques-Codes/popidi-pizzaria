export type HeroCarouselSlide = {
  id: string;
  title: string;
  image: string;
  alt: string;
  isActive: boolean;
  order: number;
};

export const defaultHeroCarouselSlides: HeroCarouselSlide[] = [
  {
    id: "hero-1",
    title: "Pizza artesanal",
    image: "/images/hero/pizza-hero-1.webp",
    alt: "Pizza artesanal da Popidi Pizzaria",
    isActive: true,
    order: 1,
  },
  {
    id: "hero-2",
    title: "Pizza com queijo puxando",
    image: "/images/hero/pizza-hero-2.jpg",
    alt: "Pizza com queijo derretido",
    isActive: true,
    order: 2,
  },
  {
    id: "hero-3",
    title: "Pizza especial",
    image: "/images/hero/pizza-hero-3.jpg",
    alt: "Pizza especial da Popidi",
    isActive: true,
    order: 3,
  },
];
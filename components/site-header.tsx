"use client";

import { useEffect, useState } from "react";

const navItems = [
  {
    label: "Início",
    href: "/#inicio",
    sectionId: "inicio",
  },
  {
    label: "Cardápio",
    href: "/#cardapio",
    sectionId: "cardapio",
  },
  {
    label: "Sobre Nós",
    href: "/#sobre-nos",
    sectionId: "sobre-nos",
  },
  {
    label: "Contato",
    href: "/#contato",
    sectionId: "contato",
  },
];

export function SiteHeader() {
  const [activeSection, setActiveSection] = useState("inicio");

  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.sectionId))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);

        if (visibleEntries.length > 0) {
          const mostVisibleSection = visibleEntries.reduce((current, entry) => {
            return entry.intersectionRatio > current.intersectionRatio
              ? entry
              : current;
          });

          setActiveSection(mostVisibleSection.target.id);
        }
      },
      {
        root: null,
        rootMargin: "-30% 0px -55% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#inicio" className="leading-none">
          <strong className="block text-3xl font-black tracking-tight text-[#f5bf24]">
            Pópidi
          </strong>

          <span className="block text-center text-xs font-bold tracking-[0.35em] text-white">
            PIZZARIA
          </span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => {
            const isActive = activeSection === item.sectionId;

            return (
              <a
                key={item.label}
                href={item.href}
                className={`relative text-sm font-semibold transition ${
                  isActive
                    ? "text-[#f5bf24]"
                    : "text-white/85 hover:text-[#f5bf24]"
                }`}
              >
                {item.label}

                <span
                  className={`absolute -bottom-2 left-0 h-0.5 rounded-full bg-[#f5bf24] transition-all ${
                    isActive ? "w-full" : "w-0"
                  }`}
                />
              </a>
            );
          })}
        </nav>

        <a
          href="https://wa.me/5511987654321"
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full bg-[#23a334] px-5 py-3 text-sm font-bold text-white shadow-lg transition hover:scale-105 lg:inline-flex"
        >
          Pedir pelo WhatsApp
        </a>
      </div>
    </header>
  );
}
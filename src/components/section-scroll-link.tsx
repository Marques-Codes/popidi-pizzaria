"use client";

import { usePathname } from "next/navigation";
import type { MouseEvent, ReactNode } from "react";

type SectionScrollLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
};

export function SectionScrollLink({
  href,
  children,
  className,
}: SectionScrollLinkProps) {
  const pathname = usePathname();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const sectionId = href.split("#")[1];

    if (!sectionId) {
      return;
    }

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();

    const section = document.getElementById(sectionId);

    if (!section) {
      return;
    }

    window.history.pushState(null, "", href);

    const headerOffset = 96;
    const sectionPosition = section.getBoundingClientRect().top + window.scrollY;
    const scrollPosition = sectionPosition - headerOffset;

    window.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
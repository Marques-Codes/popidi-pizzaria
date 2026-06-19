"use client";

import { usePathname } from "next/navigation";
import { FaWhatsapp } from "react-icons/fa";

const whatsappNumber = "5543999384998";

const whatsappMessage =
  "Olá! Vim pelo site da Popidi Pizzaria e gostaria de fazer um pedido.";

const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
  whatsappMessage,
)}`;

export function FloatingWhatsAppButton() {
  const pathname = usePathname();

  if (pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chamar Popidi Pizzaria no WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-2xl ring-4 ring-white/80 transition hover:scale-110 hover:bg-[#1ebe5d]"
    >
      <FaWhatsapp className="h-9 w-9" />
    </a>
  );
}
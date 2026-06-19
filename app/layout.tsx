import type { Metadata } from "next";
import { FloatingWhatsAppButton } from "@/components/floating-whatsapp-button";
import "./globals.css";

export const metadata: Metadata = {
  title: "Popidi Pizzaria | Arapongas - PR",
  description:
    "Popidi Pizzaria em Arapongas, Paraná. Pizzas salgadas, doces, combos e bebidas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <FloatingWhatsAppButton />
      </body>
    </html>
  );
}
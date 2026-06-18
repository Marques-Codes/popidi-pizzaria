import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
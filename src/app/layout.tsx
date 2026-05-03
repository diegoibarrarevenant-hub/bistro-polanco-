import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Longevit — Suplementos de Longevidad con Respaldo Científico",
    template: "%s | Longevit",
  },
  description:
    "Protocolos de 90 días diseñados por científicos. Ingredientes en dosis clínicas verificadas por laboratorio independiente.",
  keywords: [
    "suplementos longevidad",
    "biohacking",
    "NAD+",
    "NMN",
    "resveratrol",
    "protocolo 90 dias",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

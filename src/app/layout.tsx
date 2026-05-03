import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bistro Polanco — Alta Cocina en Ciudad de México",
    template: "%s | Bistro Polanco",
  },
  description:
    "Experiencia gastronómica de vanguardia en el corazón de Polanco. Ingredientes de origen trazable, técnica francesa y alma mexicana.",
  keywords: ["restaurante polanco", "alta cocina cdmx", "menú degustación", "catering corporativo"],
  openGraph: {
    type: "website",
    locale: "es_MX",
    siteName: "Bistro Polanco",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable} h-full antialiased`}>
      <body className="min-h-full bg-white font-sans text-stone-900">{children}</body>
    </html>
  );
}

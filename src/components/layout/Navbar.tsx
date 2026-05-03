"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, CalendarCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  itemCount?: number;
}

const NAV_LINKS = [
  { href: "/menu", label: "Menú" },
  { href: "/menu#degustacion", label: "Menú Degustación" },
  { href: "/eventos", label: "Eventos & Catering" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/contacto", label: "Contacto" },
];

export function Navbar({ itemCount = 0 }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-stone-200/40 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl font-semibold tracking-tight text-stone-900">
            Bistro Polanco
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-stone-400">
            Alta Cocina · CDMX
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-stone-600 transition-colors hover:text-stone-900"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA row */}
        <div className="flex items-center gap-3">
          <Link
            href="/reservaciones"
            className="hidden items-center gap-1.5 rounded-full bg-stone-900 px-4 py-2 text-sm text-white transition-colors hover:bg-stone-700 lg:flex"
          >
            <CalendarCheck size={14} />
            Reservar
          </Link>

          <Link href="/carrito" className="relative p-2">
            <ShoppingBag size={20} className="text-stone-700" />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                {itemCount > 9 ? "9+" : itemCount}
              </span>
            )}
          </Link>

          {/* Mobile hamburger */}
          <button
            className="p-2 lg:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menú de navegación"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 lg:hidden",
          mobileOpen ? "max-h-96" : "max-h-0"
        )}
      >
        <ul className="flex flex-col border-t border-stone-100 bg-white px-6 py-4 gap-4">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="block text-sm text-stone-700"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/reservaciones"
              className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-2.5 text-sm text-white"
              onClick={() => setMobileOpen(false)}
            >
              <CalendarCheck size={14} />
              Reservar mesa
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
}

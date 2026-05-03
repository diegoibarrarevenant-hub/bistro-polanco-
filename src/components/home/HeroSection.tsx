import Link from "next/link";
import { CalendarCheck, ChevronDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-stone-950">
      {/* Cinematic dark overlay — replace div with next/image when assets are ready */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-stone-950/70 via-stone-950/40 to-stone-950/80"
        aria-hidden
      />

      {/* Placeholder background — swap for real hero image */}
      <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-60" />

      {/* Hero copy */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.3em] text-amber-400">
          Alta Cocina · Polanco, CDMX
        </p>
        <h1 className="font-serif text-5xl font-light leading-tight text-white md:text-7xl lg:text-8xl">
          Donde cada bocado
          <br />
          <span className="italic text-amber-300">cuenta una historia</span>
        </h1>
        <p className="mt-6 max-w-md text-base text-stone-300 md:text-lg">
          Ingredientes de origen trazable, técnica francesa y alma mexicana.
          Una mesa diseñada para momentos que no se olvidan.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/reservaciones"
            className="flex items-center gap-2 rounded-full bg-amber-400 px-8 py-3.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-300"
          >
            <CalendarCheck size={16} />
            Reservar Mesa
          </Link>
          <Link
            href="/menu"
            className="flex items-center gap-2 rounded-full border border-white/30 px-8 py-3.5 text-sm text-white transition-colors hover:bg-white/10"
          >
            Ver Menú
          </Link>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/50">
        <ChevronDown size={24} />
      </div>
    </section>
  );
}

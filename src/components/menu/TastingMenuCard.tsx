import Link from "next/link";
import { Clock, Users, Award } from "lucide-react";
import { formatMXN } from "@/lib/utils";
import type { TastingMenuWithCourses } from "@/types";

interface TastingMenuCardProps {
  menu: TastingMenuWithCourses;
}

export function TastingMenuCard({ menu }: TastingMenuCardProps) {
  return (
    <div className="relative overflow-hidden rounded-sm bg-stone-950 text-white ring-1 ring-stone-700">
      {menu.chefSignature && (
        <div className="absolute right-0 top-0 flex items-center gap-1 bg-amber-400 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-stone-900">
          <Award size={10} />
          Mesa del Chef
        </div>
      )}

      <div className="p-8">
        <p className="text-xs uppercase tracking-widest text-amber-400">
          {menu.courses} tiempos
        </p>
        <h3 className="mt-2 font-serif text-2xl font-light">{menu.name}</h3>
        {menu.description && (
          <p className="mt-3 text-sm leading-relaxed text-stone-400">{menu.description}</p>
        )}

        {/* Meta */}
        <dl className="mt-6 flex gap-6 text-xs text-stone-400">
          {menu.durationMins && (
            <div className="flex items-center gap-1.5">
              <Clock size={12} className="text-stone-500" />
              <dt className="sr-only">Duración</dt>
              <dd>~{menu.durationMins} min</dd>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <Users size={12} className="text-stone-500" />
            <dt className="sr-only">Comensales</dt>
            <dd>
              {menu.minGuests}–{menu.maxGuests} personas
            </dd>
          </div>
        </dl>

        {/* Course list preview */}
        <ol className="mt-6 space-y-2">
          {menu.items.map((item) => (
            <li key={item.id} className="flex items-baseline gap-3 text-sm">
              <span className="w-5 shrink-0 font-mono text-xs text-stone-600">
                {item.courseOrder}.
              </span>
              <span className="text-stone-300">{item.menuItem.name}</span>
              {item.note && (
                <span className="text-xs italic text-stone-600">— {item.note}</span>
              )}
            </li>
          ))}
        </ol>

        {/* Price & CTA */}
        <div className="mt-8 flex items-end justify-between border-t border-stone-800 pt-6">
          <div>
            <p className="text-xs text-stone-500">Precio por persona</p>
            <p className="font-serif text-3xl text-amber-400">
              {formatMXN(Number(menu.pricePerPerson))}
            </p>
          </div>
          <Link
            href="/reservaciones"
            className="rounded-full bg-amber-400 px-6 py-2.5 text-sm font-semibold text-stone-900 transition-colors hover:bg-amber-300"
          >
            Reservar
          </Link>
        </div>
      </div>
    </div>
  );
}

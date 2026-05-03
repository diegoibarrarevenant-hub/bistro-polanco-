import Link from "next/link";
import { DishCard } from "@/components/menu/DishCard";
import type { MenuItemWithCategory } from "@/types";

interface FeaturedDishesProps {
  dishes: MenuItemWithCategory[];
}

export function FeaturedDishes({ dishes }: FeaturedDishesProps) {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-widest text-amber-600">
              Selección del Chef
            </p>
            <h2 className="mt-2 font-serif text-4xl font-light text-stone-900">
              Platillos Destacados
            </h2>
          </div>
          <Link
            href="/menu"
            className="text-sm text-stone-500 underline-offset-4 hover:underline"
          >
            Ver menú completo →
          </Link>
        </div>

        {/* Grid */}
        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {dishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </div>
    </section>
  );
}

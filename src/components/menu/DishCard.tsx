"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Leaf } from "lucide-react";
import { cn, formatMXN } from "@/lib/utils";
import { AllergenBadge } from "./AllergenBadge";
import type { MenuItemWithCategory } from "@/types";

interface DishCardProps {
  dish: MenuItemWithCategory;
  className?: string;
}

export function DishCard({ dish, className }: DishCardProps) {
  const avgRating =
    dish.reviews.length > 0
      ? dish.reviews.reduce((s: number, r: { rating: number }) => s + r.rating, 0) / dish.reviews.length
      : null;

  return (
    <Link
      href={`/menu/${dish.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-stone-200 transition-shadow hover:shadow-md",
        className
      )}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-stone-100">
        {dish.imageUrl ? (
          <Image
            src={dish.imageUrl}
            alt={dish.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-300 text-sm">
            Sin imagen
          </div>
        )}

        {/* Badges overlay */}
        <div className="absolute left-3 top-3 flex gap-1.5">
          {dish.isChefSpecial && (
            <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-stone-900">
              Chef&apos;s Special
            </span>
          )}
          {dish.isSeasonalItem && (
            <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-semibold text-white">
              <Leaf size={9} className="inline mr-0.5" />
              Temporada
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[10px] uppercase tracking-widest text-stone-400">
          {dish.category.name}
        </p>
        <h3 className="mt-1 font-serif text-lg font-medium text-stone-900 leading-snug">
          {dish.name}
        </h3>

        {dish.description && (
          <p className="mt-1.5 line-clamp-2 text-sm text-stone-500">{dish.description}</p>
        )}

        {dish.originStory && (
          <p className="mt-2 text-xs italic text-stone-400 line-clamp-1">
            {dish.originStory}
          </p>
        )}

        {/* Meta row */}
        <div className="mt-3 flex items-center gap-3 text-xs text-stone-400">
          {dish.preparationTime && (
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {dish.preparationTime} min
            </span>
          )}
          {avgRating !== null && (
            <span className="flex items-center gap-1">
              <Star size={12} className="fill-amber-400 text-amber-400" />
              {avgRating.toFixed(1)} ({dish._count.reviews})
            </span>
          )}
          {dish.servingSize && <span>{dish.servingSize}</span>}
        </div>

        {/* Dietary/allergen badges */}
        {(dish.dietaryFlags.length > 0 || dish.allergens.length > 0) && (
          <div className="mt-3">
            <AllergenBadge
              allergens={dish.allergens}
              dietaryFlags={dish.dietaryFlags}
              compact
            />
          </div>
        )}

        {/* Price */}
        <div className="mt-4 flex items-center justify-between border-t border-stone-100 pt-3">
          <span className="font-serif text-xl text-stone-900">
            {formatMXN(Number(dish.basePrice))}
          </span>
          <span className="text-xs text-stone-400">MXN / persona</span>
        </div>
      </div>
    </Link>
  );
}

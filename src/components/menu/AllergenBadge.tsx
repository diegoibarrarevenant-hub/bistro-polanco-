import { cn } from "@/lib/utils";
import type { Allergen, DietaryFlag } from "@/generated/prisma/enums";

const ALLERGEN_LABELS: Record<Allergen, string> = {
  GLUTEN: "Gluten",
  CRUSTACEANS: "Crustáceos",
  EGGS: "Huevo",
  FISH: "Pescado",
  PEANUTS: "Cacahuate",
  SOYBEANS: "Soya",
  MILK: "Lácteos",
  TREE_NUTS: "Nueces",
  CELERY: "Apio",
  MUSTARD: "Mostaza",
  SESAME: "Ajonjolí",
  SULPHITES: "Sulfitos",
  LUPIN: "Lupino",
  MOLLUSCS: "Moluscos",
};

const DIETARY_LABELS: Record<DietaryFlag, { label: string; color: string }> = {
  VEGETARIAN: { label: "Vegetariano", color: "bg-emerald-100 text-emerald-800" },
  VEGAN: { label: "Vegano", color: "bg-emerald-200 text-emerald-900" },
  GLUTEN_FREE: { label: "Sin Gluten", color: "bg-yellow-100 text-yellow-800" },
  DAIRY_FREE: { label: "Sin Lácteos", color: "bg-sky-100 text-sky-800" },
  NUT_FREE: { label: "Sin Nueces", color: "bg-orange-100 text-orange-800" },
  HALAL: { label: "Halal", color: "bg-teal-100 text-teal-800" },
  KOSHER: { label: "Kosher", color: "bg-indigo-100 text-indigo-800" },
  LOW_SODIUM: { label: "Bajo en Sodio", color: "bg-violet-100 text-violet-800" },
  RAW: { label: "Crudo", color: "bg-lime-100 text-lime-800" },
};

interface Props {
  allergens?: Allergen[];
  dietaryFlags?: DietaryFlag[];
  compact?: boolean;
}

export function AllergenBadge({ allergens = [], dietaryFlags = [], compact = false }: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {dietaryFlags.map((flag) => (
        <span
          key={flag}
          className={cn(
            "rounded-full px-2 py-0.5 font-medium",
            compact ? "text-[10px]" : "text-xs",
            DIETARY_LABELS[flag].color
          )}
        >
          {DIETARY_LABELS[flag].label}
        </span>
      ))}
      {allergens.map((allergen) => (
        <span
          key={allergen}
          className={cn(
            "rounded-full bg-red-50 px-2 py-0.5 text-red-700 font-medium",
            compact ? "text-[10px]" : "text-xs"
          )}
          title={`Contiene: ${ALLERGEN_LABELS[allergen]}`}
        >
          ⚠ {ALLERGEN_LABELS[allergen]}
        </span>
      ))}
    </div>
  );
}

"use client";

import type { ProductIngredient, Ingredient } from "@prisma/client";

type IngredientWithDetails = ProductIngredient & { ingredient: Ingredient };

interface Props {
  ingredients: IngredientWithDetails[];
}

export function IngredientStack({ ingredients }: Props) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold uppercase tracking-widest text-neutral-500">
        Fórmula Transparente
      </h3>
      <ul className="divide-y divide-neutral-100 rounded-2xl border border-neutral-200 bg-white">
        {ingredients
          .sort((a, b) => a.displayOrder - b.displayOrder)
          .map((pi) => (
            <li key={pi.id} className="flex items-center gap-4 px-5 py-4">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-neutral-900">
                    {pi.ingredient.name}
                  </span>
                  {pi.isClinicalDose && !pi.isProprietaryBlend && (
                    <ClinicalDoseBadge />
                  )}
                </div>
                {pi.benefitClaims.length > 0 && (
                  <p className="mt-0.5 text-xs text-neutral-500">
                    {pi.benefitClaims[0]}
                  </p>
                )}
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-neutral-800">
                  {pi.amountMg.toString()}
                  <span className="ml-0.5 text-xs font-normal text-neutral-400">
                    {pi.unit}
                  </span>
                </span>
                {pi.clinicalDoseMin && pi.clinicalDoseMax && (
                  <p className="text-xs text-neutral-400">
                    Dosis clínica: {pi.clinicalDoseMin.toString()}–
                    {pi.clinicalDoseMax.toString()} {pi.unit}
                  </p>
                )}
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}

function ClinicalDoseBadge() {
  return (
    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700">
      Dosis Clínica ✓
    </span>
  );
}

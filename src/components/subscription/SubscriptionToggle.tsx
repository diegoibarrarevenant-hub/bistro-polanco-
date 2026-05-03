"use client";

import { useState } from "react";
import type { Decimal } from "@prisma/client/runtime/library";

interface Props {
  basePrice: Decimal;
  subscriptionPrice: Decimal | null;
  onModeChange: (mode: "one_time" | "subscription") => void;
}

export function SubscriptionToggle({
  basePrice,
  subscriptionPrice,
  onModeChange,
}: Props) {
  const [mode, setMode] = useState<"one_time" | "subscription">("subscription");

  const base = Number(basePrice);
  const sub = subscriptionPrice ? Number(subscriptionPrice) : null;
  const savings = sub ? Math.round(((base - sub) / base) * 100) : 0;

  const select = (m: typeof mode) => {
    setMode(m);
    onModeChange(m);
  };

  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-1">
      <div className="grid grid-cols-2 gap-1">
        <button
          onClick={() => select("subscription")}
          className={`rounded-xl px-4 py-3 text-left transition ${
            mode === "subscription"
              ? "bg-white shadow-sm"
              : "hover:bg-neutral-100"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-neutral-900">
              Suscripción
            </span>
            {savings > 0 && (
              <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-xs font-bold text-white">
                -{savings}%
              </span>
            )}
          </div>
          <p className="text-lg font-bold text-neutral-900">
            ${sub?.toFixed(2) ?? base.toFixed(2)}
            <span className="ml-1 text-xs font-normal text-neutral-400">
              /mes
            </span>
          </p>
          <p className="text-xs text-neutral-500">Cancela cuando quieras</p>
        </button>

        <button
          onClick={() => select("one_time")}
          className={`rounded-xl px-4 py-3 text-left transition ${
            mode === "one_time"
              ? "bg-white shadow-sm"
              : "hover:bg-neutral-100"
          }`}
        >
          <span className="text-sm font-semibold text-neutral-900">
            Una vez
          </span>
          <p className="text-lg font-bold text-neutral-900">
            ${base.toFixed(2)}
          </p>
          <p className="text-xs text-neutral-500">Sin compromiso</p>
        </button>
      </div>
    </div>
  );
}

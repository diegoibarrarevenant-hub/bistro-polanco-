"use client";

import type { Protocol } from "@prisma/client";

interface Props {
  protocol: Pick<Protocol, "durationDays" | "checkInDays" | "expectedResults">;
}

const MILESTONES = [
  { day: 7, label: "Semana 1", description: "Ajuste y primeras sensaciones" },
  { day: 30, label: "Día 30", description: "Primer check-in de biomarcadores" },
  { day: 60, label: "Día 60", description: "Segundo check-in — resultados visibles" },
  { day: 90, label: "Día 90", description: "Check-in final — comparativa completa" },
];

export function ProtocolTimeline({ protocol }: Props) {
  const progressPercent = (day: number) =>
    Math.round((day / protocol.durationDays) * 100);

  return (
    <div className="relative py-6">
      {/* Track */}
      <div className="absolute left-8 top-0 h-full w-0.5 bg-neutral-200" />

      <ul className="space-y-8">
        {MILESTONES.map((m, i) => {
          const isCheckIn = protocol.checkInDays.includes(m.day);
          const result = protocol.expectedResults[i] ?? null;

          return (
            <li key={m.day} className="relative flex items-start gap-6 pl-16">
              {/* Node */}
              <span
                className={`absolute left-5 flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${
                  isCheckIn
                    ? "border-violet-500 bg-violet-500 text-white"
                    : "border-neutral-300 bg-white text-neutral-400"
                }`}
              >
                {m.day}
              </span>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-neutral-900">
                    {m.label}
                  </span>
                  {isCheckIn && (
                    <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-medium text-violet-600">
                      Check-in
                    </span>
                  )}
                </div>
                <p className="text-sm text-neutral-500">{m.description}</p>
                {result && (
                  <p className="mt-1 text-sm font-medium text-emerald-600">
                    → {result}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

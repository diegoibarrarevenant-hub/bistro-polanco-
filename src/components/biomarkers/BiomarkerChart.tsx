"use client";

// Lightweight chart built on CSS — no heavy charting lib for MVP
interface DataPoint {
  date: string;
  value: number;
}

interface Props {
  label: string;
  unit: string;
  data: DataPoint[];
  color?: string;
}

export function BiomarkerChart({
  label,
  unit,
  data,
  color = "#7c3aed",
}: Props) {
  if (data.length === 0) return null;

  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const first = values[0];
  const last = values[values.length - 1];
  const delta = last - first;
  const deltaPercent = Math.round((delta / first) * 100);
  const isPositive = delta >= 0;

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            {label}
          </p>
          <p className="text-2xl font-bold text-neutral-900">
            {last}
            <span className="ml-1 text-sm font-normal text-neutral-400">
              {unit}
            </span>
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            isPositive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-red-50 text-red-700"
          }`}
        >
          {isPositive ? "+" : ""}
          {deltaPercent}%
        </span>
      </div>

      {/* Minimal bar chart */}
      <div className="flex h-16 items-end gap-1">
        {data.map((d, i) => {
          const height = Math.max(
            8,
            Math.round(((d.value - min) / range) * 56) + 8
          );
          return (
            <div
              key={i}
              title={`${d.date}: ${d.value} ${unit}`}
              className="flex-1 rounded-t-sm transition-all"
              style={{ height, backgroundColor: color, opacity: 0.15 + (i / data.length) * 0.85 }}
            />
          );
        })}
      </div>

      <p className="mt-2 text-right text-xs text-neutral-400">
        {data[0].date} → {data[data.length - 1].date}
      </p>
    </div>
  );
}

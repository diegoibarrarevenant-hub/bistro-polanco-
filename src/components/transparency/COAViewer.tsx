"use client";

import type { BatchCOA } from "@prisma/client";

interface Props {
  coa: BatchCOA;
}

const checks = [
  { key: "identityVerified", label: "Identidad del ingrediente" },
  { key: "potencyVerified", label: "Potencia en dosis declarada" },
  { key: "microbiologicalClean", label: "Libre de contaminación microbiana" },
  { key: "heavyMetalsFree", label: "Libre de metales pesados" },
  { key: "pesticidesClean", label: "Libre de pesticidas" },
] as const;

export function COAViewer({ coa }: Props) {
  const allPassed = checks.every((c) => coa[c.key]);

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-neutral-500">
            Certificado de Análisis
          </p>
          <p className="text-lg font-semibold text-neutral-900">
            Lote {coa.batchNumber}
          </p>
        </div>
        {allPassed && (
          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            100% Verificado
          </span>
        )}
      </div>

      <ul className="mb-5 space-y-2">
        {checks.map(({ key, label }) => (
          <li key={key} className="flex items-center gap-3 text-sm">
            <span
              className={
                coa[key]
                  ? "text-emerald-500"
                  : "text-red-500"
              }
            >
              {coa[key] ? "✓" : "✗"}
            </span>
            <span className="text-neutral-700">{label}</span>
          </li>
        ))}
      </ul>

      <div className="mb-4 rounded-lg bg-neutral-50 px-4 py-3 text-xs text-neutral-500">
        <span className="font-medium">Laboratorio independiente: </span>
        {coa.testingLab}
        {coa.labCertifications.length > 0 && (
          <span className="ml-2 text-neutral-400">
            ({coa.labCertifications.join(", ")})
          </span>
        )}
      </div>

      <a
        href={coa.documentUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-xl border border-neutral-200 py-2 text-center text-sm font-medium text-neutral-700 transition hover:bg-neutral-50"
      >
        Ver documento completo →
      </a>
    </div>
  );
}

import type { ScientificAdvisor } from "@prisma/client";
import Image from "next/image";

interface Props {
  advisor: ScientificAdvisor;
  variant?: "full" | "compact";
}

export function AdvisorCard({ advisor, variant = "compact" }: Props) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3">
        {advisor.photoUrl && (
          <Image
            src={advisor.photoUrl}
            alt={advisor.name}
            width={40}
            height={40}
            className="rounded-full object-cover"
          />
        )}
        <div>
          <p className="text-sm font-semibold text-neutral-900">{advisor.name}</p>
          <p className="text-xs text-neutral-500">{advisor.title}</p>
        </div>
        <span className="ml-auto rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">
          Asesor Científico
        </span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6">
      <div className="mb-4 flex gap-5">
        {advisor.photoUrl && (
          <Image
            src={advisor.photoUrl}
            alt={advisor.name}
            width={80}
            height={80}
            className="rounded-2xl object-cover"
          />
        )}
        <div>
          <p className="text-xl font-bold text-neutral-900">{advisor.name}</p>
          <p className="text-sm text-neutral-500">{advisor.title}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {advisor.specialties.map((s) => (
              <span
                key={s}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-neutral-600"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      <p className="mb-4 text-sm text-neutral-600">{advisor.bio}</p>

      <ul className="space-y-1">
        {advisor.credentials.map((c) => (
          <li key={c} className="flex items-center gap-2 text-sm text-neutral-700">
            <span className="text-violet-500">✓</span>
            {c}
          </li>
        ))}
      </ul>

      {advisor.pubmedProfile && (
        <a
          href={advisor.pubmedProfile}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-violet-600 hover:underline"
        >
          Ver publicaciones en PubMed →
        </a>
      )}
    </div>
  );
}

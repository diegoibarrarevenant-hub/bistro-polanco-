import type { Metadata } from "next";
import { CateringInquiryForm } from "@/components/catering/CateringInquiryForm";

export const metadata: Metadata = {
  title: "Eventos & Catering",
  description: "Celebra tus momentos más especiales con la experiencia culinaria de Bistro Polanco. Eventos corporativos, bodas y celebraciones privadas.",
};

export default function EventosPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-600">Momentos Únicos</p>
          <h1 className="mt-2 font-serif text-4xl font-light text-stone-900">
            Eventos & Catering
          </h1>
          <p className="mt-3 text-stone-500">
            Desde cenas corporativas íntimas hasta bodas de gran escala. Nuestro equipo diseña
            cada menú y puesta en escena a la medida de tu evento.
          </p>
        </div>

        {/* Value props */}
        <dl className="mb-10 grid grid-cols-3 gap-4">
          {[
            { term: "10+", detail: "años de experiencia en eventos" },
            { term: "500+", detail: "eventos realizados" },
            { term: "100%", detail: "personalización de menú" },
          ].map(({ term, detail }) => (
            <div key={term} className="rounded-sm bg-white p-4 text-center ring-1 ring-stone-200">
              <dt className="font-serif text-2xl text-amber-600">{term}</dt>
              <dd className="mt-1 text-xs text-stone-500">{detail}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-sm bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <h2 className="mb-6 font-serif text-xl text-stone-900">Solicitar Cotización</h2>
          <CateringInquiryForm />
        </div>
      </div>
    </div>
  );
}

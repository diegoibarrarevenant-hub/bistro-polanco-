import type { Metadata } from "next";
import { ReservationForm } from "@/components/reservation/ReservationForm";

export const metadata: Metadata = {
  title: "Reservaciones",
  description: "Reserva tu mesa en Bistro Polanco. Disponibilidad en tiempo real para comida y cena.",
};

export default function ReservacionesPage() {
  return (
    <div className="min-h-screen bg-stone-50 py-24">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-widest text-amber-600">Mesa para ti</p>
          <h1 className="mt-2 font-serif text-4xl font-light text-stone-900">Reservaciones</h1>
          <p className="mt-3 text-stone-500">
            Completa el formulario y te confirmaremos en minutos. Para grupos de 9+, llámanos
            directamente al{" "}
            <a href="tel:+525555551234" className="text-stone-900 underline">
              +52 55 5555 1234
            </a>
            .
          </p>
        </div>
        <div className="rounded-sm bg-white p-8 shadow-sm ring-1 ring-stone-200">
          <ReservationForm />
        </div>
      </div>
    </div>
  );
}

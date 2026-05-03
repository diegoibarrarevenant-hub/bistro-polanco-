"use client";

import { useState } from "react";
import { CalendarCheck, Loader2 } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

export function ReservationForm() {
  const [state, setState] = useState<FormState>("idle");
  const [confirmationCode, setConfirmationCode] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const form = e.currentTarget;
    const body = Object.fromEntries(new FormData(form));

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      setConfirmationCode(json.data.confirmationCode);
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success" && confirmationCode) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm bg-emerald-50 p-8 text-center">
        <CalendarCheck size={40} className="text-emerald-600" />
        <h3 className="font-serif text-2xl text-stone-900">¡Reservación Confirmada!</h3>
        <p className="text-stone-600">
          Tu código de confirmación es:{" "}
          <strong className="font-mono text-stone-900">{confirmationCode}</strong>
        </p>
        <p className="text-sm text-stone-500">
          Recibirás un correo de confirmación en breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Nombre completo" name="guestName" required />
        <Field label="Correo electrónico" name="guestEmail" type="email" required />
        <Field label="Teléfono" name="guestPhone" type="tel" required />
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Número de comensales
          </label>
          <select
            name="guestCount"
            required
            className="mt-1.5 w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "persona" : "personas"}
              </option>
            ))}
            <option value={9}>9+ (contactar directamente)</option>
          </select>
        </div>
        <Field label="Fecha" name="date" type="date" required />
        <div>
          <label className="block text-sm font-medium text-stone-700">Horario</label>
          <select
            name="time"
            required
            className="mt-1.5 w-full rounded-sm border border-stone-300 bg-white px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
          >
            {["13:00","13:30","14:00","14:30","15:00","15:30","20:00","20:30","21:00","21:30","22:00"].map(
              (t) => <option key={t} value={t}>{t} hrs</option>
            )}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700">
          Ocasión especial <span className="text-stone-400">(opcional)</span>
        </label>
        <input
          name="occasionNote"
          placeholder="Cumpleaños, aniversario, propuesta…"
          className="mt-1.5 w-full rounded-sm border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700">
          Solicitudes especiales <span className="text-stone-400">(alergias, silla alta, etc.)</span>
        </label>
        <textarea
          name="specialRequests"
          rows={3}
          className="mt-1.5 w-full rounded-sm border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
        />
      </div>

      {state === "error" && (
        <p className="text-sm text-red-600">
          Ocurrió un error. Por favor intenta de nuevo o llámanos directamente.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-stone-700 disabled:opacity-60"
      >
        {state === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> Procesando…</>
        ) : (
          <><CalendarCheck size={16} /> Confirmar Reservación</>
        )}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-stone-700">{label}</label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-sm border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
      />
    </div>
  );
}

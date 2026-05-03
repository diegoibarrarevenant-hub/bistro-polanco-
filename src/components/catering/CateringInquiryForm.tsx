"use client";

import { useState } from "react";
import { Send, Loader2, CheckCircle } from "lucide-react";

type FormState = "idle" | "loading" | "success" | "error";

const EVENT_TYPES = [
  { value: "BIRTHDAY", label: "Cumpleaños" },
  { value: "ANNIVERSARY", label: "Aniversario" },
  { value: "CORPORATE_LUNCH", label: "Comida corporativa" },
  { value: "CORPORATE_DINNER", label: "Cena corporativa" },
  { value: "WEDDING", label: "Boda" },
  { value: "GRADUATION", label: "Graduación" },
  { value: "BUSINESS_MEETING", label: "Reunión de negocios" },
  { value: "PRIVATE_PARTY", label: "Fiesta privada" },
  { value: "OTHER", label: "Otro" },
];

export function CateringInquiryForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("loading");
    const body = Object.fromEntries(new FormData(e.currentTarget));
    // Convert checkboxes
    body.beverageService = String((e.currentTarget.elements.namedItem("beverageService") as HTMLInputElement)?.checked);
    body.staffIncluded = String((e.currentTarget.elements.namedItem("staffIncluded") as HTMLInputElement)?.checked);

    try {
      const res = await fetch("/api/catering", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  }

  if (state === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-sm bg-emerald-50 p-10 text-center">
        <CheckCircle size={40} className="text-emerald-600" />
        <h3 className="font-serif text-2xl text-stone-900">Solicitud Recibida</h3>
        <p className="max-w-sm text-stone-600">
          Nuestro equipo de eventos se pondrá en contacto contigo en las próximas
          24 horas para revisar los detalles de tu evento.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-stone-700">Nombre de contacto</label>
          <input name="contactName" required className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Empresa (opcional)</label>
          <input name="companyName" className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Correo electrónico</label>
          <input name="contactEmail" type="email" required className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Teléfono</label>
          <input name="contactPhone" type="tel" required className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Tipo de evento</label>
          <select name="eventType" required className={input}>
            <option value="">Selecciona…</option>
            {EVENT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Fecha del evento</label>
          <input name="eventDate" type="date" required className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">Número de invitados</label>
          <input name="guestCount" type="number" min={10} required className={input} />
        </div>
        <div>
          <label className="block text-sm font-medium text-stone-700">
            Presupuesto estimado <span className="text-stone-400">(MXN)</span>
          </label>
          <input name="budgetRange" placeholder="Ej: 50,000 – 100,000" className={input} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700">Lugar del evento</label>
        <input name="eventLocation" required className={input} placeholder="Dirección o nombre del venue" />
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700">
          Descripción del evento
        </label>
        <textarea
          name="description"
          required
          rows={4}
          className={input}
          placeholder="Cuéntanos sobre el evento, preferencias de menú, tema, requisitos especiales…"
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium text-stone-700">Servicios adicionales</legend>
        {[
          { name: "beverageService", label: "Servicio de bebidas y maridaje" },
          { name: "staffIncluded", label: "Personal de servicio incluido" },
          { name: "equipmentIncluded", label: "Equipo y montaje incluido" },
        ].map((opt) => (
          <label key={opt.name} className="flex cursor-pointer items-center gap-2.5 text-sm text-stone-600">
            <input type="checkbox" name={opt.name} className="h-4 w-4 rounded border-stone-300" />
            {opt.label}
          </label>
        ))}
      </fieldset>

      {state === "error" && (
        <p className="text-sm text-red-600">
          Hubo un problema al enviar. Por favor llámanos al +52 55 5555 1234.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-stone-900 py-3.5 text-sm font-semibold text-white hover:bg-stone-700 disabled:opacity-60"
      >
        {state === "loading" ? (
          <><Loader2 size={16} className="animate-spin" /> Enviando…</>
        ) : (
          <><Send size={16} /> Solicitar Cotización</>
        )}
      </button>
    </form>
  );
}

const input = "mt-1.5 w-full rounded-sm border border-stone-300 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-white";

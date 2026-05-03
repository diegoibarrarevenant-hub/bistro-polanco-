export function GuaranteeBadge() {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
      <span className="mt-0.5 text-2xl">🛡</span>
      <div>
        <p className="text-sm font-semibold text-emerald-900">
          Garantía de 90 días — sin preguntas
        </p>
        <p className="text-xs text-emerald-700">
          Si no mides una mejora en tus biomarcadores en 90 días, te devolvemos
          el 100% de tu inversión. La garantía está vinculada a tu lote de
          producción y al protocolo de check-in.
        </p>
      </div>
    </div>
  );
}

import { BiomarkerChart } from "@/components/biomarkers/BiomarkerChart";
import { getUserBiomarkerHistory } from "@/server/actions/biomarkers";

// In a real app, userId comes from the session (NextAuth)
const MOCK_USER_ID = "clx_example";

export default async function BiomarkersPage() {
  const logs = await getUserBiomarkerHistory(MOCK_USER_ID, 90);

  const toPoints = (key: keyof typeof logs[0]) =>
    logs
      .filter((l) => l[key] !== null)
      .map((l) => ({
        date: new Date(l.loggedAt).toLocaleDateString("es-MX", {
          month: "short",
          day: "numeric",
        }),
        value: Number(l[key]),
      }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      <h1 className="mb-2 text-2xl font-bold text-neutral-900">
        Mis Biomarcadores
      </h1>
      <p className="mb-8 text-neutral-500">
        Últimos 90 días — sincroniza tu Oura Ring o Whoop para actualización
        automática.
      </p>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <BiomarkerChart
          label="HRV"
          unit="ms"
          data={toPoints("hrv")}
          color="#7c3aed"
        />
        <BiomarkerChart
          label="Sleep Score"
          unit="pts"
          data={toPoints("sleepScore")}
          color="#0891b2"
        />
        <BiomarkerChart
          label="Energía (auto-reporte)"
          unit="/ 10"
          data={toPoints("energyLevel")}
          color="#059669"
        />
        <BiomarkerChart
          label="Frecuencia cardíaca en reposo"
          unit="bpm"
          data={toPoints("restingHR")}
          color="#dc2626"
        />
      </div>
    </div>
  );
}

import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { COAViewer } from "@/components/transparency/COAViewer";

interface Props {
  params: { batchNumber: string };
}

export default async function LabPage({ params }: Props) {
  const coa = await prisma.batchCOA.findFirst({
    where: { batchNumber: params.batchNumber, isPublic: true },
    include: { product: { select: { name: true, slug: true } } },
  });

  if (!coa) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-16">
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-neutral-500">
        Portal de Transparencia
      </p>
      <h1 className="mb-1 text-2xl font-bold text-neutral-900">
        {coa.product.name}
      </h1>
      <p className="mb-8 text-neutral-500">
        Resultados del laboratorio independiente para este lote de producción.
      </p>

      <COAViewer coa={coa} />

      <div className="mt-6 rounded-xl border border-neutral-100 bg-neutral-50 p-4 text-xs text-neutral-500">
        <p>
          <span className="font-medium">Fabricado el: </span>
          {new Date(coa.manufacturingDate).toLocaleDateString("es-MX")}
        </p>
        <p>
          <span className="font-medium">Vence el: </span>
          {new Date(coa.expirationDate).toLocaleDateString("es-MX")}
        </p>
      </div>
    </div>
  );
}

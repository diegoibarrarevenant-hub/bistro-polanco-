import { notFound } from "next/navigation";
import { getProductBySlug } from "@/server/queries/products";
import { IngredientStack } from "@/components/product/IngredientStack";
import { COAViewer } from "@/components/transparency/COAViewer";
import { AdvisorCard } from "@/components/advisor/AdvisorCard";
import { SubscriptionToggle } from "@/components/subscription/SubscriptionToggle";
import { GuaranteeBadge } from "@/components/checkout/GuaranteeBadge";

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) return {};
  return {
    title: product.metaTitle ?? product.name,
    description: product.metaDescription ?? product.tagline,
  };
}

export default async function ProductPage({ params }: Props) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const latestCOA = product.batchCOAs[0] ?? null;
  const activeProtocol = product.protocols[0]?.protocol ?? null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">

        {/* Left — Images & COA badge */}
        <div className="space-y-4">
          {/* Product images go here */}
          <div className="aspect-square rounded-3xl bg-neutral-100" />
          {latestCOA && <COAViewer coa={latestCOA} />}
        </div>

        {/* Right — Purchase zone */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-neutral-900">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-neutral-500">{product.tagline}</p>
          </div>

          {/* Subscription toggle */}
          <SubscriptionToggle
            basePrice={product.basePrice}
            subscriptionPrice={product.subscriptionPrice}
            onModeChange={() => {}}
          />

          {/* CTA */}
          <button className="w-full rounded-2xl bg-violet-600 px-6 py-4 text-base font-semibold text-white shadow-sm transition hover:bg-violet-700 active:scale-95">
            Añadir al protocolo
          </button>

          <GuaranteeBadge />

          {/* Certifications */}
          {product.certifications.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.certifications.map((pc) => (
                <span
                  key={pc.id}
                  className="rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-600"
                >
                  {pc.certification.name}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Ingredient transparency section */}
      <section className="mt-16">
        <IngredientStack ingredients={product.ingredients} />
      </section>

      {/* Scientific references */}
      {product.scientificReferences.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-neutral-900">
            Respaldo científico
          </h2>
          <ul className="space-y-3">
            {product.scientificReferences.map((ref) => (
              <li
                key={ref.id}
                className="rounded-xl border border-neutral-200 bg-white p-4"
              >
                <p className="font-medium text-neutral-800">{ref.title}</p>
                {ref.summary && (
                  <p className="mt-1 text-sm text-neutral-500">{ref.summary}</p>
                )}
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-xs text-violet-600 hover:underline"
                  >
                    Ver estudio →
                  </a>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

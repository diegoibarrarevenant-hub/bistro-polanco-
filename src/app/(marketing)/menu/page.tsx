import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { DishCard } from "@/components/menu/DishCard";
import { TastingMenuCard } from "@/components/menu/TastingMenuCard";

export const metadata: Metadata = {
  title: "Menú",
  description: "Descubre nuestra propuesta gastronómica de temporada. Entradas, platos fuertes, mariscos y menú degustación.",
};

export const revalidate = 3600;

async function getMenuData() {
  const [categories, tastingMenus] = await Promise.all([
    prisma.category.findMany({
      where: { isActive: true },
      include: {
        menuItems: {
          where: { isActive: true },
          include: {
            category: true,
            variants: true,
            reviews: { where: { isPublished: true }, select: { rating: true } },
            _count: { select: { reviews: true } },
          },
          orderBy: [{ isChefSpecial: "desc" }, { createdAt: "desc" }],
        },
      },
      orderBy: { sortOrder: "asc" },
    }),
    prisma.tastingMenu.findMany({
      where: { isActive: true },
      include: {
        items: {
          include: { menuItem: true },
          orderBy: { courseOrder: "asc" },
        },
      },
      orderBy: { pricePerPerson: "asc" },
    }),
  ]);
  return { categories, tastingMenus };
}

export default async function MenuPage() {
  const { categories, tastingMenus } = await getMenuData();

  return (
    <div className="min-h-screen bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-16 text-center">
          <p className="text-xs uppercase tracking-widest text-amber-600">Temporada Actual</p>
          <h1 className="mt-3 font-serif text-5xl font-light text-stone-900">Nuestra Carta</h1>
        </div>

        {/* Category sections */}
        {categories.map((category) =>
          category.menuItems.length > 0 ? (
            <section key={category.id} className="mb-20">
              <h2 className="mb-8 border-b border-stone-200 pb-3 font-serif text-2xl text-stone-900">
                {category.name}
              </h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {category.menuItems.map((dish) => (
                  <DishCard key={dish.id} dish={dish} />
                ))}
              </div>
            </section>
          ) : null
        )}

        {/* Tasting menus */}
        {tastingMenus.length > 0 && (
          <section id="degustacion" className="mt-8">
            <h2 className="mb-2 font-serif text-3xl font-light text-stone-900">
              Menús Degustación
            </h2>
            <p className="mb-10 text-stone-500">
              Una experiencia curada de múltiples tiempos. Reserva requerida con 48 h de anticipación.
            </p>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {tastingMenus.map((menu) => (
                <TastingMenuCard key={menu.id} menu={menu} />
              ))}
            </div>
          </section>
        )}

        {categories.length === 0 && tastingMenus.length === 0 && (
          <p className="py-32 text-center text-stone-400">
            El menú se está actualizando. Vuelve pronto.
          </p>
        )}
      </div>
    </div>
  );
}

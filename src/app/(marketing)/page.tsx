import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { ChefStorySection } from "@/components/home/ChefStorySection";
import { prisma } from "@/lib/prisma";

export const revalidate = 3600; // ISR — revalidate every hour

async function getFeaturedDishes() {
  return prisma.menuItem.findMany({
    where: { isChefSpecial: true, isActive: true },
    include: {
      category: true,
      variants: true,
      reviews: { where: { isPublished: true }, select: { rating: true } },
      _count: { select: { reviews: true } },
    },
    take: 6,
    orderBy: { createdAt: "desc" },
  });
}

export default async function HomePage() {
  const featuredDishes = await getFeaturedDishes();

  return (
    <>
      <HeroSection />
      {featuredDishes.length > 0 && <FeaturedDishes dishes={featuredDishes} />}
      <ChefStorySection />
    </>
  );
}

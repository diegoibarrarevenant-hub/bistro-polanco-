import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get("category");
  const chefSpecial = searchParams.get("chefSpecial") === "true";
  const seasonal = searchParams.get("seasonal") === "true";

  const items = await prisma.menuItem.findMany({
    where: {
      isActive: true,
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(chefSpecial && { isChefSpecial: true }),
      ...(seasonal && { isSeasonalItem: true }),
    },
    include: {
      category: true,
      variants: true,
      reviews: {
        where: { isPublished: true },
        select: { rating: true },
      },
      _count: { select: { reviews: true } },
    },
    orderBy: [{ isChefSpecial: "desc" }, { createdAt: "desc" }],
  });

  return NextResponse.json({ data: items });
}

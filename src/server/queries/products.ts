import { prisma } from "@/lib/prisma";
import type { ProductFull } from "@/types";

export async function getProductBySlug(slug: string): Promise<ProductFull | null> {
  return prisma.product.findUnique({
    where: { slug, status: "ACTIVE" },
    include: {
      variants: true,
      images: { orderBy: { displayOrder: "asc" } },
      ingredients: {
        include: { ingredient: true },
        orderBy: { displayOrder: "asc" },
      },
      certifications: { include: { certification: true }, where: { isActive: true } },
      batchCOAs: { where: { isPublic: true }, orderBy: { manufacturingDate: "desc" }, take: 1 },
      scientificReferences: { orderBy: { year: "desc" } },
      reviews: {
        where: { isPublished: true },
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 20,
      },
      protocols: { include: { protocol: { where: { status: "ACTIVE" } } } },
    },
  });
}

export async function getActiveProducts() {
  return prisma.product.findMany({
    where: { status: "ACTIVE" },
    include: {
      images: { where: { isPrimary: true }, take: 1 },
      certifications: { include: { certification: true }, where: { isActive: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
}

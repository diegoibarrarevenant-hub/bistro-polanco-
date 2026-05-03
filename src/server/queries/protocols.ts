import { prisma } from "@/lib/prisma";
import type { ProtocolFull } from "@/types";

export async function getProtocolBySlug(slug: string): Promise<ProtocolFull | null> {
  return prisma.protocol.findUnique({
    where: { slug, status: "ACTIVE" },
    include: {
      products: {
        include: {
          product: {
            include: { images: { where: { isPrimary: true }, take: 1 } },
          },
        },
        orderBy: { displayOrder: "asc" },
      },
      advisor: true,
      enrollments: { where: { status: "ACTIVE" } },
    },
  });
}

export async function getActiveProtocols() {
  return prisma.protocol.findMany({
    where: { status: "ACTIVE" },
    include: {
      products: { include: { product: { select: { name: true } } } },
      advisor: { select: { name: true, title: true, photoUrl: true } },
    },
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
}

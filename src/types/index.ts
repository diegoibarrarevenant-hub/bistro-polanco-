import type { Prisma } from "@prisma/client";

// Product with all relations needed for the product detail page
export type ProductFull = Prisma.ProductGetPayload<{
  include: {
    variants: true;
    images: true;
    ingredients: { include: { ingredient: true } };
    certifications: { include: { certification: true } };
    batchCOAs: true;
    scientificReferences: true;
    reviews: { include: { user: { select: { name: true } } } };
    protocols: { include: { protocol: true } };
  };
}>;

// Protocol with products for the protocol detail page
export type ProtocolFull = Prisma.ProtocolGetPayload<{
  include: {
    products: { include: { product: { include: { images: true } } } };
    advisor: true;
    enrollments: { where: { status: "ACTIVE" } };
  };
}>;

// COA for the lab transparency portal
export type BatchCOAWithProduct = Prisma.BatchCOAGetPayload<{
  include: {
    product: { select: { name: true; slug: true } };
  };
}>;

// Cart with computed totals
export type CartFull = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: { include: { images: true } };
        variant: true;
      };
    };
  };
}>;

// Order for the customer dashboard
export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: { select: { name: true; slug: true } };
        variant: { select: { name: true; sku: true } };
      };
    };
  };
}>;

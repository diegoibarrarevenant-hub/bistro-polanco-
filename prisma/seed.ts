import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Seed a scientific advisor
  const advisor = await prisma.scientificAdvisor.upsert({
    where: { id: "advisor_seed_1" },
    update: {},
    create: {
      id: "advisor_seed_1",
      name: "Dra. Elena Vargas",
      title: "Ph.D. en Bioquímica — UNAM / NIH Research Fellow",
      bio: "Investigadora con 15 años de experiencia en metabolismo mitocondrial y medicina de longevidad. Autora de 28 publicaciones en revistas indexadas en PubMed.",
      credentials: [
        "Ph.D. Bioquímica, UNAM",
        "NIH Research Fellow (2018–2021)",
        "Certified Nutrition Specialist (CNS)",
      ],
      institutions: ["UNAM", "National Institutes of Health", "Buck Institute for Research on Aging"],
      specialties: ["Metabolismo NAD+", "Biogénesis mitocondrial", "Restricción calórica"],
      pubmedProfile: "https://pubmed.ncbi.nlm.nih.gov/?term=vargas+longevity",
    },
  });

  // Seed certifications
  const nsfCert = await prisma.certification.upsert({
    where: { id: "cert_nsf" },
    update: {},
    create: {
      id: "cert_nsf",
      name: "NSF Certified for Sport",
      issuingBody: "NSF International",
      description: "Verifica que el producto no contiene sustancias prohibidas y que los ingredientes declarados coinciden con el contenido real.",
    },
  });

  // Seed an ingredient
  const nmn = await prisma.ingredient.upsert({
    where: { name: "NMN (Nicotinamide Mononucleotide)" },
    update: {},
    create: {
      name: "NMN (Nicotinamide Mononucleotide)",
      aliases: ["β-NMN", "Nicotinamide Mononucleotide"],
      description: "Precursor directo del NAD+. Estudios en humanos muestran mejoras en niveles de NAD+ muscular, sensibilidad a la insulina y biomarcadores de envejecimiento biológico.",
    },
  });

  // Seed a product
  const product = await prisma.product.upsert({
    where: { slug: "foundation-nad-plus" },
    update: {},
    create: {
      slug: "foundation-nad-plus",
      name: "Foundation NAD+",
      tagline: "Restaura tus niveles de NAD+ a los de una persona 20 años más joven",
      description: "Formulado con NMN en dosis clínica de 500 mg por porción, respaldado por los estudios de David Sinclair et al. Cada lote verificado por laboratorio ISO 17025.",
      basePrice: 89.00,
      subscriptionPrice: 71.20,
      servingSize: "2 cápsulas",
      servingsPerContainer: 30,
      form: "CAPSULE",
      manufacturerName: "Longevit Labs USA",
      manufacturingCountry: "USA",
      isCGMPCertified: true,
      primaryBiomarker: "NAD+",
      targetBiomarkers: ["NAD+", "HRV", "Energía", "Recuperación muscular"],
      clinicalDoseVerified: true,
      status: "ACTIVE",
      isFeatured: true,
    },
  });

  // Link ingredient to product
  await prisma.productIngredient.upsert({
    where: { productId_ingredientId: { productId: product.id, ingredientId: nmn.id } },
    update: {},
    create: {
      productId: product.id,
      ingredientId: nmn.id,
      amountMg: 500,
      clinicalDoseMin: 250,
      clinicalDoseMax: 600,
      isClinicalDose: true,
      pubmedStudyIds: ["34373741", "31964598"],
      benefitClaims: [
        "Eleva los niveles de NAD+ muscular",
        "Mejora la sensibilidad a la insulina",
        "Apoya la reparación del ADN",
      ],
      displayOrder: 0,
    },
  });

  // Link certification
  await prisma.productCertification.upsert({
    where: { productId_certificationId: { productId: product.id, certificationId: nsfCert.id } },
    update: {},
    create: {
      productId: product.id,
      certificationId: nsfCert.id,
      isActive: true,
    },
  });

  // Seed a batch COA
  await prisma.batchCOA.upsert({
    where: { productId_batchNumber: { productId: product.id, batchNumber: "LV-2025-001" } },
    update: {},
    create: {
      productId: product.id,
      batchNumber: "LV-2025-001",
      manufacturingDate: new Date("2025-01-15"),
      expirationDate: new Date("2027-01-15"),
      testingLab: "Eurofins Scientific",
      labCertifications: ["ISO/IEC 17025:2017"],
      documentUrl: "https://docs.longevit.com/coa/LV-2025-001.pdf",
      identityVerified: true,
      potencyVerified: true,
      microbiologicalClean: true,
      heavyMetalsFree: true,
      pesticidesClean: true,
    },
  });

  // Seed a protocol
  await prisma.protocol.upsert({
    where: { slug: "foundational-90" },
    update: {},
    create: {
      slug: "foundational-90",
      name: "Protocol Foundational 90",
      tagline: "El sistema completo para optimizar tu energía, recuperación y longevidad celular",
      description: "Un protocolo de 90 días diseñado por la Dra. Elena Vargas que combina suplementos en dosis clínicas con un sistema de medición de biomarcadores. Incluye 3 check-ins guiados y garantía de resultados.",
      price: 247.00,
      comparePrice: 310.00,
      primaryGoal: "Energía mitocondrial y longevidad celular",
      targetBiomarkers: ["NAD+", "HRV", "Sleep Score", "Energía"],
      expectedResults: [
        "Semana 1–2: Mejor calidad de sueño reportada",
        "Día 30: HRV promedio +8–12 ms sobre el baseline",
        "Día 60: Energía sostenida sin picos de cafeína",
        "Día 90: Biomarcadores cuantificados vs. baseline — garantía activada",
      ],
      advisorId: advisor.id,
      status: "ACTIVE",
      isFeatured: true,
    },
  });

  console.log("✓ Seed completado");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());

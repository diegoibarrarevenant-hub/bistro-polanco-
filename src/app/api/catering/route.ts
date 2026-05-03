import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiError, ApiResponse } from "@/types";
import type { CateringQuote } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      contactName,
      contactEmail,
      contactPhone,
      companyName,
      eventType,
      eventDate,
      eventLocation,
      guestCount,
      budgetRange,
      description,
      menuPreference,
      beverageService,
      staffIncluded,
      equipmentIncluded,
    } = body;

    if (!contactName || !contactEmail || !contactPhone || !eventType || !eventDate || !eventLocation || !guestCount || !description) {
      return NextResponse.json<ApiError>(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const quote = await prisma.cateringQuote.create({
      data: {
        contactName,
        contactEmail,
        contactPhone,
        companyName: companyName || null,
        eventType,
        eventDate: new Date(eventDate),
        eventLocation,
        guestCount: Number(guestCount),
        budgetRange: budgetRange || null,
        description,
        menuPreference: menuPreference || null,
        beverageService: beverageService === "true",
        staffIncluded: staffIncluded === "true",
        equipmentIncluded: equipmentIncluded === "true",
      },
      select: { id: true, contactEmail: true, eventDate: true, status: true },
    });

    return NextResponse.json<ApiResponse<typeof quote>>(
      { data: quote, message: "Solicitud de cotización recibida" },
      { status: 201 }
    );
  } catch (err) {
    console.error("[POST /api/catering]", err);
    return NextResponse.json<ApiError>(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const quotes = await prisma.cateringQuote.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      contactName: true,
      contactEmail: true,
      eventType: true,
      eventDate: true,
      guestCount: true,
      status: true,
      quotedAmount: true,
    },
  });

  return NextResponse.json<ApiResponse<CateringQuote[]>>({ data: quotes as unknown as CateringQuote[] });
}

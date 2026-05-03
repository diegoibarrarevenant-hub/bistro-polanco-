import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { ApiError } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      guestName,
      guestEmail,
      guestPhone,
      date,
      time,
      guestCount,
      occasionNote,
      specialRequests,
    } = body;

    if (!guestName || !guestEmail || !guestPhone || !date || !time || !guestCount) {
      return NextResponse.json<ApiError>(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    const reservation = await prisma.reservation.create({
      data: {
        guestName,
        guestEmail,
        guestPhone,
        date: new Date(date),
        time,
        guestCount: Number(guestCount),
        occasionNote: occasionNote || null,
        specialRequests: specialRequests || null,
      },
      select: {
        id: true,
        confirmationCode: true,
        date: true,
        time: true,
        guestCount: true,
        status: true,
      },
    });

    return NextResponse.json({ data: reservation }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/reservations]", err);
    return NextResponse.json<ApiError>(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  const where = date ? { date: new Date(date) } : {};

  const reservations = await prisma.reservation.findMany({
    where,
    select: {
      id: true,
      guestName: true,
      guestEmail: true,
      date: true,
      time: true,
      guestCount: true,
      status: true,
      tableNumber: true,
      confirmationCode: true,
    },
    orderBy: [{ date: "asc" }, { time: "asc" }],
  });

  return NextResponse.json({ data: reservations });
}

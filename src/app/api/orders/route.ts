import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { generateOrderNumber } from "@/lib/utils";
import type { ApiError } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      addressId,
      orderType,
      tableNumber,
      guestCount,
      scheduledFor,
      specialInstructions,
      occasionNote,
      items,
      paymentMethod,
      tipAmount = 0,
    } = body;

    if (!orderType || !items?.length) {
      return NextResponse.json<ApiError>(
        { error: "orderType e items son obligatorios" },
        { status: 400 }
      );
    }

    const subtotal: number = items.reduce(
      (sum: number, i: { unitPrice: number; quantity: number }) =>
        sum + i.unitPrice * i.quantity,
      0
    );
    const taxAmount = subtotal * 0.16; // IVA 16%
    const deliveryFee = orderType === "DELIVERY" ? 80 : 0;
    const serviceFee = orderType === "DINE_IN" ? subtotal * 0.1 : 0;
    const totalAmount = subtotal + taxAmount + deliveryFee + serviceFee + Number(tipAmount);

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        userId: userId ?? null,
        addressId: addressId ?? null,
        orderType,
        tableNumber: tableNumber ? Number(tableNumber) : null,
        guestCount: guestCount ? Number(guestCount) : null,
        scheduledFor: scheduledFor ? new Date(scheduledFor) : null,
        specialInstructions: specialInstructions ?? null,
        occasionNote: occasionNote ?? null,
        subtotal,
        taxAmount,
        deliveryFee,
        serviceFee,
        tipAmount: Number(tipAmount),
        totalAmount,
        paymentMethod: paymentMethod ?? null,
        items: {
          create: items.map((item: {
            menuItemId?: string;
            variantId?: string;
            wineBottleId?: string;
            tastingMenuId?: string;
            name: string;
            unitPrice: number;
            quantity: number;
            notes?: string;
          }) => ({
            menuItemId: item.menuItemId ?? null,
            variantId: item.variantId ?? null,
            wineBottleId: item.wineBottleId ?? null,
            tastingMenuId: item.tastingMenuId ?? null,
            name: item.name,
            unitPrice: item.unitPrice,
            quantity: item.quantity,
            lineTotal: item.unitPrice * item.quantity,
            notes: item.notes ?? null,
          })),
        },
      },
      include: { items: true },
    });

    return NextResponse.json({ data: order }, { status: 201 });
  } catch (err) {
    console.error("[POST /api/orders]", err);
    return NextResponse.json<ApiError>(
      { error: "Error al crear la orden" },
      { status: 500 }
    );
  }
}

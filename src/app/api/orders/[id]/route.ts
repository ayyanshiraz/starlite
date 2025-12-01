import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  // 🟢 Fix for Next.js 15: params is a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 🟢 CRITICAL FIX: You MUST await params before using the ID
    const { id } = await params;

    // 1. Get the new status from the body
    const body = await request.json();
    let { status } = body;

    console.log(`Updating Order ${id} to status: ${status}`);

    // 2. Safety check for Enums (Optional but recommended)
    // If your DB expects "CANCELLED" but you sent "cancelled", this fixes it.
    // If your DB is string-based, this doesn't hurt.
    if (status) {
      status = status.toUpperCase(); // Convert "pending" -> "PENDING" just in case
    }

    // 3. Update Database
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: status }, // Sends "PENDING", "DELIVERED", etc.
    });

    return NextResponse.json(updatedOrder);

  } catch (error) {
    console.error("Order Update Failed:", error);
    return NextResponse.json(
      { error: "Error updating order" }, 
      { status: 500 }
    );
  }
}
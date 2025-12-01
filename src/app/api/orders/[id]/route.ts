import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  // 🟢 Fix for Next.js 15: params is a Promise
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Await the ID
    const { id } = await params;

    // 2. Get the new status
    const body = await request.json();
    const { status } = body;

    console.log(`Updating Order ${id} to status: ${status}`);

    // 3. Update Database
    // We treat status as case-insensitive by passing it directly.
    // Ensure your Dropdown sends the correct case (usually lowercase for string fields).
    const updatedOrder = await prisma.order.update({
      where: { id: id },
      data: { status: status },
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
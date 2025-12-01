import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params; // Await params for Next.js 15
    const body = await request.json();
    const { status } = body;

    const updatedOrder = await prisma.order.update({
      where: { 
        id: id // 🟢 JUST USE 'id'. DO NOT USE Number(id)
      },
      data: { 
        status: status 
      },
    });

    return NextResponse.json(updatedOrder);

  } catch (error) {
    console.error("Prisma Error:", error);
    return NextResponse.json(
      { error: "Error updating order" }, 
      { status: 500 }
    );
  }
}
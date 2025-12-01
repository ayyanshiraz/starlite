import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) {
    return NextResponse.json({ error: "No session ID" }, { status: 400 });
  }

  try {
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: true } // Include items so we can show what they bought
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
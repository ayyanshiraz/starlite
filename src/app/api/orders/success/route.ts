import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// 🟢 1. Force this route to never cache
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  console.log("Success API hit with Session ID:", sessionId); // Debug Log

  if (!sessionId) {
    return NextResponse.json({ error: "No session ID" }, { status: 400 });
  }

  try {
    // 2. Find the order
    const order = await prisma.order.findUnique({
      where: { stripeSessionId: sessionId },
      include: { items: true }
    });

    if (!order) {
      console.error("Order not found for session:", sessionId);
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // 3. 🟢 CRITICAL FIX: Update Status
    // We check case-insensitively just to be safe
    if (order.status.toLowerCase() === 'pending') {
      console.log(`Updating Order ${order.id} to PROCESSING...`);
      
      const updatedOrder = await prisma.order.update({
        where: { id: order.id },
        data: { status: 'processing' } // Mark as Paid
      });
      
      // Return the updated order so the UI shows the new status immediately
      return NextResponse.json(updatedOrder);
    }

    // If already processed, just return it
    return NextResponse.json(order);

  } catch (error) {
    console.error("Success API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
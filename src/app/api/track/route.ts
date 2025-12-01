import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { orderId, email } = body;

    console.log("Tracking Request:", { orderId, email });

    if (!orderId || !email) {
      return NextResponse.json({ error: "Order ID and Email are required" }, { status: 400 });
    }

    // 1. Clean the inputs
    // Convert ID to lowercase because CUIDs in DB are lowercase, 
    // even though we show them as Uppercase on the frontend.
    const searchId = orderId.replace(/#/g, '').trim().toLowerCase();
    const searchEmail = email.trim().toLowerCase();

    // 2. Find Order (Using 'findFirst' with 'endsWith')
    // This allows finding the order even if the user only types the last 8 characters.
    const order = await prisma.order.findFirst({
      where: {
        id: {
          endsWith: searchId 
        },
        // Security: We can also filter by email directly here for speed
        customerEmail: {
            equals: searchEmail,
            mode: 'insensitive' // Case insensitive email check
        }
      },
      include: { items: true }
    });

    // 3. Verify Result
    if (!order) {
      console.log("Order not found or email mismatch");
      return NextResponse.json({ 
        error: "Order not found. Please check your Order ID and Email." 
      }, { status: 404 });
    }

    return NextResponse.json(order);

  } catch (error) {
    console.error("Tracking API Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
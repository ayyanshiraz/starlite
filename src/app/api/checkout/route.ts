import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  typescript: true,
});

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { items, customerInfo } = body;

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const amountTotal = items.reduce((acc: number, item: any) => {
       const price = typeof item.price === 'number' ? item.price : 0; 
       return acc + (price * item.quantity);
    }, 0);

    // 1. Create Order in DB (Save Customer Info)
    const tempId = `temp_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    const newOrder = await prisma.order.create({
      data: {
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerEmail: customerInfo.email,
        customerPhone: customerInfo.phone ? customerInfo.phone : null,
        addressLine1: customerInfo.address,
        addressLine2: customerInfo.address2 || null, 
        city: customerInfo.city,
        postalCode: customerInfo.postalCode, // Renamed from zip to match schema if needed
        country: customerInfo.country,
        state: customerInfo.state || null,
        amountTotal: Math.round(amountTotal * 100),
        currency: 'usd',
        status: 'pending',
        stripeSessionId: tempId,
        items: {
          create: items.map((item: any) => ({
            name: item.name,
            quantity: item.quantity,
            price: Math.round((typeof item.price === 'number' ? item.price : 0) * 100),
            sku: item.sku || null 
          }))
        }
      }
    });

    // 2. Create Stripe Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => {
        // 🟢 FIX: Ensure we only send valid URLs to Stripe
        const images = item.image && item.image.startsWith('http') ? [item.image] : [];
        
        return {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              images: images, // Send empty array if local image
            },
            unit_amount: Math.round((typeof item.price === 'number' ? item.price : 0) * 100),
          },
          quantity: item.quantity,
        };
      }),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout`,
      metadata: {
        orderId: newOrder.id,
      },
    });

    // 3. Update Order with Real Session ID
    await prisma.order.update({
      where: { id: newOrder.id },
      data: { stripeSessionId: session.id }
    });

    // 🟢 Return the URL for redirection (New Way)
    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Checkout API Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
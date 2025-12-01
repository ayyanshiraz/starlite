import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const sessionId = searchParams.get('session_id');

  if (!sessionId) return NextResponse.json({ error: 'Missing session_id' }, { status: 400 });

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ['line_items', 'line_items.data.price.product'],
    });

    return NextResponse.json({
      orderId: `ORD-${sessionId.slice(-8).toUpperCase()}`,
      amount_total: session.amount_total, 
      currency: session.currency,
      customer_email: session.customer_details?.email,
      name: session.customer_details?.name,
      items: session.line_items?.data || [],
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
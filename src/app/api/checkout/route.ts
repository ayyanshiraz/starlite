import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// 1. Correct Import: We import 'productSkus' instead of 'products'
import { productSkus } from '@/lib/sku-data'; 

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cartItems } = body; 

    const lineItems = cartItems.map((cartItem: any) => {
      // 2. Correct Lookup: Direct access using the ID (no .find needed)
      const product = productSkus[cartItem.id];

      // Check if product exists in your database
      if (!product) {
        throw new Error(`Product with ID ${cartItem.id} not found`);
      }

      // 3. Price Check: 
      // If price is a string (like "Get a Quote"), we CANNOT checkout.
      if (typeof product.price === 'string') {
        throw new Error(`Product "${cartItem.id}" requires a quote and cannot be bought online.`);
      }

      // If we are here, product.price is a number (e.g., 200)
      return {
        price_data: {
          currency: 'usd', 
          product_data: {
            name: cartItem.id, // Or add a name field to your SkuData interface if you want pretty names
          },
          // Stripe needs cents (200 * 100 = 20000 cents)
          unit_amount: Math.round(product.price * 100), 
        },
        quantity: cartItem.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      // 👇 ADD THESE LINES 👇
      phone_number_collection: {
        enabled: true,
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'GB', 'CA'], // Add countries you ship to
      },
      // 👆 END ADDITION 👆
      success_url: `${request.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${request.headers.get('origin')}/checkout`,
    });

    return NextResponse.json({ url: session.url });

  } catch (error: any) {
    console.error("Stripe Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

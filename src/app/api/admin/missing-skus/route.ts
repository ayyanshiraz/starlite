import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Find products where SKU is null OR an empty string
    const missingSkus = await prisma.product.findMany({
      where: {
        OR: [
          { sku: null },
          { sku: "" }
        ]
      },
      select: {
        id: true,
        name: true,
        slug: true
      }
    });

    return NextResponse.json({
      count: missingSkus.length,
      products: missingSkus
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
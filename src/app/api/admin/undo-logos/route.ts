import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // 1. Find all products pointing to the /brands/ folder
    const products = await prisma.product.findMany({
      where: {
        image: {
          contains: '/brands/'
        }
      }
    });

    // 2. Reset them to the placeholder
    await prisma.product.updateMany({
      where: {
        image: {
          contains: '/brands/'
        }
      },
      data: {
        image: '/placeholder.png' // Or null, depending on your preference
      }
    });

    return NextResponse.json({
      success: true,
      message: "Logo Cleanup Complete",
      cleaned_count: products.length,
      note: "These products are now ready for the correct images via Bulk Upload."
    });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
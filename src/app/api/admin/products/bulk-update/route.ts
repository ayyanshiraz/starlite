import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function PUT(request: Request) {
  try {
    const { ids, price, stock, isQuote } = await request.json();
    const data: any = {};
    
    // 🟢 Logic:
    // 1. If 'isQuote' is true, force price to NULL.
    // 2. Else, if a price was typed, update it.
    // 3. If neither (empty box & not checked), leave price alone.
    
    if (isQuote) {
      data.price = null;
    } else if (price !== undefined && price !== "") {
      data.price = Math.round(parseFloat(price) * 100);
    }

    if (stock !== undefined && stock !== "") {
      data.stock = parseInt(stock);
    }

    // Only run update if there is data to change
    if (Object.keys(data).length > 0) {
      await prisma.product.updateMany({
        where: { id: { in: ids } },
        data: data
      });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
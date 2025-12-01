import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { ids } = await request.json();
  await prisma.product.deleteMany({
    where: { id: { in: ids } }
  });
  return NextResponse.json({ success: true });
}
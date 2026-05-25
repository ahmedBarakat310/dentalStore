import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

// GET products
export async function GET() {
  const products = await prisma.product.findMany();

  return NextResponse.json(products);
}

// POST product
export async function POST(req: Request) {
  try {
    const body = await req.json();

    const product = await prisma.product.create({
      data: {
        name: body.name,
        description: body.description,
        price: Number(body.price),
        stock: Number(body.stock),
        category: body.category,
        isActive: body.isActive ?? true,
        image: body.image,
      },
    });

    return NextResponse.json(product);
  } catch (err) {
    console.log(err);

    return NextResponse.json(
      { error: "failed" },
      { status: 500 }
    );
  }
}
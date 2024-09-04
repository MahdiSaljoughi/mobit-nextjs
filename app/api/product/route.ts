// import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Prisma from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    msg: "Product Api GET",
  });
}

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json(); // دریافت داده‌ها از body درخواست

    // انجام عملیات مورد نظر با داده‌ها
    const { title, price, description, image } = data;

    // if (title.trim() === "" && typeof price !== "number") {
    //   return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    // }

    const newProduct = await Prisma.product.create({
      data: {
        price: data.price,
        slug: data.slug,
        cat: data.cat,
        count: data.const,
        title: data.title,
        description: data.description,
        image: data.image,
      },
    });

    // پاسخ به درخواست
    return NextResponse.json({
      message: `Product ${newProduct.title} with price ${newProduct.price} created successfully!`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // قطع اتصال به پایگاه داده
  }
}

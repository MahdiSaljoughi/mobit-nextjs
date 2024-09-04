// import { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import Prisma from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    msg: "User Api GET",
  });
}

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const data = await request.json(); // دریافت داده‌ها از body درخواست

    // انجام عملیات مورد نظر با داده‌ها
    const { email, hashedPassword, user_name, phone, image } = data;

    // if (title.trim() === "" && typeof price !== "number") {
    //   return NextResponse.json({ message: "Invalid data" }, { status: 400 });
    // }

    const newUser = await Prisma.user.create({
      data: {
        email: data.email,
        hashedPassword: data.hashedPassword,
        user_name: data.user_name,
        phone: data.phone,
        image: data.image,
      },
    });

    // پاسخ به درخواست
    return NextResponse.json({
      message: `User ${newUser.email} created successfully!`,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error - ${error}` },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect(); // قطع اتصال به پایگاه داده
  }
}

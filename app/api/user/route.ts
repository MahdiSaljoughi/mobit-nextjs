import { NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

import bcrypt from "bcrypt";

export async function GET() {
  return NextResponse.json({
    msg: "User Api GET",
  });
}

export async function POST(request: Request) {
  try {
    const { password, phone } = await request.json();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Prisma.user.create({
      data: {
        password: hashedPassword,
        phone
      },
    });

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
    await Prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    // استخراج داده‌ها از بدنه درخواست
    const { id, email, userName, phone, role } =
      await request.json();

    // بررسی وجود ID
    if (!id) {
      return new Response("ID is required", { status: 400 });
    }

    // انجام عملیات به‌روزرسانی (مثلاً از پایگاه داده)
    const updatedUser = await Prisma.user.update({
      where: {
        id,
      },
      data: {
        email,
        userName,
        phone,
        role,
      },
    });

    if (updatedUser) {
      return new Response(JSON.stringify(updatedUser), { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await Prisma.$disconnect(); // قطع اتصال به پایگاه داده
  }
}

export async function DELETE(request: Request) {
  try {
    // استخراج ID از URL یا body درخواست
    const { id } = await request.json(); // فرض بر این است که ID در بدنه درخواست ارسال می‌شود

    if (!id) {
      return new Response("ID is required", { status: 400 });
    }

    // انجام عملیات حذف (مثلاً از پایگاه داده)
    // فرض کنید که شما یک تابع deleteProduct دارید که محصول را حذف می‌کند
    const result = await Prisma.user.delete({
      where: {
        id,
      },
    });

    if (result) {
      return new Response("User deleted successfully", { status: 200 });
    } else {
      return new Response("User not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    await Prisma.$disconnect(); // قطع اتصال به پایگاه داده
  }
}

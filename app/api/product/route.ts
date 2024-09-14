import { NextResponse } from "next/server";
import Prisma from "@/lib/prisma";

export async function GET() {
  return NextResponse.json({
    msg: "Product Api GET",
  });
}

export async function POST(request: Request) {
  try {
    const { title, slug, price, count, description, cat, image, createdBy,titleEng } =
      await request.json();

    const newProduct = await Prisma.product.create({
      data: {
        title,
        slug,
        price,
        count,
        description,
        cat,
        image,
        createdBy,
        titleEng
      },
    });

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
    await Prisma.$disconnect();
  }
}

export async function PUT(request: Request) {
  try {
    // استخراج داده‌ها از بدنه درخواست
    const { id, title, slug, count, price, cat, description, image } =
      await request.json();

    // بررسی وجود ID
    if (!id) {
      return new Response("ID is required", { status: 400 });
    }

    // انجام عملیات به‌روزرسانی (مثلاً از پایگاه داده)
    const updatedProduct = await Prisma.product.update({
      where: {
        id,
      },
      data: {
        title,
        slug,
        price,
        count,
        description,
        cat,
        image,
      },
    });

    if (updatedProduct) {
      return new Response(JSON.stringify(updatedProduct), { status: 200 });
    } else {
      return new Response("Product not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error updating product:", error);
    return new Response("Internal Server Error", { status: 500 });
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
    const result = await Prisma.product.delete({
      where: {
        id,
      },
    });

    if (result) {
      return new Response("Product deleted successfully", { status: 200 });
    } else {
      return new Response("Product not found", { status: 404 });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

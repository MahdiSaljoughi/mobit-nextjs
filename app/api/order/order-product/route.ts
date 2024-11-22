import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET() {
  try {
    const orderProducts = await prismadb.orderProduct.findMany();
    return NextResponse.json({
      orderProducts: JSON.stringify(orderProducts),
      msg: "OrderProduct Api GET",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error fetching OrderProduct",
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const { order_id, product_id, quantity } = await request.json();

    if (!order_id || !product_id || !quantity) {
      return NextResponse.json({
        message: "تمام فیل ها را پر کنید",
        messageEng: "Product created successfully!",
        status: 400,
      });
    }

    const newOrderProduct = await prismadb.orderProduct.create({
      data: {
        order_id,
        product_id,
        quantity,
      },
    });

    if (newOrderProduct) {
      return NextResponse.json({
        message: "کالاها با موفقیت ثبت شد",
        messageEng: "Product created successfully!",
        status: 201,
      });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prismadb.$disconnect();
  }
}

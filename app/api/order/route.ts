import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET() {
  try {
    const orders = await prismadb.order.findMany();
    return NextResponse.json({
      orders: orders,
      msg: "Order Api GET",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      msg: "Error fetching orders",
      status: 500,
    });
  }
}

export async function POST(request: Request) {
  try {
    const {
      customer_id,
      status_order,
      delivery_address,
      payment_method,
      amount_paid,
    } = await request.json();

    const newOrder = await prismadb.order.create({
      data: {
        customer_id,
        status_order,
        delivery_address,
        payment_method,
        amount_paid,
      },
    });

    if (newOrder) {
      return NextResponse.json({
        message: "سفارش با موفقیت ثبت شد",
        messageEng: `Order created successfully!`,
        status: 201,
        orderId: newOrder.id,
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

export async function PUT(request: Request) {
  try {
    const { id, payment_method, amount_paid } = await request.json();

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    if (!payment_method || !amount_paid) {
      return NextResponse.json({
        message: "لطفا تمام فیلد ها را پر کنید",
        messageEng: "Please fill in all fields",
        status: 400,
      });
    }

    const updatedOrder = await prismadb.order.update({
      where: {
        id,
      },
      data: {
        payment_method,
        amount_paid,
      },
    });

    if (updatedOrder) {
      return NextResponse.json({
        message: "سفارش با موفقیت ویرایش شد",
        messageEng: "updatedOrder sucsses",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "این سفارش یافت نشد",
        messageEng: "Order not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error updating order:", error);

    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({
        message: "آیدی الزامی است",
        messageEng: "ID is required",
        status: 400,
      });
    }

    const result = await prismadb.order.delete({
      where: {
        id,
      },
    });

    if (result) {
      return NextResponse.json({
        message: "سفارش با موفقیت حذف شد",
        messageEng: "Order deleted successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        message: "سفارش یافت نشد",
        messageEng: "Order not found",
        status: 404,
      });
    }
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json({
      message: "خطای سرور",
      messageEng: "Internal Server Error",
      status: 500,
    });
  }
}

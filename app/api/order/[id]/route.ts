import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const order = await prismadb.order.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!order) {
      return NextResponse.json({
        order: null,
        msg: "Order not found",
        status: 404,
      });
    }

    return NextResponse.json({
      order: order,
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

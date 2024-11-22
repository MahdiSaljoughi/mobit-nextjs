import { NextResponse } from "next/server";
import prismadb from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.pathname.split("/").pop();

    const orderProduct = await prismadb.orderProduct.findMany({
      where: {
        order_id: Number(id),
      },
    });
    return NextResponse.json({
      orderProduct: orderProduct,
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

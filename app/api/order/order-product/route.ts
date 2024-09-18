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

// export async function POST(request: Request) {
//   try {
//     const {
//       customerId,
//       statusOrder,
//       deliveryAddress,
//       paymentMethod,
//       amountPaid,
//     } = await request.json();

//     const newOrder = await prismadb.order.create({
//       data: {
//         customerId,
//         statusOrder,
//         deliveryAddress,
//         paymentMethod,
//         amountPaid,
//       },
//     });

//     if (newOrder) {
//       return NextResponse.json({
//         message: "سفارش با موفقیت ثبت شد",
//         messageEng: `Order created successfully!`,
//         status: 201,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { message: "Internal Server Error" },
//       { status: 500 }
//     );
//   } finally {
//     await prismadb.$disconnect();
//   }
// }

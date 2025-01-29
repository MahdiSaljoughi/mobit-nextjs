import AdminOrder from "@/src/components/Admin/Order/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/src/lib/auth";
import axios from "axios";
import ProductOrderUser from "@/src/components/OrderUser/ProductOrder";
import ProductOrder from "@/src/components/Admin/Order/ProductOrder";

export default async function page({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);

  const ordersFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`
  );
  const orders = ordersFetch.data.orders;
  const order = orders.find((x: any) => x.id === Number(params.id));

  if (session?.user.role === "ADMIN") {
    if (!order) {
      return (
        <div className="min-h-[900px] flex items-center justify-center">
          <span className="block text-2xl text-red-400">سفارش یافت نشد!</span>
        </div>
      );
    } else {
      return (
        <>
          <div className="min-h-screen">
            <AdminOrder order={order} />
            <ProductOrder ordersId={order.id} />
          </div>
        </>
      );
    }
  } else {
    if (!order) {
      return (
        <div className="min-h-[900px] flex items-center justify-center">
          <span className="block text-2xl text-red-400">سفارش یافت نشد!</span>
        </div>
      );
    } else {
      return (
        <>
          <ProductOrderUser ordersId={order.id} />
        </>
      );
    }
  }
}

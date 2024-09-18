import AdminOrder from "@/components/Admin/Order/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import axios from "axios";
import Link from "next/link";

export default async function page({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);

  const ordersFetch = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
  });
  const orders = JSON.parse(ordersFetch.data.orders);
  const order = orders.find((x: any) => x.id === Number(params.id));

  // if (session?.user)
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
          <div className="bg-zinc-900 min-h-screen">
            <AdminOrder order={order} />
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="min-h-[900px] flex flex-col gap-y-4 items-center justify-center">
          <div>
            <span>404</span>
            <span>چنین صفحه ای پیدا نشد!</span>
          </div>
          <Link href="/" className="block text-blue-500">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </>
    );
  }
}

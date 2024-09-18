import prismadb from "@/lib/prisma";
import AdminOrder from "@/components/Admin/Order/Order";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Link from "next/link";

export default async function page({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);

  const order = await prismadb.order.findUnique({
    where: {
      id: Number(params.id),
    },
  });
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

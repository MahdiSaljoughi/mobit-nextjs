// "use client";

import Link from "next/link";
import prismadb from "@/lib/prisma";

export default async function Order({ order }: any) {
  const user = await prismadb.user.findUnique({
    where: {
      id: order.customerId,
    },
  });

  const orderDetails = {
    ...order,
    userId: user?.id,
    userName: user?.userName,
  };

  const handelDeleteOrder = async () => {};

  return (
    <>
      <div className="p-4">
        <img
          src="/images/logos/mobit.png"
          alt="logo-mobit"
          className="w-40 mx-auto"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="text-red-500 bg-red-500/30 px-6 py-2 rounded-xl flex items-center gap-x-2 hover:ring-4 ring-red-500/50 transition-all">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
              />
            </svg>
            <span>حذف سفارش</span>
          </button>
          <Link
            href={"/dashbord/order"}
            className="inline-flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
          >
            <span>بازگشت</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H4m0 0l6-6m-6 6l6 6"
              />
            </svg>
          </Link>
        </div>
        <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl text-zinc-100">
          <table className="w-full">
            <thead>
              <tr className="text-blue-500 text-xs md:text-base text-center">
                <td>کد</td>
                <td>نام کاربری مشتری</td>
                <td>کد مشتری</td>
                <td>وضعیت</td>
                <td>روش پرداخت</td>
                <td>مبلغ پرداختی</td>
                <td>تاریخ</td>
                <td>زمان</td>
              </tr>
            </thead>
            <tbody className="w-full">
              <tr className="text-center">
                <td className="p-4">{order.id}</td>
                <td>
                  <Link
                    href={`/dashbord/user/${orderDetails.userId}`}
                    className="text-blue-400 hover:text-blue-500 transition-colors"
                  >
                    <span>{orderDetails.userName}</span>
                  </Link>
                </td>
                <td>{order.customerId}</td>
                <td>{order.statusOrder}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.amountPaid}</td>
                <td>{order.orderDate.toLocaleDateString()}</td>
                <td>{order.orderDate.toLocaleTimeString()}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 m-4 border border-zinc-700 rounded-2xl">
            <div className="flex items-center gap-x-2">
              <span className="block">آدرس :</span>
              <p>{order.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

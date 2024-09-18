import Link from "next/link";
import Prisma from "@/lib/prisma";
import axios from "axios";

export default async function AdminOrderList() {
  const ordersFetch = await axios({
    method: "get",
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
  });

  const orders = JSON.parse(ordersFetch.data.orders);

  const orderDetails = await Promise.all(
    orders.map(async (order: any) => {
      const user = await Prisma.user.findUnique({
        where: {
          id: order.customerId,
        },
      });
      return {
        ...order,
        userId: user?.id,
        userName: user?.userName,
      };
    })
  );

  return (
    <>
      <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl text-zinc-100">
        <table className="w-full">
          <thead>
            <tr className="text-blue-500 text-xs md:text-base text-center">
              <td>کد</td>
              <td>نام کاربری مشتری</td>
              <td>کد مشتری</td>
              <td>وضعیت</td>
              <td>روش پرداخت</td>
              <td>تاریخ</td>
              <td>تغیرات</td>
            </tr>
          </thead>
          <tbody className="w-full">
            {orders.map((order: any, index: any) => (
              <tr
                key={index}
                className={
                  index % 2 === 0 ? "text-center" : "text-center bg-blue-400/20"
                }
              >
                <td className="p-4">{order.id}</td>
                <td>
                  {orderDetails.map((user) => (
                    <Link
                      key={user.userId}
                      href={`/dashbord/user/${user.userId}`}
                      className="text-blue-400 hover:text-blue-500 transition-colors"
                    >
                      <span>{user.userName}</span>
                    </Link>
                  ))}
                </td>
                <td>{order.customerId}</td>
                <td>{order.statusOrder}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.orderDate}</td>
                <td>
                  <Link
                    href={`/dashbord/order/${order.id}`}
                    className="flex- 1 flex justify-center hover:scale-110 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                          d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"
                          opacity="0.5"
                        />
                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                      </g>
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

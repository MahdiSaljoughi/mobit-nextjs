import axios from "axios";
import OrdersUser from "./OrdersUser";
import Link from "next/link";

export default async function Orders({ userId }: any) {
  const ordersFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`
  );

  const orders = ordersFetch.data.orders;
  const userOrders = orders.filter((x: any) => userId === x.customer_id);

  return (
    <>
      <div>
        {userOrders.map((order: any, index: any) => (
          <div key={index}>
            {userId === order.customer_id && (
              <>
                <OrdersUser ordersId={order.id} />
              </>
            )}
          </div>
        ))}
        {orders.every((order: any) => order.customer_id !== userId) && (
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10em"
              height="10em"
              viewBox="0 0 24 24"
              className="flex items-center justify-center w-full"
            >
              <path
                fill="#8f8f8f"
                d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 0 0 9.5 3C6.08 3 3.28 5.64 3.03 9h2.02C5.3 6.75 7.18 5 9.5 5C11.99 5 14 7.01 14 9.5S11.99 14 9.5 14c-.17 0-.33-.03-.5-.05v2.02c.17.02.33.03.5.03c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19z"
              />
              <path
                fill="#8f8f8f"
                d="M6.47 10.82L4 13.29l-2.47-2.47l-.71.71L3.29 14L.82 16.47l.71.71L4 14.71l2.47 2.47l.71-.71L4.71 14l2.47-2.47z"
              />
            </svg>
            <span className="block text-center mb-4">
              لیست سفارشات شما خالی است.
            </span>
            <span className="block text-center text-zinc-500">
              مبیت دسته‌ بندی و کالاهای زیادی دارد که شما دوست خواهید داشت !!
            </span>
            <Link
              href={"/"}
              className="text-blue-500 w-full block text-center mt-4"
            >
              بازگشت به صفحه اصلی
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

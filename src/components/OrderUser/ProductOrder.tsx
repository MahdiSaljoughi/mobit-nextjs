import axios from "axios";
import Link from "next/link";

interface User {
  id: number;
  userName: string;
  phone: string;
  email: string;
}

export default async function ProductOrder({ ordersId }: any) {
  const responseOrder = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${ordersId}`
  );
  const order = responseOrder.data.order;

  const orderedProductFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/order-product/${ordersId}`
  );
  const orderedProduct = orderedProductFetch.data.orderProduct;

  const productsFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
  );
  const products = productsFetch.data.products;

  const users = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user`);
  const user: User[] = users.data.users;
  const findUser = user.find((x) => x.id === order.customer_id);

  const totalPrice = orderedProduct.reduce(
    (total: any, orderedProduct: any) => {
      const product = products.find(
        (product: any) => product.id === orderedProduct.productId
      );
      return total + (product ? product.price : 0) * orderedProduct.quantity;
    },
    0
  );

  return (
    <>
      <div className="flex flex-col gap-y-4 lg:gap-y-10 mx-3 lg:mx-auto lg:container py-4 lg:py-10">
        <div className="border rounded-2xl py-8">
          <div className="flex items-center justify-between mb-4 mx-2 lg:mx-6">
            <span className="block">جزئیات سفارش {order.id}</span>
            <Link
              href={"/dashbord/order"}
              className="flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
            >
              <span className="hidden lg:block">بازگشت</span>
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
          <div className="flex flex-col lg:flex-row items-center justify-between bg-zinc-100 py-4 px-2 lg:px-6 gap-y-4">
            <div>
              <span className="inline-block ml-1">
                {totalPrice.toLocaleString()}
              </span>
              <span className="text-zinc-500 text-xs inline-block ml-4">
                تومان
              </span>
              <span className="text-red-500 text-xs">
                {order.paymentMethod}
              </span>
            </div>
            <div>
              <span className="text-zinc-500 text-xs inline-block ml-4">
                تاریخ ثبت سفارش
              </span>
              <span className="text-sm text-left inline-block">
                {order.orderDate}
              </span>
            </div>
          </div>
          <div className="mt-4 mr-4">
            <span className="text-sm text-zinc-500 block">آدرس تحویل</span>
            <div className="flex items-center gap-x-4 p-2 lg:pr-4 py-4 lg:py-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.3em"
                height="1.3em"
                viewBox="0 0 16 16"
                className="text-rose-400"
              >
                <path
                  fill="currentColor"
                  d="m7.385 15.293l-.192-.13a18 18 0 0 1-2.666-2.283C3.1 11.385 1.5 9.144 1.5 6.499C1.5 3.245 4.141 0 8 0s6.5 3.245 6.5 6.5c0 2.645-1.6 4.886-3.027 6.379a18 18 0 0 1-2.666 2.283q-.122.085-.192.13c-.203.135-.41.263-.615.393c-.205-.13-.412-.258-.615-.392M8 8.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4"
                />
              </svg>
              <span className="text-sm">{order.deliveryAddress}</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-y-6 gap-x-10 p-2 lg:pr-4 pb-8">
              <div className="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                  className="text-zinc-400"
                >
                  <path
                    fill="currentColor"
                    d="M12 12a4 4 0 1 1 0-8a4 4 0 0 1 0 8m0 3c3.186 0 6.045.571 8 3.063V20H4v-1.937C5.955 15.57 8.814 15 12 15"
                  />
                </svg>
                <span className="text-sm font-[iranr]">
                  {findUser?.userName}
                </span>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                  className="text-zinc-400"
                >
                  <path
                    fill="currentColor"
                    d="m19.23 15.26l-2.54-.29a1.99 1.99 0 0 0-1.64.57l-1.84 1.84a15.05 15.05 0 0 1-6.59-6.59l1.85-1.85c.43-.43.64-1.03.57-1.64l-.29-2.52a2 2 0 0 0-1.99-1.77H5.03c-1.13 0-2.07.94-2 2.07c.53 8.54 7.36 15.36 15.89 15.89c1.13.07 2.07-.87 2.07-2v-1.73c.01-1.01-.75-1.86-1.76-1.98"
                  />
                </svg>
                <span className="text-sm font-[iranr]">{findUser?.phone}</span>
              </div>
              <div className="flex items-center gap-x-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                  className="text-zinc-400"
                >
                  <path
                    fill="currentColor"
                    d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2m-.4 4.25l-6.54 4.09c-.65.41-1.47.41-2.12 0L4.4 8.25a.85.85 0 1 1 .9-1.44L12 11l6.7-4.19a.85.85 0 1 1 .9 1.44"
                  />
                </svg>
                <span className="text-sm font-[iranr]">{findUser?.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-center gap-4 p-2 lg:pr-8">
            <span className="text-sm text-zinc-500">بازه تحویل</span>
            <span className="text-sm">
              سه شنبه (1403/06/20) - از ساعت 17 الی 21
            </span>
          </div>
        </div>
        <div className="border rounded-2xl p-4 lg:p-8 mb-20 lg:mb-0">
          <span>کالاها</span>
          {orderedProduct.map((productOrder: any) => (
            <div key={productOrder.id}>
              {products.map(
                (product: any) =>
                  productOrder.product_id === product.id && (
                    <div
                      key={product.id}
                      className="border-b py-2 pt-4 lg:py-4 flex flex-col lg:flex-row lg:items-center justify-between w-full gap-y-8"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex item-center gap-x-4"
                      >
                        <div className="max-w-24">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="mx -auto"
                          />
                        </div>
                        <span className="block text-sm leading-6 lg:pt-8">
                          {product.title}
                        </span>
                      </Link>
                      <div className="flex items-center lg:gap-x-10 justify-between pb-4 lg:pb-0">
                        <div>
                          <span className="bg-zinc-100 p-3 rounded-xl text-sm">
                            {productOrder.quantity} عدد
                          </span>
                        </div>
                        <span className="text-sm lg:text-base">
                          {product.price.toLocaleString()}
                          <span className="text-xs text-zinc-500">تومان</span>
                        </span>
                      </div>
                    </div>
                  )
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

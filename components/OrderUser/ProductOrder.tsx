import axios from "axios";
import Link from "next/link";
import Image from "next/image";

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
  const products = JSON.parse(productsFetch.data.products);

  return (
    <>
      <div className="flex flex-col gap-y-4 lg:gap-y-10 mx-3 lg:mx-auto lg:container py-4 lg:py-10">
        <div className="border rounded-2xl py-8">
          <span className="block mb-4 mr-6">جزئیات سفارش {order.id}</span>
          <div className="flex items-center justify-between bg-zinc-100 py-4 px-6">
            <div>
              <span className="inline-block ml-1">76,000,000</span>
              <span className="text-zinc-500 text-xs inline-block ml-4">
                تومان
              </span>
              <span className="text-red-500 text-xs">پرداخت آنلاین</span>
            </div>
            <div>
              <span className="text-zinc-500 text-xs inline-block ml-4">
                تاریخ ثبت سفارش
              </span>
              <span>{order.orderDate}</span>
            </div>
          </div>
          <div>آدرس تحویل</div>
          <div>
            استان کرمان - کرمان - م. شهدای انتظامی محمد مهدی سلجوقی 09140376808
            1234567890
          </div>
          <div> بازه تحویل سه شنبه (1403/06/20) - از ساعت 17 الی 21</div>
        </div>
        <div className="border rounded-2xl p-8">
          <span>کالاها</span>
          {orderedProduct.map((productOrder: any) => (
            <div key={productOrder.id}>
              {products.map(
                (product: any) =>
                  productOrder.productId === product.id && (
                    <div
                      key={product.id}
                      className="border-b py-2 lg:py-4 flex flex-col lg:flex-row lg:items-center justify-between w-full"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        className="flex item-center gap-x-4"
                      >
                        <Image
                          src={product.image}
                          width={80}
                          height={80}
                          alt={product.title}
                          className="mx-auto"
                        />
                        <span className="block pt-2 text-sm line-clamp-2 leading-7">
                          {product.title}
                        </span>
                      </Link>
                      <div className="bg-zinc-100 p-3 rounded-xl text-sm">
                        {productOrder.quantity} عدد
                      </div>
                      <div className="flex flex-row-reverse justify-between lg:flex-col items-center lg:items-stretch">
                        <span className="p-5 text-right">
                          {product.price.toLocaleString()} تومان
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

import axios from "axios";
import Link from "next/link";

export default async function ProductOrder({ ordersId }: any) {
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
      <span className="block text-center mb-2">کالا ها</span>
      {orderedProduct.map((productOrder: any) => (
        <div
          key={productOrder.id}
          className="py-4 md:py-8 rounded-3xl mb-4 bg-zinc-100 mx-4"
        >
          <table className="w-full">
            <thead>
              <tr className="text-blue-500 text-xs md:text-base text-center">
                <th>کد</th>
                <th>کد سفارش</th>
                <th>کد محصول</th>
                <th>نام و تصویر محصول</th>
                <th>تعداد سفارش</th>
                <th>صفحه محصول</th>
              </tr>
            </thead>
            <tbody className="w-full">
              <tr className="text-center">
                <td className="p-4">{productOrder.id}</td>
                <td>{productOrder.orderId}</td>
                <td>{productOrder.productId}</td>
                <td>
                  {products.map(
                    (product: any) =>
                      productOrder.productId === product.id && (
                        <div
                          key={product.id}
                          className="flex flex-col items-center justify-center gap-y-4 mt-4"
                        >
                          <div className="w-20">
                            <img src={product.image} alt={product.title} />
                          </div>
                          <span className="text-sm">{product.title}</span>
                        </div>
                      )
                  )}
                </td>
                <td>{productOrder.quantity} عدد</td>
                <td>
                  <Link
                    href={`/dashbord/product/${productOrder.productId}`}
                    className="flex items-center justify-center"
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
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

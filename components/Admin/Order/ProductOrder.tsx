import axios from "axios";
import Link from "next/link";

export default async function ProductOrder({ ordersId }: any) {
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/order-product`
  );
  const orderProduct = JSON.parse(response.data.orderProducts);

  const productsOrder = orderProduct.filter((x: any) => x.orderId === ordersId);

  const productsFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
  );
  const allProducts = JSON.parse(productsFetch.data.products);

  const productsId = allProducts.map((y: any) => {
    return y.id;
  });

  const availableProducts = productsOrder.filter((x: any) => {
    return productsId.includes(x.productId);
  });

  const products = availableProducts.map((orderProduct: any) => {
    const product = allProducts.find(
      (p: any) => p.id === orderProduct.productId
    );
    return {
      id: product.id,
      title: product.title,
      image: product.image,
    };
  });

  return (
    <>
      <div className="text-zinc-100 p-4">
        <div className="p-4">
          <img
            src="/images/logos/mobit.png"
            alt="logo-mobit"
            className="w-40 mx-auto"
          />
        </div>
        <div className="flex items-center justify-end mb-4">
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
        {productsOrder.map((productOrder: any) => (
          <div key={productOrder.id} className="pb-4">
            <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl text-zinc-100">
              <table className="w-full">
                <thead>
                  <tr className="text-blue-500 text-xs md:text-base text-center">
                    <td>کد</td>
                    <td>کد سفارش</td>
                    <td>کد محصول</td>
                    <td>نام و تصویر محصول سفارش داده شده</td>
                    <td>تعداد سفارش</td>
                    <td>صفحه محصول</td>
                  </tr>
                </thead>
                <tbody className="w-full">
                  <tr className="text-center">
                    <td className="p-4">{productOrder.id}</td>
                    <td>{productOrder.orderId}</td>
                    <td>{productOrder.productId}</td>
                    {products.map((product: any) => (
                      <div
                        key={product.id}
                        className="flex items-center justify-center p-1"
                      >
                        {productOrder.productId === product.id ? (
                          <td>
                            <div className="flex flex-col items-center justify-center gap-y-4">
                              <div className="w-20">
                                <img src={product.image} alt={product.title} />
                              </div>
                              <span className="text-sm">{product.title}</span>
                            </div>
                          </td>
                        ) : null}
                      </div>
                    ))}
                    <td>{productOrder.quantity}</td>
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
                {/* <div>
                  <span>محصولات سفارش داده شده</span>
                  {products.map((product: any) => (
                    <div key={product.id}>
                      {productOrder.productId === product.id ? (
                        <div>
                          <div>{product.title}</div>
                          <div className="w-40">
                            <img src={product.image} alt={product.title} />
                          </div>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div> */}
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

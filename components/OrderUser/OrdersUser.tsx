import axios from "axios";
import Link from "next/link";

export default async function OrdersUser({ ordersId }: any) {
  const responseOrder = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${ordersId}`
  );
  const order = responseOrder.data.order;

  const orderedProductsFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/order-product/${ordersId}`
  );
  const orderedProducts = orderedProductsFetch.data.orderProduct;

  const productsFetch = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`
  );
  const products = JSON.parse(productsFetch.data.products);

  const totalPrice = orderedProducts.reduce(
    (total: any, orderedProduct: any) => {
      const product = products.find(
        (product: any) => product.id === orderedProduct.productId
      );
      return total + (product ? product.price : 0);
    },
    0
  );

  return (
    <>
      <ul>
        <li>
          <Link
            href={`/dashbord/order/${order.id}`}
            className="hidden lg:flex items-center gap-x-32 border rounded-2xl p-8 mb-8 hover:bg-zinc-100 transition-colors"
          >
            <div className="flex flex-col items-center gap-y-10">
              <div className="flex items-center justify-center gap-x-1">
                <span className="text-lg">{totalPrice.toLocaleString()}</span>
                <span className="text-zinc-500 text-sm">تومان</span>
              </div>
              <div className="flex items-center justify-center gap-x-1">
                <span className="text-zinc-500 text-sm">شماره سفارش</span>
                <span>{order.id}</span>
              </div>
            </div>

            <div className="flex items-center gap-x-10">
              <div className="flex flex-col items-center gap-y-10">
                <div>
                  <span>{order.statusOrder}</span>
                </div>
                <span className="text-zinc-500 text-sm">{order.orderDate}</span>
              </div>
              <div className="flex items-center gap-x-4">
                {orderedProducts.map((orderedProduct: any, index: any) => (
                  <div key={index}>
                    {products.map((product: any) => (
                      <div key={product.id}>
                        {orderedProduct.productId === product.id ? (
                          <div className="w-20">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Link>

          {/* mobile */}
          <Link
            href={`/dashbord/order/${order.id}`}
            className="flex flex-col gap-y-8 lg:hidden gap-x-32 border rounded-2xl px-3 py-6 mb-4"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-center gap-x-1">
                <span className="text-lg">{totalPrice.toLocaleString()}</span>
                <span className="text-zinc-500 text-sm">تومان</span>
              </div>
              <div>
                <span>{order.statusOrder}</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-x-1">
                {orderedProducts.map((orderedProduct: any, index: any) => (
                  <div key={index}>
                    {products.map((product: any) => (
                      <div key={product.id}>
                        {orderedProduct.productId === product.id ? (
                          <div className="w-16">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full"
                            />
                          </div>
                        ) : null}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center justify-center gap-x-1">
                <span className="text-zinc-500 text-sm">شماره سفارش</span>
                <span>{order.id}</span>
              </div>
              <span className="text-zinc-500 text-sm">{order.orderDate}</span>
            </div>
          </Link>
        </li>
      </ul>
    </>
  );
}

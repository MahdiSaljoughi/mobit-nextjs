"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/AddToCart/AddToCart";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export default function CartItems() {
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const router = useRouter();
  return (
    <div className={cartItems.length === 0 ? "" : "contain min-h-[900px]"}>
      {cartItems.length === 0 ? (
        <>
          <div className="min-h-[900px] contain">
            <div className="fixed inset-0 w-full flex flex-col justify-center items-center gap-y-10">
              <span className="block text-lg md:text-2xl">
                سبد خرید شما خالی است.
              </span>
              <Link
                href="/products"
                className="bg-blue-500 px-10 py-2 rounded-2xl inline-block text-white"
              >
                شروع خرید
              </Link>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-y-10 justify-between w-full gap-x-10">
            <div className="flex flex-col gap-y-5 w-full">
              {cartItems.map((item: any) => (
                <div
                  key={item.id}
                  className="border-b pb-2 lg:pb-4 flex flex-col lg:flex-row lg:items-center justify-between w-full"
                >
                  <Link
                    href={`/products/${item.slug}`}
                    className="flex item-center gap-x-4"
                  >
                    <span className="block bg-zinc-100 w-60 sm:w-40 p-2 rounded-xl">
                      <Image
                        src={item.image}
                        width={100}
                        height={100}
                        alt={item.title}
                        className="mx-auto"
                      />
                    </span>
                    <span className="block pt-2 text-sm line-clamp-2 leading-7">
                      {item.title}
                    </span>
                  </Link>
                  <div className="flex flex-row-reverse justify-between lg:flex-col items-center lg:items-stretch">
                    <span className="p-5 text-right">
                      {item.price.toLocaleString()} تومان
                    </span>
                    <AddToCart id={item.id} />
                  </div>
                </div>
              ))}
            </div>
            <div>
              <div className="bg-zinc-100 sticky top-24 rounded-2xl lg:w-96 flex flex-col gap-y-4 justify-between p-4 mb-20 lg:mb-0">
                <span className="text-zinc-500 block">اطلاعات پرداخت</span>
                <div className="flex items-center justify-between w-full text-sm">
                  <span className="block">مبلغ کالاها</span>
                  <span>
                    {cartItems
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      .toLocaleString()}

                    <span className="text-zinc-500 text-xs mr-0.5">تومان</span>
                  </span>
                </div>
                <div className="flex items-center justify-between w-full">
                  <span className="block text-sm">هزینه ارسال</span>
                  <span className="block text-sm text-zinc-500">
                    در مرحله بعد مشخص می شود
                  </span>
                </div>
                <div className="w-full flex items-center justify-between border-t pt-4">
                  <span className="text-sm">مبلغ قابل پرداخت :</span>
                  <span>
                    {cartItems
                      .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                      .toLocaleString()}
                    <span className="text-zinc-500 text-xs mr-0.5">تومان</span>
                  </span>
                </div>
                <button
                  className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white p-2.5 w-full transition-colors"
                  onClick={() => router.push("/shipping")}
                >
                  ادامه
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

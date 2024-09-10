"use client";

import { useSession } from "next-auth/react";

import { useContext } from "react";
import { CartContext } from "@/contexts/cart";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { state, dispatch } = useContext(CartContext);

  const { data: session } = useSession();

  const {
    cart: { cartItems },
  } = state;
  function removeItemHandler(item: any) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }
  const router = useRouter();

  if (session?.user) {
    return (
      <>
        <div className={cartItems.length === 0 ? "" : "contain min-h-[900px]"}>
          {cartItems.length === 0 ? (
            <>
              <div className="min-h-[900px] flex flex-col justify-center items-center gap-y-10 contain">
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
                        <div className="flex items-center gap-x-4 justify-between pl-2 pr-3 py-2 lg:p-2 lg:pr-4 bg-zinc-100 dark:bg-zinc-700 rounded-xl">
                          <span className="text-sm">{item.qty} عدد</span>
                          <button
                            onClick={() => removeItemHandler(item)}
                            className="bg-red-500/20 p-1 rounded-lg text-red-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.2em"
                              height="1.2em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                              />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-zinc-100 sticky top-24 rounded-2xl h-40 lg:w-[500px] flex flex-col items-center justify-between p-4">
                  <span>اطلاعات پرداخت</span>
                  <div className="w-full mx-10 rounded-xl flex items-center justify-center p-4 text-lg">
                    <span className="text-sm">
                      مبلغ قابل پرداخت :{" "}
                      {cartItems
                        .reduce(
                          (acc: any, cur: any) => acc + cur.qty * cur.price,
                          0
                        )
                        .toLocaleString()}{" "}
                      تومان
                    </span>
                  </div>
                  <button
                    className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 w-full transition-colors"
                    onClick={() => router.push("/shipping")}
                  >
                    ادامه
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-h-[900px] flex flex-col justify-center items-center gap-y-10 contain">
          <span className="block text-lg md:text-2xl text-center">
            لطفا ابتدا به حساب کاربری خود وارد شوید.
          </span>
          <Link
            href="/sign-in"
            className="bg-blue-500 px-10 py-2 rounded-2xl inline-block text-white"
          >
            ورود
          </Link>
        </div>
      </>
    );
  }
}

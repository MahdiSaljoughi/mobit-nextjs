"use client";

import { useSession } from "next-auth/react";

import { useContext } from "react";
import { CartContext } from "@/contexts/cart";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function CartPage() {
  const { state, dispatch } = useContext(CartContext);

  // const { data: session } = useSession();

  const {
    cart: { cartItems },
  } = state;
  function removeItemHandler(item: any) {
    dispatch({ type: "REMOVE_ITEM", payload: item });
  }
  const router = useRouter();
  // session?.user
  if (true) {
    return (
      <>
        <div
          className={
            cartItems.length === 0 ? "contain min-h-[1000px]" : "contain min-h-[1000px]"
          }
        >
          {cartItems.length === 0 ? (
            <>
              <div className="flex flex-col gap-y-10 items-center justify-center py-40">
                <span className="block text-2xl">سبد خرید شما خالی است.</span>
                <Link
                  href="/products"
                  className="bg-blue-500 block py-2 px-8 rounded-xl text-white"
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
                      className="border dark:border-zinc-700 bg-white dark:bg-zinc-800 rounded-3xl flex flex-col lg:flex-row lg:items-center justify-between w-full p-4"
                    >
                      <Link
                        href={`/products/${item.slug}`}
                        className="flex item-center"
                      >
                        <Image
                          src={item.image}
                          width={100}
                          height={100}
                          alt={item.title}
                        />
                        <div className="pt-8">
                          <span className="block text-lg">{item.title}</span>
                        </div>
                      </Link>
                      <div className="flex flex-row-reverse justify-between lg:flex-col items-center lg:items-stretch">
                        <span className="p-5 text-right">
                          {item.price.toLocaleString()} تومان
                        </span>
                        <div className="flex items-center gap-x-4 justify-between pl-2 pr-3 py-2 lg:p-2 lg:pr-4 bg-zinc-100 dark:bg-zinc-700 rounded-xl">
                          <span>{item.qty} عدد</span>
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
                <div className="bg-teal-500/20 sticky top-20 rounded-2xl h-40 lg:w-[500px] flex flex-col items-center justify-between p-4">
                  <div className="bg-teal-400 dark:bg-teal-600 text-white w-full mx-10 rounded-xl flex items-center justify-center p-4 text-lg">
                    <span>
                      مبلغ کل :{" "}
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
                    className="rounded-xl bg-teal-400 dark:bg-teal-600 hover:bg-teal-500 dark:hover:bg-teal-500 text-white px-4 py-2 w-full transition-colors"
                    onClick={() => router.push("login?redirect=/shipping")}
                  >
                    تکمیل خرید
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
        <div className="py-52 flex flex-col justify-center items-center gap-y-10 contain">
          <span className="block text-2xl font-[fontd1]">
            لطفا ابتدا به حساب کاربری خود وارد شوید .
          </span>
          <Link
            href="/auth/sign-in"
            className="bg-orange-400 px-10 py-2 rounded-2xl inline-block text-white"
          >
            ورود
          </Link>
        </div>
      </>
    );
  }
}

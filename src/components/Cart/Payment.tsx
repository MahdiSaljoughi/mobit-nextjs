"use client";

import Link from "next/link";
import { Formik, Form } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/src/store/store";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { clearCart } from "@/src/store/cart-slice";

export default function Payment({ orderId }: any) {
  const { data: session } = useSession();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const dispatch = useDispatch();

  const clearCarthandelr = () => {
    dispatch(clearCart());
  };
  if (session?.user) {
    return (
      <>
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
                <div className="flex flex-col gap-y-4 w-full">
                  <div className="w-full border rounded-2xl p-4">
                    <div>
                      <span className="block text-lg mb-2">
                        انتخاب شیوه پرداخت
                      </span>
                      <span className="text-zinc-400 text-sm block mb-6">
                        روش مناسب را جهت پرداخت مبلغ سفارش انتخاب کنید
                      </span>
                      <Formik
                        initialValues={{
                          id: Number(orderId),
                          paymentMethod: "پرداخت آنلاین",
                          amountPaid: String(
                            cartItems.reduce(
                              (acc, cur) => acc + cur.price * cur.quantity,
                              0
                            )
                          ),
                        }}
                        onSubmit={async (values) => {
                          const putPaymentMethod = await axios.put(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
                            values
                          );

                          if (putPaymentMethod?.data.status === 200) {
                            toast.success("روش پرداخت با موفقیت انتخاب شد", {
                              style: {
                                borderRadius: "10px",
                                background: "#333",
                                color: "#fff",
                                fontSize: "12px",
                              },
                            });
                          } else {
                            toast.error(
                              "خطا لطفا مقادیر را به درستی وارد کنید",
                              {
                                style: {
                                  borderRadius: "10px",
                                  background: "#333",
                                  color: "#fff",
                                  fontSize: "12px",
                                },
                              }
                            );
                          }
                        }}
                      >
                        {({ values, setFieldValue }) => (
                          <Form>
                            <div
                              role="group"
                              aria-labelledby="my-radio-group"
                              className="mb-4"
                            >
                              <div className="flex flex-col space-y-4">
                                <div
                                  className="flex items-center bg-blue-500/10 ring-4 ring-blue-500/50 p-4 rounded-xl transition-transform transform hover:scale-105 cursor-pointer"
                                  onClick={() =>
                                    setFieldValue(
                                      "paymentMethod",
                                      "پرداخت آنلاین"
                                    )
                                  }
                                >
                                  <div className="w-5 h-5 border-2 border-blue-500 rounded-full flex items-center justify-center ml-2">
                                    <div
                                      className={`w-3 h-3 rounded-full ${
                                        values.paymentMethod === "پرداخت آنلاین"
                                          ? "bg-blue-500"
                                          : "bg-transparent"
                                      }`}
                                    ></div>
                                  </div>
                                  <span className="text-lg">پرداخت آنلاین</span>
                                </div>
                                <div
                                  className="flex items-center bg-red-500/10 ring-4 ring-red-500/50 p-4 rounded-xl transition-transform transform hover:scale-105 cursor-pointer"
                                  onClick={() =>
                                    setFieldValue(
                                      "paymentMethod",
                                      "پرداخت درب منزل"
                                    )
                                  }
                                >
                                  <div className="w-5 h-5 border-2 border-red-500 rounded-full flex items-center justify-center ml-2">
                                    <div
                                      className={`w-3 h-3 rounded-full ${
                                        values.paymentMethod ===
                                        "پرداخت درب منزل"
                                          ? "bg-red-500"
                                          : "bg-transparent"
                                      }`}
                                    ></div>
                                  </div>
                                  <span className="text-lg">
                                    پرداخت درب منزل
                                  </span>
                                </div>
                              </div>
                              <div className="mt-4 text-gray-700 ">
                                انتخاب شده: {values.paymentMethod}
                              </div>
                            </div>

                            <button
                              type="submit"
                              className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white p-2.5 w-full transition-colors text-center"
                            >
                              انتخاب
                            </button>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-zinc-100 sticky top-24 rounded-2xl lg:w-96 flex flex-col gap-y-4 justify-between p-4 mb-20 lg:mb-0">
                    <span className="text-zinc-500 block">اطلاعات پرداخت</span>
                    <div className="flex items-center justify-between w-full text-sm">
                      <span className="block">مبلغ کالاها</span>
                      <span>
                        {cartItems
                          .reduce(
                            (acc, cur) => acc + cur.price * cur.quantity,
                            0
                          )
                          .toLocaleString()}

                        <span className="text-zinc-500 text-xs mr-0.5">
                          تومان
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <span className="block text-sm">هزینه ارسال</span>
                      <span className="block">رایگان</span>
                    </div>
                    <div className="w-full flex items-center justify-between border-t pt-4">
                      <span className="text-sm">مبلغ قابل پرداخت :</span>
                      <span>
                        {cartItems
                          .reduce(
                            (acc, cur) => acc + cur.price * cur.quantity,
                            0
                          )
                          .toLocaleString()}
                        <span className="text-zinc-500 text-xs mr-0.5">
                          تومان
                        </span>
                      </span>
                    </div>
                    <Link
                      href={"/dashbord/order"}
                      onClick={clearCarthandelr}
                      className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white p-2.5 w-full transition-colors text-center"
                    >
                      پرداخت و تایید نهایی سفارش
                    </Link>
                  </div>
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
        <div className="min-h-screen">
          <div className="fixed inset-0 flex flex-col justify-center items-center gap-y-10 contain">
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
        </div>
      </>
    );
  }
}

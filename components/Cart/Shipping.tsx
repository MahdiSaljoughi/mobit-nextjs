"use client";

import Link from "next/link";
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";

interface Product {
  productId: number;
  quantity: number;
}

export default function Shipping() {
  const { data: session } = useSession();

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const [orderId, setOrderId] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const productMap = cartItems.map((item: any) => ({
      productId: item.id,
      quantity: item.quantity,
    }));
    setProducts(productMap);
  }, [cartItems]);

  const customerId = session?.user.id;
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
                      <span className="block text-lg">آدرس تحویل سفارش</span>
                      <Formik
                        initialValues={{
                          customerId,
                          statusOrder: "در حال برسی",
                          deliveryAddress: "وارد نشده",
                          paymentMethod: "وارد نشده",
                          amountPaid: String(
                            cartItems.reduce(
                              (acc, cur) => acc + cur.price * cur.quantity,
                              0
                            )
                          ),
                        }}
                        validationSchema={Yup.object({
                          deliveryAddress:
                            Yup.string().required("آدرس الزامی است."),
                        })}
                        onSubmit={async (values, { setSubmitting }) => {
                          setSubmitting(false);

                          const postAddress = await axios.post(
                            `${process.env.NEXT_PUBLIC_BASE_URL}/api/order`,
                            values
                          );

                          const orderId = postAddress.data.orderId;
                          setOrderId(orderId);

                          if (postAddress?.data.status === 201) {
                            await Promise.all(
                              products.map(async (product) => {
                                await axios.post(
                                  `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/order-product`,
                                  {
                                    orderId,
                                    productId: product.productId,
                                    quantity: product.quantity,
                                  }
                                );
                              })
                            );

                            toast.success("آدرس و سفارش شما با موفقیت ثبت شد", {
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
                        <Form className="w-full mx-auto flex flex-col gap-y-5">
                          <label htmlFor="deliveryAddress">آدرس</label>
                          <Field
                            name="deliveryAddress"
                            type="text"
                            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-4 ring-blue-500/50"
                          />
                          <ErrorMessage
                            name="deliveryAddress"
                            component="div"
                            className="text-rose-500"
                          />
                          <button
                            type="submit"
                            className="bg-blue-500 rounded-xl px-10 py-3 text-white text-sm"
                          >
                            ثبت آدرس
                          </button>
                        </Form>
                      </Formik>
                    </div>
                  </div>
                  <div className="w-full border rounded-2xl">
                    <div className="border-b p-4 flex flex-col gap-y-4">
                      <span className="block text-lg">
                        نحوه ارسال توسط مبیت
                      </span>
                      <span className="block text-xs text-zinc-500 leading-6">
                        سفارش شما تا ساعت 12 روزهای کاری تحویل پست میگردد، لازم
                        به ذکر است سفارش بسته به مقصد مورد نظر از یک تا پنج روز
                        کاری به دست شما میرسد.
                      </span>
                      <span className="text-sm">هزینه ارسال : رایگان</span>
                    </div>
                    <div className="p-4">
                      <div className="flex flex-col lg:flex-row gap-y-4 lg:items-center justify-between mb-4">
                        <div className="flex items-center gap-x-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 24 24"
                            className="text-zinc-300"
                          >
                            <path
                              fill="currentColor"
                              d="M21.6 11.22L17 7.52V5a1.91 1.91 0 0 0-1.81-2H3.79A1.91 1.91 0 0 0 2 5v10a2 2 0 0 0 1.2 1.88a3 3 0 1 0 5.6.12h6.36a3 3 0 1 0 5.64 0h.2a1 1 0 0 0 1-1v-4a1 1 0 0 0-.4-.78M20 12.48V15h-3v-4.92ZM7 18a1 1 0 1 1-1-1a1 1 0 0 1 1 1m12 0a1 1 0 1 1-1-1a1 1 0 0 1 1 1"
                            />
                          </svg>
                          <span className="text-sm text-zinc-600">
                            سفارش شما توسط مبیت ارسال خواهد شد
                          </span>
                        </div>
                        <div className="flex items-center gap-x-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.5em"
                            height="1.5em"
                            viewBox="0 0 24 24"
                            className="text-blue-500"
                          >
                            <path
                              fill="currentColor"
                              d="M21.6 11.22L17 7.52V5a1.91 1.91 0 0 0-1.81-2H3.79A1.91 1.91 0 0 0 2 5v10a2 2 0 0 0 1.2 1.88a3 3 0 1 0 5.6.12h6.36a3 3 0 1 0 5.64 0h.2a1 1 0 0 0 1-1v-4a1 1 0 0 0-.4-.78M20 12.48V15h-3v-4.92ZM7 18a1 1 0 1 1-1-1a1 1 0 0 1 1 1m12 0a1 1 0 1 1-1-1a1 1 0 0 1 1 1"
                            />
                          </svg>
                          <span className="text-sm text-zinc-600">
                            ارسال عادی
                          </span>
                        </div>
                        <div className="flex items-center gap-x-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="1.4em"
                            height="1.4em"
                            viewBox="0 0 16 16"
                            className="text-zinc-300"
                          >
                            <path
                              fill="currentColor"
                              fillRule="evenodd"
                              d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14m.75-10.5a.75.75 0 0 0-1.5 0V8a.75.75 0 0 0 .3.6l2 1.5a.75.75 0 1 0 .9-1.2l-1.7-1.275z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span className="text-sm text-zinc-600">
                            آماده ارسال
                          </span>
                        </div>
                      </div>
                      <div className="relative flex items-center">
                        {cartItems.map((item: any) => (
                          <div key={item.id}>
                            <Link href={`/products/${item.slug}`}>
                              <Image
                                src={item.image}
                                width={80}
                                height={80}
                                alt={item.title}
                              />
                            </Link>
                            <div className="bg-blue-500 text-zinc-100 p-2.5 size-2 text-[10px] rounded-full flex items-center justify-center absolute bottom-0">
                              {item.quantity}
                            </div>
                          </div>
                        ))}
                      </div>
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
                      href={`/payment/${orderId}`}
                      className="rounded-xl bg-blue-500 hover:bg-blue-600 text-white p-2.5 w-full transition-colors text-center"
                    >
                      ادامه
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

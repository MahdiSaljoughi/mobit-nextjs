"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function Shipping() {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <>
        <div className="contain min-h-[900px] flex flex-col gap-y-10">
          <span className="block">انتخاب روش پرداخت و زمان ارسال</span>
          <Link
            href={"/payment"}
            className="block bg-blue-500 text-white p-4 rounded-2xl text-center"
          >
            ثبت سفارش و نهایی کردن
          </Link>
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

"use client";

import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  userName: string;
}

interface Order {
  id: number;
  customerId: number;
  statusOrder: string;
  paymentMethod: string;
  amountPaid: number;
  orderDate: string;
  deliveryAddress: string;
}

export default function Order({ order }: { order: Order }) {
  const [user, setUser] = useState<User | null>(null); // نوع user را مشخص کنید

  const ordersFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`
      );
      const data: User[] = JSON.parse(response.data.users);
      const foundUser = data.find((x) => x.id === order.customerId);
      setUser(foundUser || null); // اگر کاربر پیدا نشد، null را تنظیم کنید
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("خطا در دریافت اطلاعات کاربر");
    }
  };

  useEffect(() => {
    ordersFetch();
  }, []);

  const router = useRouter();

  const handelDeleteOrder = async () => {
    toast.success("سفارش با موفقیت حذف شد", {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
        fontSize: "12px",
      },
    });

    router.replace("/dashbord/order");

    setInterval(() => window.location.reload(), 2000);
  };

  return (
    <>
      <div className="p-4">
        <img
          src="/images/logos/mobit.png"
          alt="logo-mobit"
          className="w-40 mx-auto"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={handelDeleteOrder}
            className="text-red-500 bg-red-500/30 px-6 py-2 rounded-xl flex items-center gap-x-2 hover:ring-4 ring-red-500/50 transition-all"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
              />
            </svg>
            <span>حذف سفارش</span>
          </button>
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
        <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl text-zinc-100">
          <table className="w-full">
            <thead>
              <tr className="text-blue-500 text-xs md:text-base text-center">
                <td>کد</td>
                <td>نام کاربری مشتری</td>
                <td>کد مشتری</td>
                <td>وضعیت</td>
                <td>روش پرداخت</td>
                <td>مبلغ پرداختی</td>
                <td>محصولات</td>
                <td>تاریخ</td>
              </tr>
            </thead>
            <tbody className="w-full">
              <tr className="text-center">
                <td className="p-4">{order.id}</td>
                <td>
                  {user ? (
                    <Link
                      href={`/dashbord/user/${user.id}`}
                      className="text-blue-400 hover:text-blue-500 transition-colors"
                    >
                      <span>{user.userName}</span>
                    </Link>
                  ) : (
                    <span>کاربر پیدا نشد</span>
                  )}
                </td>
                <td>{order.customerId}</td>
                <td>{order.statusOrder}</td>
                <td>{order.paymentMethod}</td>
                <td>{order.amountPaid}</td>
                <td>
                  <Link
                    href={`/dashbord/order/product-order/${order.id}`}
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
                <td>{order.orderDate}</td>
              </tr>
            </tbody>
          </table>
          <div className="p-4 m-4 border border-zinc-700 rounded-2xl">
            <div className="flex items-center gap-x-2">
              <span className="block">آدرس :</span>
              <p>{order.deliveryAddress}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

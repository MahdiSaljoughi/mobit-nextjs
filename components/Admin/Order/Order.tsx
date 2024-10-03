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
  const [user, setUser] = useState<User | null>(null);

  const ordersFetch = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/user`
      );
      const data: User[] = JSON.parse(response.data.users);
      const foundUser = data.find((x) => x.id === order.customerId);
      setUser(foundUser || null);
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
        <div className="py-4 md:py-8 rounded-2xl bg-zinc-100">
          <table className="w-full">
            <thead>
              <tr className="text-blue-500 text-xs md:text-base text-center">
                <td>کد</td>
                <td>نام کاربری مشتری</td>
                <td>کد مشتری</td>
                <td>وضعیت</td>
                <td>مبلغ پرداختی</td>
                <td>روش پرداخت</td>
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
                <td>{order.amountPaid ? order.amountPaid : "-"}</td>
                <td>{order.paymentMethod ? order.paymentMethod : "-"}</td>
                <td>{order.orderDate}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 bg-blue-500/10 p-8 rounded-2xl">
          <div className="flex items-center gap-x-1 mb-4">
            <span>زمان ارسال :</span>
            {/* <p>{order.deliveryDate}</p> */}
          </div>
          <span className="block mb-4">آدرس :</span>
          <p className="mx-4 leading-7">{order.deliveryAddress}</p>
        </div>
      </div>
    </>
  );
}

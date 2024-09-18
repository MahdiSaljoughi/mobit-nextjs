import ProductOrder from "@/components/Admin/Order/ProductOrder";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import React from "react";

export default async function page({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);
  
  if (session?.user.role === "ADMIN") {
    return (
      <>
        <div className="min-h-screen bg-zinc-900">
          <ProductOrder ordersId={Number(params.id)} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-h-[900px] flex flex-col gap-y-4 items-center justify-center">
          <div>
            <span>404</span>
            <span>چنین صفحه ای پیدا نشد!</span>
          </div>
          <Link href="/" className="block text-blue-500">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </>
    );
  }
}

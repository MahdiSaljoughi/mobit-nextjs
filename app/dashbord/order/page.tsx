import AdminOrder from "@/components/Admin/Order/Order";
import AdminProducst from "@/components/Admin/Product/ProductList";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user.role === "ADMIN") {
    return (
      <>
        <div className="py-6 bg-blue-500 text-center text-white">
          <span>سفارشات</span>
        </div>
        <div className="min-h-screen p-4 pb-20 lg:p-4">
          <AdminOrder />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="min-h-[900px] flex flex-col gap-y-4 items-center justify-center">
          <span>سفارشات من</span>
          <Link href="/" className="block text-blue-500">
            بازگشت به صفحه اصلی
          </Link>
        </div>
      </>
    );
  }
}

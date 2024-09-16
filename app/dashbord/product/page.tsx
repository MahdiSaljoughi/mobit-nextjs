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
          <span>محصولات موجود</span>
        </div>
        <div className="min-h-screen p-4 pb-20 lg:p-8 bg-zinc-900">
          <AdminProducst />
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

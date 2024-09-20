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
          <span>محصولات</span>
        </div>
        <div className="min-h-screen p-4 pb-10 lg:pt-0 bg-zinc-900">
          <div className="p-4">
            <img
              src="/images/logos/mobit.png"
              alt="logo-mobit"
              className="w-40 mx-auto"
            />
          </div>
          <div className="flex items-center justify-end mb-4">
            <Link
              href={"/dashbord"}
              className="flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
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

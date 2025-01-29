import AdminOrderList from "@/src/components/Admin/Order/OrderList";
import Orders from "@/src/components/OrderUser/Orders";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    if (session?.user.role === "ADMIN") {
      return (
        <>
          <div className="py-6 bg-blue-500 text-center text-white">
            <span>سفارشات</span>
          </div>
          <div className="min-h-screen p-4">
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
            <AdminOrderList />
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="min-h-[900px]">
            <div className="bg-blue-600 m-3 lg:m-6 rounded-2xl">
              <img
                src="/images/logos/mobit.png"
                alt="logo-mobit"
                className="w-28 mx-auto"
              />
            </div>
            <div className="mx-3 lg:mx-auto lg:container">
              <div className="flex items-center justify-between mb-4">
                <span className="block text-blue-500">سفارشات من</span>
                <Link
                  href={"/dashbord"}
                  className="flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
                >
                  <span className="hidden lg:block">بازگشت</span>
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
              <Orders userId={session?.user.id} />
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="min-h-screen flex flex-col justify-center items-center gap-y-10 contain fixed inset-0">
          <span className="block text-xl text-center">
            لطفا ابتدا به حساب کاربری خود وارد شوید.
          </span>
          <Link
            href="/sign-in"
            className="bg-blue-500 px-10 py-2 rounded-2xl inline-block text-white"
          >
            ورود
          </Link>
        </div>
      </>
    );
  }
}

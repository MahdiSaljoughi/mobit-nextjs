import AdminUser from "@/components/Admin/User/User";
import { authOptions } from "@/lib/auth";
import prismadb from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);

  const user = await prismadb.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });

  if (session?.user.role === "ADMIN") {
    if (!user) {
      return (
        <div className="min-h-[900px] flex items-center justify-center">
          <span className="block text-2xl text-red-400">کاربر یافت نشد!</span>
        </div>
      );
    } else {
      return (
        <>
          <div className="min-h-screen">
            <AdminUser user={user} />
          </div>
        </>
      );
    }
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

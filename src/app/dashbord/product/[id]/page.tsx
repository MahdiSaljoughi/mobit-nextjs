import AdminProducst from "@/src/components/Admin/Product/Product";
import { authOptions } from "@/src/lib/auth";
import prismadb from "@/src/lib/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";

export default async function page({ params }: { params: { id: number } }) {
  const session = await getServerSession(authOptions);

  const product = await prismadb.product.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (session?.user.role === "ADMIN") {
    if (!product) {
      return (
        <div className="min-h-[900px] flex items-center justify-center">
          <span className="block text-2xl text-red-400">کالا یافت نشد!</span>
        </div>
      );
    } else {
      return (
        <>
          <AdminProducst product={product} />
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

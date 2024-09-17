import AdminUser from "@/components/Admin/User/User";
import prismadb from "@/lib/prisma";

export default async function page({ params }: { params: { id: number } }) {
  const user = await prismadb.user.findUnique({
    where: {
      id: Number(params.id),
    },
  });
  if (!user) {
    return (
      <div className="min-h-[900px] flex items-center justify-center">
        <span className="block text-2xl text-red-400">کاربر یافت نشد!</span>
      </div>
    );
  } else {
    return (
      <>
        <div className="bg-zinc-900 min-h-screen">
          <AdminUser user={user} />
        </div>
      </>
    );
  }
}

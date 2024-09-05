import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import FormAddProduct from "@/components/Forms/FormAddProduct";
import FormAddUser from "@/components/Forms/FormAddUser";
import AdminProducst from "@/components/Admin/Product/Product";
import AdminUser from "@/components/Admin/User/User";

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session?.user.role === "ADMIN") {
      return (
        <>
          <div className="min-h-screen contain">
            <div className="border dark:border-zinc-700 rounded-3xl p-4 md:p-8 flex flex-col gap-y-10 md:gap-y-20 bg-white dark:bg-zinc-800">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <span className="block text-lg md:text-2xl font-[fontm1]">
                    پنل ادمین
                  </span>
                  <LogoutButton />
                </div>
                <span className="block text-center font-[fontd1] md:text-lg">{`ادمین ${session?.user.username} عزیز خوش آمدید.`}</span>
              </div>
              <div>
                <AdminProducst />
              </div>
              <div>
                <FormAddProduct id={session.user.id} />
              </div>
              <div>
                <AdminUser />
              </div>
              <div>
                <FormAddUser />
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="min-h-screen contain">
            <div className="border dark:border-zinc-700 rounded-3xl p-4 md:p-8 flex flex-col gap-y-10 md:gap-y-20 bg-white dark:bg-zinc-800">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <span className="block text-lg md:text-2xl font-[fontm1]">
                    پنل کاربری
                  </span>
                  <LogoutButton />
                </div>
                <span className="block text-center font-[fontd1] md:text-lg">{`${session?.user.username} عزیز خوش آمدید.`}</span>
                <div className="h-screen"></div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="py-52 flex flex-col justify-center items-center gap-y-10 contain">
          <span className="block text-2xl font-[fontd1]">
            لطفا ابتدا به حساب کاربری خود وارد شوید .
          </span>
          <Link
            href="/auth/sign-in"
            className="bg-orange-400 px-10 py-2 rounded-2xl inline-block text-white"
          >
            ورود
          </Link>
        </div>
      </>
    );
  }
}

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
    if (session?.user.rule === "ADMIN") {
      return (
        <div className="bg-zinc-900 text-zinc-300">
          <div className="min-h-screen p-4 pb-20 lg:p-4">
            <div className="flex flex-col gap-y-10">
              <div>
                <div className="flex items-center justify-between mb-8 md:mb-4">
                  <span className="block text-lg md:text-2xl">پنل ادمین</span>
                  <LogoutButton />
                </div>
                <span className="block md:text-lg text-center md:text-right">{`ادمین ${session?.user.username} عزیز خوش آمدید.`}</span>
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
        </div>
      );
    } else {
      return (
        <>
          <div className="min-h-screen contain">
            <div className="border dark:border-zinc-700 rounded-3xl p-4 md:p-8 flex flex-col gap-y-10 md:gap-y-20 bg-white dark:bg-zinc-800">
              <div>
                <div className="flex items-center justify-between mb-10">
                  <span className="block text-lg md:text-2xl">پنل کاربری</span>
                  <LogoutButton />
                </div>
                <span className="block text-center md:text-lg">{`${session?.user.username} عزیز خوش آمدید.`}</span>
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
        <div className="min-h-[1000px] flex flex-col justify-center items-center gap-y-10 contain">
          <span className="block text-2xl">
            لطفا ابتدا به حساب کاربری خود وارد شوید .
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

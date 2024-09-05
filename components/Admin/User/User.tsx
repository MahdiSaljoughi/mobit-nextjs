import Image from "next/image";
import Prisma from "@/lib/prisma";
import { EditUser } from "@/components/Edit/EditUser";

export default async function AdminUser() {
  const users = await Prisma.user.findMany();

  return (
    <>
      <div className="border dark:border-zinc-700 bgwhite py-10 rounded-3xl w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-orange-400">
              {/* <th>تصویر</th> */}
              <th>شماره</th>
              <th>نام کاربری</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>سطح دسترسی</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.map((user, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "text-center"
                    : "text-center bg-orange-400/20"
                }
              >
                {/* <td className="flex items-center justify-center">
                  <Image
                    src={user.image}
                    width={60}
                    height={60}
                    alt={user.email}
                  />
                </td> */}
                <td className="p-4">{user.id}</td>
                <td>{user.user_name ? user.user_name : "وارد نشده"}</td>
                <td>{user.email}</td>
                <td>{user.phone ? user.phone : "وارد نشده"}</td>
                <td>{user.role}</td>
                <td>
                  <EditUser />
                </td>
                <td>حذف</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

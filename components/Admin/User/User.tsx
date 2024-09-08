import Prisma from "@/lib/prisma";
import { EditUser } from "@/components/Edit/EditUser";

export default async function AdminUser() {
  const users = await Prisma.user.findMany();

  return (
    <>
      <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-blue-500">
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
                  index % 2 === 0 ? "text-center" : "text-center bg-blue-500/20"
                }
              >
                <td className="p-4">{user.id}</td>
                <td>{user.user_name ? user.user_name : "وارد نشده"}</td>
                <td>{user.email}</td>
                <td>{user.phone ? user.phone : "وارد نشده"}</td>
                <td>{user.rule}</td>
                <td>
                  <EditUser />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

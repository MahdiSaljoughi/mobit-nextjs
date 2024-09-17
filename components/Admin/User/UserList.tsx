import Prisma from "@/lib/prisma";
import Link from "next/link";
import FormAddUser from "@/components/Forms/FormAddUser";

export default async function AdminUserList() {
  const users = await Prisma.user.findMany();

  return (
    <>
      <div className="mb-4">
        <FormAddUser />
      </div>
      <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl w-full text-zinc-100">
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
                <td>{user.userName ? user.userName : "وارد نشده"}</td>
                <td>{user.email ? user.email : "وارد نشده"}</td>
                <td>{user.phone ? user.phone : "وارد نشده"}</td>
                <td>{user.role}</td>
                <td>
                  {/* <EditUser /> */}
                  <Link
                    href={`/dashbord/user/${user.id}`}
                    className="flex- 1 flex justify-center hover:scale-110 transition-transform"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.5em"
                      height="1.5em"
                      viewBox="0 0 24 24"
                    >
                      <g fill="none" stroke="currentColor" strokeWidth="2">
                        <path
                          d="M3.275 15.296C2.425 14.192 2 13.639 2 12c0-1.64.425-2.191 1.275-3.296C4.972 6.5 7.818 4 12 4s7.028 2.5 8.725 4.704C21.575 9.81 22 10.361 22 12c0 1.64-.425 2.191-1.275 3.296C19.028 17.5 16.182 20 12 20s-7.028-2.5-8.725-4.704Z"
                          opacity="0.5"
                        />
                        <path d="M15 12a3 3 0 1 1-6 0a3 3 0 0 1 6 0Z" />
                      </g>
                    </svg>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

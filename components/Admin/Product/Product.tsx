import Image from "next/image";
import Link from "next/link";
import Prisma from "@/lib/prisma";
import { EditUser } from "@/components/Edit/EditUser";

export default async function AdminProducst() {
  const products = await Prisma.product.findMany();
  return (
    <>
      <div className="border dark:border-zinc-700 bgwhite py-10 rounded-3xl w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-orange-400">
              <th>تصویر</th>
              <th>شماره</th>
              <th>عنوان</th>
              <th>ایجاد شده توسط</th>
              <th>اسلاگ</th>
              <th>موجودی</th>
              <th>دسته بندی</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {products.map((product, index) => (
              <tr
                key={index}
                className={
                  index % 2 === 0
                    ? "text-center"
                    : "text-center bg-orange-400/20"
                }
              >
                <td className="flex items-center justify-center">
                  <Image
                    src={product.image}
                    width={60}
                    height={60}
                    alt={product.title}
                  />
                </td>
                <td className="p-4">{product.id}</td>
                <td className="text-orange-300 hover:text-orange-400 transition-colors">
                  <Link href={`/products/${product.slug}`}>
                    {product.title}
                  </Link>
                </td>
                <td>کاربر شماره {product.createBy}</td>
                <td>{product.slug}</td>
                <td>{product.count}</td>
                <td>{product.cat}</td>
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

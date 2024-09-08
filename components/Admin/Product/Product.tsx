import Image from "next/image";
import Link from "next/link";
import Prisma from "@/lib/prisma";
import { EditUser } from "@/components/Edit/EditUser";

export default async function AdminProducst() {
  const products = await Prisma.product.findMany();
  return (
    <>
      <div className="border border-zinc-700 py-4 md:py-8 rounded-3xl w-full overflow-auto">
        <table className="w-full">
          <thead>
            <tr className="text-blue-500 text-xs md:text-base">
              <th>تصویر</th>
              <th>شماره</th>
              <th className="hidden xl:table-cell">عنوان</th>
              <th className="hidden xl:table-cell">ایجاد شده توسط</th>
              <th className="hidden xl:table-cell">اسلاگ</th>
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
                    : "text-center bg-blue-400/20"
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
                <td className="text-blue-500 hover:text-blue-400 transition-colors hidden xl:table-cell">
                  <Link href={`/products/${product.slug}`}>
                    {product.title}
                  </Link>
                </td>
                <td className="hidden xl:table-cell">{product.createdBy}</td>
                <td className="hidden xl:table-cell">{product.slug}</td>
                <td>{product.count}</td>
                <td className="text-xs md:text-base">{product.cat}</td>
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

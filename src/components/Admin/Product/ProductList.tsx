import Image from "next/image";
import Link from "next/link";
import FormAddProduct from "@/src/components/Forms/FormAddProduct";
import { authOptions } from "@/src/lib/auth";
import { getServerSession } from "next-auth";

export default async function AdminProducst() {
  const session = await getServerSession(authOptions);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`,
    {
      cache: "no-store",
    }
  );
  const data = await response.json();
  const products = data.products;

  return (
    <>
      <div className="mb-4">
        <FormAddProduct userName={session?.user.username} />
      </div>
      <div className="border rounded-3xl w-full overflow-auto">
        <div className="flex items-center w-full justify-between p-4 text-blue-500">
          <span className="flex- 1 text-center mr-4">کد</span>
          <span className="flex- 1 text-center mr-6">تصویر</span>
          <span className="flex-1 text-center">عنوان</span>
          <span className="flex-1 text-center">قیمت</span>
          <span className="flex-1 text-center">موجودی</span>
          <span className="flex-1 text-center">ایجاد شده توسط</span>
          <span className="flex-1 text-center">تاریخ</span>
          <span className="flex-1 text-center">زمان</span>
          <span className="flex- 1 text-center">جزئیات</span>
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          {products.map((product: any, index: any) => (
            <div
              key={index}
              className={
                index % 2 === 0
                  ? "flex items-center justify-between w-full py-3 px-4 md:px-8 gap-x-4"
                  : "flex items-center justify-between w-full bg-blue-500/10 py-3 px-4 md:px-8 gap-x-4"
              }
            >
              <span className="flex- 1 text-center">{product.id}</span>
              <div className="flex- 1 flex justify-center">
                <Image
                  src={product.image}
                  width={60}
                  height={60}
                  alt={product.title}
                />
              </div>
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 text-center text-blue-500 hover:text-blue-400 transition-colors hidden xl:block text-sm"
              >
                {product.title}
              </Link>
              <div className="flex-1 text-center">
                {product.price.toLocaleString()}
              </div>
              <div className="flex-1 text-center">{product.count}</div>
              <div className="flex-1 text-center">{product.created_by}</div>
              <div className="flex-1 text-center">{product.created_at}</div>
              <div className="flex-1 text-center">{product.created_at}</div>
              <Link
                href={`/dashbord/product/${product.id}`}
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
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

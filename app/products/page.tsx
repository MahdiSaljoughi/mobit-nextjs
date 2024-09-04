import Product from "@/components/Product/Product";
import Prisma from "@/lib/prisma";

export default async function ProducstPage() {
  const products = await Prisma.product.findMany();

  return (
    <>
      <div className="min-h-screen w-full">
        <div className="w-full bg-slate-400">صفحه محصولات</div>
        <div className="contain">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xs:gap-x-3 sm:gap-x-6 md:gap-x-10">
            {products.map((product, index) => (
              <div key={index} className="w-full">
                <Product item={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

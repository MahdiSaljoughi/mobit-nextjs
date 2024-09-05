import Product from "@/components/Product/Product";
import Prisma from "@/lib/prisma";

export default async function ProducstPage() {
  const products = await Prisma.product.findMany();

  return (
    <>
      <div className="w-full">
        <div className="contain">
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xs:gap-3 sm:gap-6 md:gap-10">
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

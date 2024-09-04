import Prisma from "@/lib/prisma";
import Image from "next/image";

export default async function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await Prisma.product.findFirst({
    where: {
      slug: params.slug,
    },
  });
  // product not found
  if (!product) {
    return (
      <div>
        <span>کالا یافت نشد!</span>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen contain">
        <div className="flex flex-col md:flex-row justify-between bg-slate-600 p-20 rounded-3xl h-[1000px]">
          <div className="flex flex-col md:flex-row justify-center gap-x-10">
            {/* image */}
            <div>
              <Image
                src={product?.image}
                alt={product?.title}
                width={500}
                height={500}
                className="rounded-2xl"
              />
            </div>
            {/* text */}
            <div className="flex flex-col gap-y-10">
              <div>
                <h1 className="font-bold text-3xl">{product?.title}</h1>
              </div>
              <div>
                <p className="font-semibold text-xl">{product?.description}</p>
              </div>
            </div>
          </div>
          {/* price */}
          <div className="w-96 h-[500px] sticky top-32 bg-gray-300 rounded-2xl"></div>
        </div>
        <div className="w-full bg-red-500 h-[500px] mt-10 rounded-3xl"></div>
      </div>
    </>
  );
}

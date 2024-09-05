import Prisma from "@/lib/prisma";
import AddToCart from "@/components/AddToCart/AddToCart";
import CounterProduct from "@/components/CounterProduct/CounterProduct";

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
      <div className="min-h-screen flex items-center justify-center">
        <span className="block text-3xl text-red-400">کالا یافت نشد!</span>
      </div>
    );
  } else {
    return (
      <>
        <div className="contain">
          <div className="lg:flex justify-between lg:gap-x-8">
            <div className="border dark:border-zinc-700 bg-white dark:bg-zinc-800 w-full p-4 rounded-2xl">
              <div className="flex flex-col gap-y-4 md:gap-8">
                <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                  <div className="rounded-xl bg-zinc-100 dark:bg-zinc-700 w-full md:max-w-96">
                    <div className="w-full max-w-96 mx-auto">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="rounded-2xl w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4 w-full">
                    <h1 className="font-[fontd1] md:text-xl lg:text-2xl line-clamp-2">
                      {product?.title}
                    </h1>
                    <span className="w-full h-[1px] bg-zinc-200 dark:bg-zinc-700"></span>
                    <span className="font-[fontd3]">{`دسته بندی : ${product.cat}`}</span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-10">
                  <div>
                    <span className="md:text-xl block mb-4">معرفی محصول</span>
                    <p className="textcenter w-full leading-7 font-[fontd3]">
                      {product?.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-96 lg:h-36 bg-white border dark:border-zinc-700 dark:bg-zinc-800 lg:rounded-2xl py-4 px-2 md:p-4 fixed bottom-0 inset-x-0 lg:sticky lg:top-20">
              {product.count > 0 ? (
                <div className="flex flex-row-reverse md:flex-col gap-3 items-center justify-between">
                  <div className="flex items-center gap-x-1">
                    <span className="text-lg md:text-xl">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-zinc-400 font-[fontd3]">تومان</span>
                  </div>
                  <span>{`موجودی : ${product.count}`}</span>
                  {/* <CounterProduct /> */}
                  <AddToCart product={product} />
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <div className="text-red-500 text-sm bg-red-400/20 p-1.5 rounded-xl">
                    ناموجود
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }
}

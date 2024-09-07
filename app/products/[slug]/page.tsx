import Prisma from "@/lib/prisma";
import AddToCart from "@/components/AddToCart/AddToCart";
// import CounterProduct from "@/components/CounterProduct/CounterProduct";

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
      <div className="min-h-[900px] flex items-center justify-center">
        <span className="block text-3xl text-red-400">کالا یافت نشد!</span>
      </div>
    );
  } else {
    return (
      <>
        <div className="min-h-[900px] py-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-20">
          <div className="lg:flex justify-between lg:gap-x-8">
            <div className="w-full rounded-2xl">
              <div className="flex flex-col gap-y-4 md:gap-8">
                <div className="flex gap-4 flex-wrap lg:flex-nowrap">
                  <div className="rounded-xl bg-zinc-100 w-full lg:max-w-96">
                    <div className="w-full max-w-96 mx-auto p-8">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="rounded-2xl w-full"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-y-4 w-full">
                    <h1 className="text-sm md:text-base line-clamp-2">
                      {product?.title}
                    </h1>
                    <span className="w-full h-[1px] bg-zinc-200"></span>
                    <span className="text-sm">{`دسته بندی : ${product.cat}`}</span>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row justify-between w-full gap-x-10">
                  <div className="sticky top-20 flex items-center gap-x-2 mb-4 bg-gradient-to-r from-transparent to-green-500/40 py-2 pl80 pr-4 rounded-lg h-10 lg:w-[500px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1.6em"
                      height="1.6em"
                      viewBox="0 0 24 24"
                      className="text-green-600/80"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M2.75 16.401a1.15 1.15 0 0 0 1.16 1.15a16.7 16.7 0 0 1 3.535.333c1.64.204 3.204.81 4.555 1.761V6.442A10.24 10.24 0 0 0 7.445 4.68a16.6 16.6 0 0 0-3.6-.322a1.15 1.15 0 0 0-1.074 1.15zm18.5 0a1.15 1.15 0 0 1-1.16 1.15a16.7 16.7 0 0 0-3.535.333c-1.64.204-3.204.81-4.555 1.761V6.442a10.24 10.24 0 0 1 4.555-1.762a16.6 16.6 0 0 1 3.6-.322a1.15 1.15 0 0 1 1.073 1.15z"
                      />
                    </svg>
                    <span className="text-sm md:text-base">معرفی کالا</span>
                  </div>
                  <div className="w-full">
                    {/* ... */}
                    <p className="textcenter w-full leading-7 font-[iranr] text-sm">
                      {product?.description}
                    </p>
                    {/* ... */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-96 lg:h-36 bg-zinc-100 lg:rounded-2xl py-4 px-2 md:p-4 fixed bottom-0 inset-x-0 lg:sticky lg:top-20">
              {product.count > 0 ? (
                <div className="flex flex-row-reverse md:flex-col gap-3 items-center justify-between">
                  <div className="flex items-center gap-x-1">
                    <span className="text-lg md:text-xl">
                      {product.price.toLocaleString()}
                    </span>
                    <span className="text-zinc-400">تومان</span>
                  </div>
                  <span className="hidden md:block">{`موجودی : ${product.count}`}</span>
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

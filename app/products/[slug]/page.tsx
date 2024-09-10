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
        <div className="min-h-[900px] py-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-20 mb-20 md:mb-40 lg:mb-0">
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
                  <div className="lg:sticky top-24 flex items-center gap-x-2 mb-4 bg-gradient-to-r from-transparent to-green-500/40 py-2 pr-4 rounded-lg h-10 lg:w-72">
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
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        d="M2.75 16.401a1.15 1.15 0 0 0 1.16 1.15a16.7 16.7 0 0 1 3.535.333c1.64.204 3.204.81 4.555 1.761V6.442A10.24 10.24 0 0 0 7.445 4.68a16.6 16.6 0 0 0-3.6-.322a1.15 1.15 0 0 0-1.074 1.15zm18.5 0a1.15 1.15 0 0 1-1.16 1.15a16.7 16.7 0 0 0-3.535.333c-1.64.204-3.204.81-4.555 1.761V6.442a10.24 10.24 0 0 1 4.555-1.762a16.6 16.6 0 0 1 3.6-.322a1.15 1.15 0 0 1 1.073 1.15z"
                      />
                    </svg>
                    <span className="text-sm md:text-base">معرفی کالا</span>
                  </div>
                  <div className="w-full">
                    {/* ... */}
                    <p className="w-full leading-7 font-[iranr] text-sm">
                      {product?.description}
                    </p>
                    {/* ... */}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-[450px] lg:h-56 shadow-black shadow-md lg:shadow-none bg-white lg:bg-zinc-100 lg:rounded-2xl py-4 px-2 md:p-4 fixed bottom-[70px] sm:bottom-[78px] inset-x-0 lg:sticky lg:top-24">
              {product.count > 0 ? (
                <>
                  <div className="flex flex-row-reverse md:flex-col gap-3 gap-y-4 items-center justify-between">
                    <div className="hidden w-full text-[13px] lg:flex flex-col gap-y-4 mb-2">
                      <div className="flex items-center  gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4em"
                          height="2.4em"
                          viewBox="0 0 128 128"
                        >
                          <path
                            fill="#005c8a"
                            d="M21.48 13.03h86.74V128H21.48z"
                          />
                          <path
                            fill="#005c8a"
                            d="M19.3 17.3h91.21v79.87H19.3z"
                          />
                          <path
                            fill="#7792ac"
                            d="M105.83 2.78H22.16c-5.08 0-9.24 4.15-9.24 9.24V128h35.6v-13.36c0-2.83 2.31-5.15 5.14-5.15h20.66c2.84 0 5.16 2.32 5.16 5.15V128h35.6V12.02c-.01-5.08-4.16-9.24-9.25-9.24m-67.68 85.4h-13v-15.7h13zm0-24.96h-13v-15.7h13zm0-24.95h-13v-15.7h13zm21.79 49.91H46.93v-15.7h13.01zm0-24.96H46.93v-15.7h13.01zm0-24.95H46.93v-15.7h13.01zm21.78 49.91h-13v-15.7h13zm0-24.96h-13v-15.7h13zm0-24.95h-13v-15.7h13zm21.79 49.91H90.5v-15.7h13.01zm0-24.96H90.5v-15.7h13.01zm0-24.95H90.5v-15.7h13.01z"
                          />
                        </svg>
                        <span>موجود در انبار مبیت</span>
                      </div>
                      <div className="flex items-center gap-x-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="2.4em"
                          height="2.4em"
                          viewBox="0 0 24 24"
                          className="text-emerald-400"
                        >
                          <path
                            fill="currentColor"
                            d="M3.378 5.082C3 5.62 3 7.22 3 10.417v1.574c0 5.638 4.239 8.375 6.899 9.536c.721.315 1.082.473 2.101.473c1.02 0 1.38-.158 2.101-.473C16.761 20.365 21 17.63 21 11.991v-1.574c0-3.198 0-4.797-.378-5.335c-.377-.537-1.88-1.052-4.887-2.081l-.573-.196C13.595 2.268 12.812 2 12 2s-1.595.268-3.162.805L8.265 3c-3.007 1.03-4.51 1.545-4.887 2.082"
                            opacity="0.5"
                          />
                          <path
                            fill="currentColor"
                            d="M15.06 10.5a.75.75 0 0 0-1.12-1l-3.011 3.374l-.87-.974a.75.75 0 0 0-1.118 1l1.428 1.6a.75.75 0 0 0 1.119 0z"
                          />
                        </svg>
                        <span>گارانتی اصالت کالا و سلامت فیزیکی</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-1 lg:w-full justify-end">
                      <span className="text-lg md:text-xl">
                        {product.price.toLocaleString()}
                      </span>
                      <span className="text-zinc-400 text-sm font-[iranr]">تومان</span>
                    </div>
                    <AddToCart product={product} />
                  </div>
                </>
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

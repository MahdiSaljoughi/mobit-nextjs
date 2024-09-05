import prismadb from "@/lib/prisma";
import Link from "next/link";

export default async function page() {
  const posts = await prismadb.post.findMany();

  return (
    <>
      <div className="contain md:min-h-[500px]">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-10">
          {posts.map((post, index) => (
            <>
              <div
                key={index}
                className="group flex gap-x-2.5 sm:block p-2.5 md:pb-2 bg-white dark:bg-zinc-700 shadow-sha-normal rounded-2xl"
              >
                <div className="relative shrink-0 w-[130px] h-[130px] sm:w-auto sm:h-auto sm:mb-4 rounded-2xl rounded-bl-4xl md:rounded-2xl md:rounded-bl-4xl overflow-hidden">
                  <Link href={`/mag/${post.id}`}>
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full sm:h-auto object-cover md:mx-0 sm:mx-auto"
                    />
                    <div className="absolute inset-0 w-full h-full hidden md:flex-center invisible opacity-0 group-hover:opacity-100 group-hover:visible bg-gradient-to-r from-orange-200/50 to-orange-300/80 transition-all delay-75">
                      <img src="/logo.svg" alt="logo" className="w-1/2" />
                    </div>
                  </Link>
                </div>
                <div className="w-full flex flex-col sm:flex-row items-start justify-between">
                  <Link
                    href={`/mag/${post.id}`}
                    className="mr-0 md:mr-0 sm:mr-3 ml-1.5 sm:ml-0 font-DanaMedium md:font-Dana mt-2.5 sm:mt-0 text-sm/7 md:text-lg max-w-[193px] line-clamp-2 text-zinc-700 dark:text-white"
                  >
                    {post.title}
                  </Link>
                  <div className="hidden sm:flex gap-5">
                    <span className="hidden lg:block w-px h-[61px] bg-gray-100 dark:bg-white/10"></span>
                    <div className="flex flex-col ml-[12px] lg:ml-[18px] -mt-1 text-teal-600 dark:text-emerald-500 text-sm text-left">
                      <span className="font-DanaDemiBold md:text-xl lg:text-2xl">
                        21
                      </span>
                      <span>مرداد</span>
                      <span>1402</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between w-full sm:hidden border-t border-t-gray-100 dark:border-t-white/10 pt-[18px] pb-1.5">
                    <span className="text-teal-600 dark:text-emerald-500 text-xs">
                      21 مرداد 1402
                    </span>
                    <Link
                      href={`/mag/${post.id}`}
                      className="flex items-center gap-x-1 ml-1.5 font-DanaMedium text-xs h-6 rounded-md pr-2.5 pl-2 bg-orange-200/30 text-orange-300"
                    >
                      مطالعه
                    </Link>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

import Link from "next/link";
import { Curosel } from "@/src/components/Curosel/Curosel";
import Item8 from "@/src/components/Item8/Item8";
import Carosel from "@/src/components/Product/Carosel";
import MainFooter from "@/src/components/Footer/MainFooter";

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/product`,
    { cache: "no-store" }
  );

  const data = await response.json();
  const product = data.products;

  return (
    <>
      <main className="min-h-screen flex flex-col gap-y-2">
        <Curosel />
        <section className="py-10 mx-2 sm:mx-4 md:mx-6 lg:mx-8 xl:mx-10 2xl:mx-32 flex flex-col gap-y-10">
          <Item8 />

          <div>
            <Link href="/" className="block">
              <p className="w-full rounded-2xl bg-red-400 text-center py-4 text-white">
                پیشنهاد ویژه مبیت
              </p>
            </Link>
            {/* <Carosel product={product} /> */}
          </div>

          <div className="flex flex-col md:flex-row gap-x-2">
            <Link href="/" className="block">
              <img src="/images/poster-w-home-1.webp" alt="img" />
            </Link>
            <Link href="/" className="block">
              <img src="/images/poster-w-home-2.webp" alt="img" />
            </Link>
          </div>

          <div>
            <Link href="/" className="block">
              <p className="w-full rounded-2xl bg-zinc-100 p-4">
                پربازدید های ماه
              </p>
            </Link>
            {/* <Carosel product={product} /> */}
          </div>

          <div className="flex flex-col md:flex-row gap-2 items-center w-full">
            <Link href="/" className="block">
              <img src="/images/4img1.jpg" alt="img" />
            </Link>
            <Link href="/" className="block">
              <img src="/images/4img2.jpg" alt="img" />
            </Link>
            <Link href="/" className="block">
              <img src="/images/4img3.jpg" alt="img" />
            </Link>
            <Link href="/" className="block">
              <img src="/images/4img4.jpg" alt="img" />
            </Link>
          </div>

          <div>
            <Link href="/" className="block">
              <p className="w-full rounded-2xl bg-zinc-100 p-4">
                جدید ترین محصولات
              </p>
            </Link>
            {/* <Carosel product={product} /> */}
          </div>
        </section>
      </main>
      <MainFooter />
    </>
  );
}

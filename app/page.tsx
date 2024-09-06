import { Curosel } from "@/components/Curosel/Curosel";
import Item8 from "@/components/Item8/Item8";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-[900px] flex flex-col gap-y-2">
        <Curosel />
        <section className="contain flex flex-col gap-y-8">
          <Item8 />

          <Link href="/" className="block">
            <div className="w-full rounded-2xl bg-red-400 text-center py-4 text-white">
              پیشنهاد ویژه مبیت
            </div>
          </Link>

          <Link href="/" className="block">
            <div className="w-full rounded-2xl bg-zinc-100 p-4">
              پربازدید های ماه
            </div>
          </Link>

          <div className="flex flex-col md:flex-row gap-x-2">
            <Link href="/" className="block">
              <img src="/images/poster-w-home-1.webp" alt="img" />
            </Link>
            <Link href="/" className="block">
              <img src="/images/poster-w-home-2.webp" alt="img" />
            </Link>
          </div>

          <Link href="/" className="block">
            <div className="w-full rounded-2xl bg-zinc-100 p-4">
              پرفروش های ماه
            </div>
          </Link>

          <Link href="/" className="block">
            <div className="w-full rounded-2xl bg-zinc-100 p-4">
              جدید ترین محصولات
            </div>
          </Link>
        </section>
      </main>
    </>
  );
}

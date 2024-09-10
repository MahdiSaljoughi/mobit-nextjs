import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="contain min-h-[900px] flex flex-col gap-y-10">
        <span className="block">انتخاب روش پرداخت و زمان ارسال</span>
        <Link
          href={"/payment"}
          className="block bg-blue-500 text-white p-4 rounded-2xl text-center"
        >
          ثبت سفارش و نهایی کردن
        </Link>
      </div>
    </>
  );
}

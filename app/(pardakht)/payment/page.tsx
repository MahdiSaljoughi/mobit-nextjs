import Link from "next/link";

export default function page() {
  return (
    <>
      <div className="contain min-h-[900px] flex flex-col gap-y-10">
        <Link
          href={"/"}
          className="block bg-blue-500 text-white p-4 rounded-2xl text-center"
        >
          پرداخت
        </Link>
      </div>
    </>
  );
}

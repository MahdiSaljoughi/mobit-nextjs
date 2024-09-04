"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { useTheme } from "next-themes";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function MainHeader() {
  const pathname = usePathname();

  const { setTheme } = useTheme();
  const links = [
    {
      id: 1,
      title: "صفحه اصلی",
      route: "/",
    },
    {
      id: 2,
      title: "محصولات",
      route: "/products",
    },
  ];

  return (
    <>
      {/* <header className="w-full bg-white shadow-md dark:bg-zinc-950 sticky top-0 px-4 md:px-10 py-4 md:py-2 z-50 text-sm font-[fontd1]">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center justify-center md:hidden gap-x-4">
              <Sheet>
                <SheetTrigger>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.4em"
                    height="1.4em"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-miterlimit="10"
                      stroke-width="48"
                      d="M88 152h336M88 256h336M88 360h336"
                    />
                  </svg>
                </SheetTrigger>
                <SheetContent>
                  <div className="mr-2 -mt-3.5 w-full bg-red300 flex items-center justify-between font-[fontd1]">
                    <span className="text-sm block mr-5">نمونه</span>
                    <div className="flex items-center justify-center gap-x-4">
                      <button
                        onClick={() => setTheme("dark")}
                        className="dark:hidden"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={() => setTheme("light")}
                        className="hidden dark:block"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1.2em"
                          height="1.2em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"
                          />
                          <path
                            fill="currentColor"
                            fill-rule="evenodd"
                            d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </button>
                      <Image
                        src="/favicon.png"
                        alt="logo"
                        width={30}
                        height={30}
                      />
                    </div>
                  </div>
                  <div className="mt-10 font-[fontd1]">
                    <ul className="flex flex-col gap-y-4">
                      {links.map((item, index) => (
                        <li key={index} className="border-x px-2">
                          <SheetClose asChild>
                            <Link
                              href={item.route}
                              className={
                                pathname === item.route ? "text-red-500" : ""
                              }
                            >
                              {item.title}
                            </Link>
                          </SheetClose>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <SheetClose asChild></SheetClose>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex md:hidden items-center gap-x-5">
                <span>نمونه</span>
              </Link>
            </div>
            <Link href="/" className="flex items-center gap-x-5">
              <Image
                src="/favicon.png"
                alt="logo"
                width={35}
                height={35}
                className="hidden md:block"
              />
              <span className="hidden md:block">نمونه</span>
            </Link>
            <div className="hidden md:flex items-center mx-5">
              <button onClick={() => setTheme("dark")} className="dark:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.2em"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="currentColor"
                    d="M264 480A232 232 0 0 1 32 248c0-94 54-178.28 137.61-214.67a16 16 0 0 1 21.06 21.06C181.07 76.43 176 104.66 176 136c0 110.28 89.72 200 200 200c31.34 0 59.57-5.07 81.61-14.67a16 16 0 0 1 21.06 21.06C442.28 426 358 480 264 480"
                  />
                </svg>
              </button>
              <button
                onClick={() => setTheme("light")}
                className="hidden dark:block"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.4em"
                  height="1.4em"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M18 12a6 6 0 1 1-12 0a6 6 0 0 1 12 0"
                  />
                  <path
                    fill="currentColor"
                    fill-rule="evenodd"
                    d="M12 1.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0V2a.75.75 0 0 1 .75-.75M4.399 4.399a.75.75 0 0 1 1.06 0l.393.392a.75.75 0 0 1-1.06 1.061l-.393-.393a.75.75 0 0 1 0-1.06m15.202 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 0 1-1.06-1.06l.393-.393a.75.75 0 0 1 1.06 0M1.25 12a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5H2a.75.75 0 0 1-.75-.75m19 0a.75.75 0 0 1 .75-.75h1a.75.75 0 0 1 0 1.5h-1a.75.75 0 0 1-.75-.75m-2.102 6.148a.75.75 0 0 1 1.06 0l.393.393a.75.75 0 1 1-1.06 1.06l-.393-.393a.75.75 0 0 1 0-1.06m-12.296 0a.75.75 0 0 1 0 1.06l-.393.393a.75.75 0 1 1-1.06-1.06l.392-.393a.75.75 0 0 1 1.061 0M12 20.25a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1a.75.75 0 0 1 .75-.75"
                    clip-rule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <ul className="hidden md:flex items-center justify-center gap-x-4">
              {links.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.route}
                    className={pathname === item.route ? "text-red-500" : ""}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center justify-center gap-x-3 sm:gap-x-6">
            <Link
              href="/auth/sign-in"
              className="flex items-center justify-center gap-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <circle cx="12" cy="6" r="4" fill="currentColor" />
                <path
                  fill="currentColor"
                  d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                />
              </svg>
              <span className="hidden md:block">ورود | ثبت نام</span>
            </Link>
            <Link href="/" className="flex items-center justify-center gap-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  fill-rule="evenodd"
                  d="M8.418 3.25c.28-.59.884-1 1.582-1h4c.698 0 1.301.41 1.582 1c.683.006 1.216.037 1.692.223a3.25 3.25 0 0 1 1.426 1.09c.367.494.54 1.127.776 1.998l.742 2.722l.28.841l.024.03c.901 1.154.472 2.87-.386 6.301c-.546 2.183-.818 3.274-1.632 3.91c-.814.635-1.939.635-4.189.635h-4.63c-2.25 0-3.375 0-4.189-.635c-.814-.636-1.087-1.727-1.632-3.91c-.858-3.431-1.287-5.147-.386-6.301l.024-.03l.28-.841l.742-2.722c.237-.871.41-1.505.776-1.999a3.25 3.25 0 0 1 1.426-1.089c.476-.186 1.008-.217 1.692-.222m.002 1.502c-.662.007-.928.032-1.148.118a1.75 1.75 0 0 0-.768.587c-.176.237-.28.568-.57 1.635l-.57 2.089C6.384 9 7.778 9 9.684 9h4.631c1.907 0 3.3 0 4.32.18l-.569-2.089c-.29-1.067-.394-1.398-.57-1.635a1.75 1.75 0 0 0-.768-.587c-.22-.086-.486-.111-1.148-.118A1.75 1.75 0 0 1 14 5.75h-4a1.75 1.75 0 0 1-1.58-.998"
                  clip-rule="evenodd"
                />
              </svg>
              <span className="hidden md:block">سبد خرید</span>
            </Link>
          </div>
        </div>
      </header> */}

      <header className="hidden lg:block bg-[#1C39BB] px-1.5 w-full sticky top-0 text-white shadow-md lg:text-[11px] xl:text-[12.8px] z-50">
        <div className="flex lg:justify-between items-center">
          <div className="items-center lg:mx-0 hidden lg:flex">
            <Link href="/">
              <div className="2xl:ml-10 xl:ml-7 lg:ml-5 flex items-center">
                <img
                  src="/images/logos/LogoType.png"
                  className="2xl:w-[94px] xl:w-[70px] lg:w-[50px] w-20"
                  alt="logo-type-mobit"
                />
              </div>
            </Link>
            <div className="hidden lg:block">
              <div className="flex items-center 2xl:gap-x-8 xl:gap-x-5 lg:gap-x-4 xl:ml-16 lg:ml-8">
                <div className="group/menu py-6">
                  <div>
                    <div className="flex items-center 2xl:gap-x-3 xl:gap-x-2 lg:gap-x-1 cursor-pointer">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="xl:w-[20px] xl:h-[20px] lg:w-[14px] lg:h-[14px]"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M14.116 20q-.667 0-1.141-.475t-.475-1.14v-4.27q0-.666.475-1.14t1.14-.475h4.27q.666 0 1.14.475t.475 1.14v4.27q0 .666-.475 1.14t-1.14.475zm0-8.5q-.667 0-1.141-.475t-.475-1.14v-4.27q0-.666.475-1.14T14.115 4h4.27q.666 0 1.14.475T20 5.615v4.27q0 .666-.475 1.14t-1.14.475zm-8.5 0q-.667 0-1.141-.475T4 9.885v-4.27q0-.666.475-1.14T5.615 4h4.27q.666 0 1.14.475t.475 1.14v4.27q0 .666-.475 1.14t-1.14.475zm0 8.5q-.667 0-1.141-.475T4 18.386v-4.27q0-.666.475-1.14t1.14-.475h4.27q.666 0 1.14.475t.475 1.14v4.27q0 .666-.475 1.14T9.885 20z"
                          />
                        </svg>
                      </span>
                      <span className="block">دسته بندی ها</span>
                      <span className="bg-white w-0 lg:group-hover/menu:w-[80px] xl:group-hover/menu:w-[95px] 2xl:group-hover/menu:w-[105px] rounded-full h-[3px] transition-all ease-linear block absolute bottom-1"></span>
                    </div>
                  </div>

                  <div className="relative hidden group-hover/menu:block transition-all">
                    <div className="bg-white w-[240px] h-[388px] text-[#3F434D] text-[13px] absolute top-6 py-3 rounded-br-xl shadow-md transition-all duration-1000">
                      <div
                        v-for="D1 in dataMenu"
                        key="D1.id"
                        className="flex items-center gap-x-2 group/list hover:border-t-[1px] px-3 py-1.5 hover:border-b-[1px] border-zinc-700/10 hover:bg-gray-50 hover:text-[#377DFF]"
                      >
                        <img src="D1.img" alt="img" className="w-10" />
                        {/* <a>{ D1.name }</a> */}
                        <div className="hidden group-hover/list:block cursor-default bg-white w-[512px] h-[388px] absolute top-0 mr-[228px] rounded-bl-xl shadow-md py-3 pl-10 pr-3">
                          <div className="grid grid-cols-2 py-2 pr-2">
                            <div v-for="child in D1.children" key="child.id">
                              {/* <a
                            className="{ borderR: true }"
                            className="inline-block hover:text-[#377DFF] text-[#3F434D] text-[12px] mb-3"
                            >{{ child.name }}</a
                          > */}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Link href="/">
                  <div className="group/under flex items-center 2xl:gap-x-3 xl:gap-x-2 lg:gap-x-1">
                    <span>
                      <svg
                        className="xl:w-[20px] xl:h-[20px] lg:w-[14px] lg:h-[14px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 -960 960 960"
                        fill="#e8eaed"
                      >
                        <path d="M197.83-84.65q-47.96 0-80.57-32.61-32.61-32.61-32.61-80.57v-564.34q0-47.96 32.61-80.57 32.61-32.61 80.57-32.61h564.34q47.96 0 80.57 32.61 32.61 32.61 32.61 80.57v564.34q0 47.96-32.61 80.57-32.61 32.61-80.57 32.61H197.83Zm516.15-113.18h48.19v-48.19l-48.19 48.19Zm-490.48 0h54.48l120-120h108.69l-120 120h54.72l120-120h108.94l-120 120h54.71l120-120h37.13v-444.34H197.83v481.32l36.74-36.98H343.5l-120 120ZM427-502l-84.24 83q-15 15-36.51 15.38-21.52.38-37.01-15.62-15.24-15-15.24-36.88Q254-478 269.24-493l118.13-118.13q16.86-17.2 39.58-17.2t39.68 17.2L507-571l110.24-110q15-15 36.63-15.38 21.64-.38 37.13 15.62 15 15 15 36.76 0 21.76-15 36.76L546.63-462.63q-17.13 16.96-40.22 16.96-23.08 0-40.04-16.96L427-502ZM197.83-197.83v-564.34 564.34Z" />
                      </svg>
                    </span>
                    <span>پیشنهادهای شگفت انگیز</span>
                    <span className="bg-white w-0 lg:group-hover/under:w-[130px] xl:group-hover/under:w-[155px] 2xl:group-hover/under:w-[160px] rounded-full h-[3px] transition-all ease-linear block absolute bottom-1"></span>
                  </div>
                </Link>
                <Link href="/">
                  <div className="group/under flex items-center 2xl:gap-x-3 xl:gap-x-2 lg:gap-x-1">
                    <span>
                      <svg
                        className="xl:w-[24px] xl:h-[24px] lg:w-[16px] lg:h-[16px]"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 48 48"
                      >
                        <ellipse
                          cx="33.164"
                          cy="22.616"
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          rx="8.879"
                          ry="17.083"
                          transform="rotate(-21.248 33.164 22.616)"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="m37.026 38.831l-26.928-1.447A5.6 5.6 0 0 1 4.5 31.786c0-1.544.772-3.089 1.737-4.15L25.444 7.657"
                        />
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19.46 37.866c-1.93-.193-4.536-3.185-6.177-7.431c-1.64-4.15-1.737-8.011-.58-9.555m26.349 0l-9.555 8.3c2.8 4.922 6.37 7.818 8.88 6.853c3.088-1.255 3.378-8.011.675-15.153m-1.64-3.764l-9.652 8.396a7 7 0 0 1-.29-.772c-2.895-7.431-2.605-14.38.483-15.635c2.703-.965 6.563 2.51 9.459 8.01ZM19.942 38.06c0 2.026-1.64 3.57-3.764 3.57s-3.764-1.544-3.764-3.474v-.483"
                        />
                      </svg>
                    </span>
                    <span>اخبار و مقلات روز</span>
                    <span className="bg-white w-0 lg:group-hover/under:w-[100px] xl:group-hover/under:w-[120px] 2xl:group-hover/under:w-[125px] rounded-full h-[3px] transition-all ease-linear block absolute bottom-1"></span>
                  </div>
                </Link>
                <Link href="/">
                  <div className="group/under flex items-center 2xl:gap-x-3 xl:gap-x-2 lg:gap-x-1">
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="xl:w-[24px] xl:h-[24px] lg:w-[16px] lg:h-[16px]"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M20.6 5.26a2.51 2.51 0 0 0-2.48-2.2H5.885a2.51 2.51 0 0 0-2.48 2.19l-.3 2.47a3.4 3.4 0 0 0 1.16 2.56v8.16a2.5 2.5 0 0 0 2.5 2.5h10.47a2.5 2.5 0 0 0 2.5-2.5v-8.16A3.4 3.4 0 0 0 20.9 7.72Zm-6.59 14.68h-4v-4.08a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5Zm4.73-1.5a1.5 1.5 0 0 1-1.5 1.5h-2.23v-4.08a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 0-2.5 2.5v4.08H6.765a1.5 1.5 0 0 1-1.5-1.5v-7.57a3.2 3.2 0 0 0 1.24.24a3.36 3.36 0 0 0 2.58-1.19a.24.24 0 0 1 .34 0a3.36 3.36 0 0 0 2.58 1.19A3.4 3.4 0 0 0 14.6 9.92a.22.22 0 0 1 .16-.07a.24.24 0 0 1 .17.07a3.36 3.36 0 0 0 2.58 1.19a3.2 3.2 0 0 0 1.23-.24Zm-1.23-8.33a2.39 2.39 0 0 1-1.82-.83a1.2 1.2 0 0 0-.92-.43h-.01a1.2 1.2 0 0 0-.92.42a2.476 2.476 0 0 1-3.65 0a1.24 1.24 0 0 0-1.86 0A2.405 2.405 0 0 1 4.1 7.78l.3-2.4a1.52 1.52 0 0 1 1.49-1.32h12.23a1.5 1.5 0 0 1 1.49 1.32l.29 2.36a2.39 2.39 0 0 1-2.395 2.37Z"
                        />
                      </svg>
                    </span>
                    <span>همکار و قیمت عمده</span>
                    <span className="bg-white w-0 lg:group-hover/under:w-[112px] xl:group-hover/under:w-[140px] 2xl:group-hover/under:w-[145px] rounded-full h-[3px] transition-all ease-linear block absolute bottom-1"></span>
                  </div>
                </Link>
              </div>
            </div>

            <div className="flex items-center">
              <div className="relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center xl:pr-3 lg:pr-1.5">
                  <span className="text-white xl:ml-[10px] lg:pl-1.5">
                    <svg
                      className="2xl:w-[22px] 2xl:h-[22px] xl:w-[16px] xl:h-[16px] lg:w-[14px] lg:h-[14px]"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 -960 960 960"
                      fill="#fff"
                    >
                      <path d="M375.57-295.85q-119.65 0-202.79-83.14-83.13-83.15-83.13-202.82 0-119.67 83.15-202.77 83.14-83.09 202.81-83.09t202.77 83.13q83.1 83.13 83.1 202.78 0 45.48-12.26 85.76-12.26 40.28-35.31 71.57l217.05 217.28q15.95 16.19 15.95 39.5t-16.19 39.52q-16.15 15.96-39.49 15.96-23.34 0-39.53-15.96L536-344.17q-29.87 22.04-72.53 35.18-42.67 13.14-87.9 13.14Zm-.1-113.17q72.99 0 122.91-49.83 49.92-49.82 49.92-122.81 0-72.99-49.92-122.92-49.92-49.92-122.91-49.92t-122.82 49.92q-49.82 49.93-49.82 122.92 0 72.99 49.82 122.81 49.83 49.83 122.82 49.83Z" />
                    </svg>
                  </span>
                  <span className="bg-white w-[1px] 2xl:h-[28px] lg:h-[20px]"></span>
                </div>
              </div>
              <input
                type="text"
                placeholder="جستجو در مبیت"
                className="outline-none hidden lg:block placeholder:text-white xl:placeholder:text-xs lg:placeholder:text-[9px] bg-[#fff0] bg-gradient-to-l from-white/15 2xl:w-[400px] xl:w-[310px] lg:w-[200px] w-[90%] 2xl:h-[42px] xl:h-[33px] lg:h-[24px] focus:ring-2 ring-white xl:rounded-[12px] lg:rounded-[6px] pl-10 xl:pr-16 2xl:pr-[75px] lg:pr-10 shadow-sm"
              />
            </div>
          </div>
          <div className="hidden lg:flex items-center 2xl:gap-x-10 lg:gap-x-4 mx-5">
            <div>
              <Link
                href="/auth"
                className="flex items-center 2xl:gap-x-3 xl:gap-x-2 lg:gap-x-1"
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="xl:w-[20px] xl:h-[20px] lg:w-[14px] lg:h-[14px]"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="12" cy="6" r="4" fill="currentColor" />
                    <path
                      fill="currentColor"
                      d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
                    />
                  </svg>
                </span>
                <span>ورود / ثبت نام</span>
              </Link>
            </div>
            <div>
              <Link
                href="/cart"
                className="flex items-center 2xl:gap-x-3 xl:gap-x-2 lg:gap-x-1"
              >
                {/* <UIcon name="i-solar:cart-4-bold" size="24" /> */}
                <span>سبدخرید</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="lg:hidden inline-block sticky top-0 bg-[#1C39BB] w-full sm:px-5 z-30 h-[127px] text-zinc-600">
        <div
          id="menu"
          className="hidden fixed right-0 w-[310px] h-screen bg-white shadow-xl z-[100]"
        >
          <div className="bg-[#1C39BB] w-full h-[60px] flex items-center pr-1.5 pl-[15px]">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#FFFFFF"
              >
                <path d="m510.67-481.67-165-165q-12.34-12.33-12-29.33.33-17 12.66-29.33 11.67-12.34 29.34-12.34 17.66 0 30 12.34l194.66 194.66q6 6 9.17 13.34 3.17 7.33 3.17 15.66 0 9-3.17 16.34-3.17 7.33-9.17 13.33L405-256.67q-12.33 12.34-29.67 12-17.33-.33-29-12.66Q334-269.67 334-287q0-17.33 12.33-29.67l164.34-165Z" />
              </svg>
            </div>
            <div className="mx-auto">
              <Link href="/">
                <img src="/public/images/logos/mobit.png" width="110" alt="" />
              </Link>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-x-5 mt-5 mr-5">
              <span>svg</span>
              <Link href="/">پیشنهادهای شگفت انگیز</Link>
            </div>
            <div className="flex items-center gap-x-5 mt-5 mr-5">
              <span>svg</span>
              <Link href="/">اخبار و مقلات روز</Link>
            </div>
            <div className="flex items-center gap-x-5 mt-5 mr-5">
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    stroke="currentColor"
                    stroke-linejoin="round"
                    stroke-width="1"
                    d="M20.6 5.26a2.51 2.51 0 0 0-2.48-2.2H5.885a2.51 2.51 0 0 0-2.48 2.19l-.3 2.47a3.4 3.4 0 0 0 1.16 2.56v8.16a2.5 2.5 0 0 0 2.5 2.5h10.47a2.5 2.5 0 0 0 2.5-2.5v-8.16A3.4 3.4 0 0 0 20.9 7.72Zm-6.59 14.68h-4v-4.08a1.5 1.5 0 0 1 1.5-1.5h1a1.5 1.5 0 0 1 1.5 1.5Zm4.73-1.5a1.5 1.5 0 0 1-1.5 1.5h-2.23v-4.08a2.5 2.5 0 0 0-2.5-2.5h-1a2.5 2.5 0 0 0-2.5 2.5v4.08H6.765a1.5 1.5 0 0 1-1.5-1.5v-7.57a3.2 3.2 0 0 0 1.24.24a3.36 3.36 0 0 0 2.58-1.19a.24.24 0 0 1 .34 0a3.36 3.36 0 0 0 2.58 1.19A3.4 3.4 0 0 0 14.6 9.92a.22.22 0 0 1 .16-.07a.24.24 0 0 1 .17.07a3.36 3.36 0 0 0 2.58 1.19a3.2 3.2 0 0 0 1.23-.24Zm-1.23-8.33a2.39 2.39 0 0 1-1.82-.83a1.2 1.2 0 0 0-.92-.43h-.01a1.2 1.2 0 0 0-.92.42a2.476 2.476 0 0 1-3.65 0a1.24 1.24 0 0 0-1.86 0A2.405 2.405 0 0 1 4.1 7.78l.3-2.4a1.52 1.52 0 0 1 1.49-1.32h12.23a1.5 1.5 0 0 1 1.49 1.32l.29 2.36a2.39 2.39 0 0 1-2.395 2.37Z"
                  />
                </svg>
              </span>
              <Link href="/">همکار و قیمت عمده</Link>
            </div>
            <div className="flex items-center justify-between gap-x-5 mt-5 mr-5 ml-2.5">
              <div className="flex items-center gap-x-5">
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="currentColor"
                      stroke="currentColor"
                      stroke-linejoin="round"
                      stroke-width="3"
                      d="M18 6H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H8a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2ZM40 6H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 22H30a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V30a2 2 0 0 0-2-2Z"
                    />
                  </svg>
                </span>
                <Link href="/">دسته بندی ها</Link>
              </div>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="18px"
                  viewBox="0 -960 960 960"
                  width="18px"
                  fill="currentColor"
                >
                  <path d="M480-647 284-452q-11 11-27.5 11.5T228-452q-11-11-11-28t11-28l224-224q12-12 28-12t28 12l224 224q11 11 11.5 27.5T732-452q-11 11-28 11t-28-11L480-647Z" />
                </svg>
              </span>
            </div>
          </div>
        </div>
        <div
          
          id="overlay"
          className="hidden sm:fixed w-full h-screen bg-black/10"
        ></div>

        <div className="flex items-center justify-between mt-4">
          <div  className="w-9 flex justify-end">
            <svg
              className="text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="28px"
              height="28px"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <circle cx="16" cy="8" r="2" fill="currentColor" />
              <circle cx="16" cy="16" r="2" fill="currentColor" />
              <circle cx="16" cy="24" r="2" fill="currentColor" />
            </svg>
          </div>

          <Link href="/" className="w-40 mr-14">
            <div>
              <img
                src="/images/logos/LogoType.png"
                className="w-[70px]"
                alt="Logo"
              />
            </div>
          </Link>
          <div></div>
        </div>

        <div>
          <div className="relative rounded-md mx-3">
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
              <span>
                <svg
                  className="w-[20px] h-[20px] sm:w-[24px] sm:h-[24px]"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 -960 960 960"
                  fill="#fff"
                >
                  <path d="M375.57-295.85q-119.65 0-202.79-83.14-83.13-83.15-83.13-202.82 0-119.67 83.15-202.77 83.14-83.09 202.81-83.09t202.77 83.13q83.1 83.13 83.1 202.78 0 45.48-12.26 85.76-12.26 40.28-35.31 71.57l217.05 217.28q15.95 16.19 15.95 39.5t-16.19 39.52q-16.15 15.96-39.49 15.96-23.34 0-39.53-15.96L536-344.17q-29.87 22.04-72.53 35.18-42.67 13.14-87.9 13.14Zm-.1-113.17q72.99 0 122.91-49.83 49.92-49.82 49.92-122.81 0-72.99-49.92-122.92-49.92-49.92-122.91-49.92t-122.82 49.92q-49.82 49.93-49.82 122.92 0 72.99 49.82 122.81 49.83 49.83 122.82 49.83Z" />
                </svg>
              </span>
            </div>
            <input
              type="text"
              placeholder="جستجو در مبیت"
              className="outline-none mx-auto text-white sm:my-5 mt-4 lg:hidden block w-full h-[50px] placeholder:text-zinc-400 placeholder:tracking-tight bg-[#ffffff00] bg-gradient-to-l from-[#ffffff17] focus:ring-2 ring-blue-700 sm:rounded-[18px] rounded-[16px] pl-10 sm:pr-14 pr-12"
            />
          </div>
        </div>
      </div>

      <div className="lg:hidden flex justify-between items-center bg-white text-zinc-400/80 fixed bottom-0 w-full px-10 py-3 sm:px-20 shadow-black shadow-md text-[10px] sm:text-xs">
        <div>
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] sm:w-[26px]"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M13.45 2.533a2.25 2.25 0 0 0-2.9 0L3.8 8.228a2.25 2.25 0 0 0-.8 1.72v9.305c0 .966.784 1.75 1.75 1.75h3a1.75 1.75 0 0 0 1.75-1.75V15.25c0-.68.542-1.232 1.217-1.25h2.566a1.25 1.25 0 0 1 1.217 1.25v4.003c0 .966.784 1.75 1.75 1.75h3a1.75 1.75 0 0 0 1.75-1.75V9.947a2.25 2.25 0 0 0-.8-1.72z"
              />
            </svg>
            <span className="text-zinc-500">صفحه اصلی</span>
          </Link>
        </div>
        <div>
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="w-[20px] sm:w-[26px]"
            >
              <path
                fill="currentColor"
                d="M14.116 20q-.667 0-1.141-.475t-.475-1.14v-4.27q0-.666.475-1.14t1.14-.475h4.27q.666 0 1.14.475t.475 1.14v4.27q0 .666-.475 1.14t-1.14.475zm0-8.5q-.667 0-1.141-.475t-.475-1.14v-4.27q0-.666.475-1.14T14.115 4h4.27q.666 0 1.14.475T20 5.615v4.27q0 .666-.475 1.14t-1.14.475zm-8.5 0q-.667 0-1.141-.475T4 9.885v-4.27q0-.666.475-1.14T5.615 4h4.27q.666 0 1.14.475t.475 1.14v4.27q0 .666-.475 1.14t-1.14.475zm0 8.5q-.667 0-1.141-.475T4 18.386v-4.27q0-.666.475-1.14t1.14-.475h4.27q.666 0 1.14.475t.475 1.14v4.27q0 .666-.475 1.14T9.885 20z"
              />
            </svg>
            <span className="text-zinc-500">دسته بندی ها</span>
          </Link>
        </div>
        <div>
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] sm:w-[26px]"
              viewBox="0 0 24 24"
            >
              <g fill="none">
                <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                <path
                  fill="currentColor"
                  d="M18.06 3a2 2 0 0 1 1.98 1.719l.017.156l.875 14a2 2 0 0 1-1.847 2.12l-.15.005H5.066a2 2 0 0 1-2-1.976l.003-.149l.875-14a2 2 0 0 1 1.84-1.869L5.94 3zM15 7a1 1 0 0 0-.993.883L14 8a2 2 0 1 1-4 0a1 1 0 0 0-2 0a4 4 0 0 0 8 0a1 1 0 0 0-1-1"
                />
              </g>
            </svg>
            <span className="text-zinc-500">سبدخرید</span>
          </Link>
        </div>
        <div>
          <Link
            href="/auth"
            className="flex flex-col items-center justify-center gap-y-1"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[20px] sm:w-[26px]"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="6" r="4" fill="currentColor" />
              <path
                fill="currentColor"
                d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5"
              />
            </svg>
            <span className="text-zinc-500">ورود</span>
          </Link>
        </div>
      </div>
    </>
  );
}

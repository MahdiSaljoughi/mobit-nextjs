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
    <header className="w-full bg-white shadow-md dark:bg-zinc-950 sticky top-0 px-4 md:px-10 py-4 md:py-2 z-50 text-sm font-[fontd1]">
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
    </header>
  );
}

import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import Link from "next/link";
import LogoutButton from "@/components/LogoutButton/LogoutButton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function AdminPanel() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    if (session?.user.role === "ADMIN") {
      return (
        <>
          <div className="bg-zinc-950 text-zinc-100 flex relative min-h-screen">
            <div className="w-80 bg-zinc-900 fixed right-0 inset-y-0 z-10 lg:static">
              <div className="mt-32 lg:mt-0 flex flex-col gap-4 p-4">
                <div className="-my-2">
                  <img
                    src="/images/logos/mobit.png"
                    alt="logo-mobit"
                    className="w-40 mx-auto"
                  />
                </div>
                <Link
                  href="/dashbord/product"
                  className="bg-zinc-700/50 hover:bg-zinc-700 p-4 rounded-xl transition-colors"
                >
                  محصولات
                </Link>
                <Link
                  href="/dashbord/order"
                  className="bg-zinc-700/50 hover:bg-zinc-700 p-4 rounded-xl transition-colors"
                >
                  سفارشات
                </Link>
                <Link
                  href="/dashbord/user"
                  className="bg-zinc-700/50 hover:bg-zinc-700 p-4 rounded-xl transition-colors"
                >
                  کاربران
                </Link>
                <Link
                  href="/dashbord/"
                  className="bg-zinc-700/50 hover:bg-zinc-700 p-4 rounded-xl transition-colors"
                >
                  مشتریان
                </Link>
              </div>

              {/*  */}
              <div className="mt-4">
                <img
                  src="/icon.png"
                  alt="logo-mobit"
                  className="w-10 mx-auto"
                />
              </div>
            </div>
            <div className="p-4 lg:p-8 w-full">
              <div className="rounded-2xl p-4 bg-zinc-900">
                <div className="flex flex-col gap-y-10">
                  <div>
                    <div className="flex items-center justify-between mb-8 md:mb-4">
                      <span className="block text-lg md:text-2xl">
                        پنل ادمین
                      </span>
                      <img
                        src="/images/logos/mobit.svg"
                        alt="logo-mobit"
                        className="w-20 md:w-40 mx-auto pt-4"
                      />
                      <LogoutButton />
                    </div>
                    <span className="block md:text-lg text-center md:text-right">{`ادمین ${session?.user.username} عزیز خوش آمدید.`}</span>
                  </div>
                  <div>...</div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="bg-zinc-50">
            <div className="min-h-screen contain">
              <div className="flex flex-col lg:flex-row justify-between gap-x-16">
                <div className="w-full lg:w-[500px]">
                  <div className="rounded-2xl bg-white shadow-md">
                    <div className="flex flex-col gap-y-4 p-4">
                      <div className="w-full flex items-center justify-between">
                        <div className="flex items-center gap-x-4">
                          <div className="bg-zinc-100 p-4 rounded-full">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1.8em"
                              height="1.8em"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="#009dff"
                                d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4"
                              />
                            </svg>
                          </div>
                          <div className="flex flex-col justify-between h-14">
                            <div>{session?.user.username}</div>
                            <span className="text-blue-500 block text-sm cursor-pointer">
                              حساب کاربری
                            </span>
                          </div>
                        </div>
                        <div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="1.4em"
                                height="1.4em"
                                viewBox="0 0 24 24"
                                className="text-zinc-400 rotate-90 cursor-pointer"
                              >
                                <path
                                  fill="currentColor"
                                  d="M7 12a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0m7 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0"
                                />
                              </svg>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-full rtl font-[iran] p-2 text-sm">
                              <button className="flex items-center gap-x-1">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="1.2em"
                                  height="1.2em"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    fill="currentColor"
                                    d="M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23a.987.987 0 0 0-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41a7.3 7.3 0 0 0 0 1.35l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5s-1.57 3.5-3.5 3.5"
                                  />
                                </svg>
                                <span>تنظیمات</span>
                              </button>
                              <DropdownMenuSeparator />
                              <LogoutButton />
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <button className="border p-2 rounded-2xl">
                        <div className="flex items-center gap-x-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0069cc"
                              d="M14.356 2.595a.25.25 0 0 1 .361-.032l.922.812L12.739 7h1.92l2.106-2.632l1.652 1.457a.25.25 0 0 1 .026.348l-.69.827h1.944a1.75 1.75 0 0 0-.288-2.3l-3.7-3.263a1.75 1.75 0 0 0-2.531.23L8.976 7h1.91zM16.25 14a.75.75 0 0 0 0 1.5h2a.75.75 0 0 0 0-1.5zM4.5 7.25a.75.75 0 0 1 .75-.75h3.128L9.57 5H5.25A2.25 2.25 0 0 0 3 7.25v10.5A3.25 3.25 0 0 0 6.25 21h12a3.25 3.25 0 0 0 3.25-3.25v-6.5A3.25 3.25 0 0 0 18.25 8h-13a.75.75 0 0 1-.75-.75m0 10.5V9.372q.354.126.75.128h13c.966 0 1.75.784 1.75 1.75v6.5a1.75 1.75 0 0 1-1.75 1.75h-12a1.75 1.75 0 0 1-1.75-1.75"
                            />
                          </svg>
                          <div className="flex flex-col items-center justify-between gap-y-3">
                            <div className="text-xs">کیف پول و پرداخت</div>
                            <div className="text-xs">موجودی : 0 تومان</div>
                          </div>
                        </div>
                        <p className="text-xs py-4">
                          امکان افزایش موجودی , درخواست برگشت وجه و ...
                        </p>
                      </button>
                      <button className="border p-2 rounded-2xl">
                        <div className="flex items-center gap-x-4">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 32 32"
                          >
                            <path
                              fill="#fb923c"
                              d="M19.307 3.21a2.91 2.91 0 1 0-.223 1.94a11.64 11.64 0 0 1 8.232 7.049l1.775-.698a13.58 13.58 0 0 0-9.784-8.291m-2.822 1.638a.97.97 0 1 1 0-1.939a.97.97 0 0 1 0 1.94m-4.267.805l-.717-1.774a13.58 13.58 0 0 0-8.291 9.784a2.91 2.91 0 1 0 1.94.223a11.64 11.64 0 0 1 7.068-8.233m-8.34 11.802a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94m12.607 8.727a2.91 2.91 0 0 0-2.599 1.62a11.64 11.64 0 0 1-8.233-7.05l-1.774.717a13.58 13.58 0 0 0 9.813 8.291a2.91 2.91 0 1 0 2.793-3.578m0 3.879a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94M32 16.485a2.91 2.91 0 1 0-4.199 2.599a11.64 11.64 0 0 1-7.05 8.232l.718 1.775a13.58 13.58 0 0 0 8.291-9.813A2.91 2.91 0 0 0 32 16.485m-2.91.97a.97.97 0 1 1 0-1.94a.97.97 0 0 1 0 1.94"
                            />
                            <path
                              fill="#fb923c"
                              d="M19.19 16.35a3.879 3.879 0 1 0-5.42 0a4.85 4.85 0 0 0-2.134 4.014v1.939h9.697v-1.94a4.85 4.85 0 0 0-2.143-4.014m-4.645-2.774a1.94 1.94 0 1 1 3.88 0a1.94 1.94 0 0 1-3.88 0m-.97 6.788a2.91 2.91 0 1 1 5.819 0z"
                              className="ouiIcon__fillSecondary"
                            />
                          </svg>
                          <div className="flex flex-col items-center justify-between gap-y-3">
                            <div className="text-xs">باشگاه مشتریان</div>
                            <div className="text-xs">امتیاز : 50</div>
                          </div>
                        </div>
                        <p className="text-xs py-4 leading-6">
                          با معرفی کردن مبیت به دوستانتان، 100 امتیاز به آن ها
                          هدیه داده و بعد از خرید اولشان خودتان 100 امتیاز هدیه
                          بگیرید.
                        </p>
                      </button>
                      <Link
                        href={"/dashbord/order"}
                        className="hover:bg-zinc-100 w-full text-xs flex items-center gap-x-3 rounded-2xl transition-colors cursor-pointer"
                      >
                        <div className="bg-blue-400/40 p-3 rounded-2xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <g fill="none" stroke="#0069cc" strokeWidth="2">
                              <path d="M11.008 5.758L6.933 8.02a2.04 2.04 0 0 0-1.046 1.786v4.388a2.04 2.04 0 0 0 1.046 1.786l4.075 2.262a2.04 2.04 0 0 0 1.984 0l4.075-2.262a2.04 2.04 0 0 0 1.046-1.786V9.806a2.04 2.04 0 0 0-1.046-1.786l-4.075-2.262a2.04 2.04 0 0 0-1.984 0Z" />
                              <path d="M17.699 8.577L12 12L6.301 8.577M12 18.494V12" />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21.25 7.889V5.833a3.083 3.083 0 0 0-3.083-3.083h-3.084m0 18.5h3.084a3.083 3.083 0 0 0 3.083-3.083V16.11m-18.5.001v2.056a3.083 3.083 0 0 0 3.083 3.083h3.084m0-18.5H5.833A3.083 3.083 0 0 0 2.75 5.833V7.89"
                              />
                            </g>
                          </svg>
                        </div>
                        <span>سفارشات</span>
                      </Link>
                      <div className="hover:bg-zinc-100 w-full text-xs flex items-center gap-x-3 rounded-2xl transition-colors cursor-pointer">
                        <div className="bg-blue-400/40 p-3 rounded-2xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0069cc"
                              d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4.18C9.6 1.84 10.7 1 12 1s2.4.84 2.82 2zm-7 0a1 1 0 0 0-1 1a1 1 0 0 0 1 1a1 1 0 0 0 1-1a1 1 0 0 0-1-1M7 7V5H5v14h14V5h-2v2zm5 11l-5-5h3V9h4v4h3z"
                            />
                          </svg>
                        </div>
                        <span>درخواست های مرجوعی</span>
                      </div>
                      <div className="hover:bg-zinc-100 w-full text-xs flex items-center gap-x-3 rounded-2xl transition-colors cursor-pointer">
                        <div className="bg-blue-400/40 p-3 rounded-2xl">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="2em"
                            height="2em"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#0069cc"
                              d="M4 6V4h16v2zm0 14v-6H3v-2l1-5h16l1 5v2h-1v6h-2v-6h-4v6zm2-2h6v-4H6zm-.95-6h13.9zm0 0h13.9l-.6-3H5.65z"
                            />
                          </svg>
                        </div>
                        <span>رزرو حضوری</span>
                      </div>
                      <button className="bg-orange-400 text-white w-full p-4 rounded-xl transition-colors">
                        دعوت از دوستان
                      </button>
                    </div>
                  </div>
                </div>
                <div className="w-full h-[700px] border">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    return (
      <>
        <div className="min-h-[1000px] flex flex-col justify-center items-center gap-y-10 contain">
          <span className="block text-2xl">
            لطفا ابتدا به حساب کاربری خود وارد شوید .
          </span>
          <Link
            href="/sign-in"
            className="bg-blue-500 px-10 py-2 rounded-2xl inline-block text-white"
          >
            ورود
          </Link>
        </div>
      </>
    );
  }
}

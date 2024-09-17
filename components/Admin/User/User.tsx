"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function User({ user }: any) {
  const router = useRouter();

  const handelDeleteUser = async () => {
    try {
      const response = await fetch("/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user.id }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });

        router.replace("/dashbord/user");

        setInterval(() => window.location.reload(), 2000);
      }
      if (data.status === 404) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });
      }
      if (data.status === 500) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#f00",
          color: "#fff",
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <img
          src="/images/logos/mobit.png"
          alt="logo-mobit"
          className="w-40 mx-auto"
        />
      </div>
      <div className="p-4 min-h-screen text-zinc-100">
        <div className="border border-zinc-700 p-8 rounded-2xl">
          <div className="w-full flex items-center justify-between mb-4">
            <button
              onClick={handelDeleteUser}
              className="text-red-500 bg-red-500/30 px-6 py-2 rounded-xl flex items-center gap-x-2 hover:ring-4 ring-red-500/50 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                />
              </svg>
              <span>حذف کاربر</span>
            </button>
            <Link
              href={"/dashbord/user"}
              className="flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
            >
              <span>بازگشت</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4m0 0l6-6m-6 6l6 6"
                />
              </svg>
            </Link>
          </div>
          <Formik
            initialValues={{
              id: user.id,
              userName: user.userName,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              role: user.role,
              emailVerified: user.emailVerified,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              const response = await fetch("/api/user", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              const data = await response.json();
              if (data.status === 200) {
                toast.success(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
                router.push("/dashbord/user");

                setInterval(() => window.location.reload(), 2000);
              }
              if (data.status === 404) {
                toast.error(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
              }
              if (data.status === 400) {
                toast.error(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
              }
              if (data.status === 500) {
                toast.error(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
              }
            }}
          >
            <Form>
              <div className="flex items-center flex-col gap-8 border border-zinc-700 p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between w-full border-b border-zinc-700 pb-4">
                  <div>
                    <span className="block">id</span>
                    <span className="block">{user?.id}</span>
                  </div>

                  <div>
                    <span className="block">updatedAt</span>
                    <span className="block">
                      {user?.updatedAt.toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="block">createdAt</span>
                    <span className="block">
                      {user?.createdAt.toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="block">createdAt</span>
                    <span className="block">
                      {user?.createdAt.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-y-4 w-full">
                  <span className="block">نام کاربری</span>
                  <Field
                    name="userName"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />

                  <span className="block">نام</span>
                  <Field
                    name="firstName"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />

                  <span className="block">نام خانوادگی</span>
                  <Field
                    name="lastName"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />

                  <span className="block">ایمیل</span>
                  <Field
                    name="email"
                    type="email"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />

                  <span className="block">شماره موبایل</span>
                  <Field
                    name="phone"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />

                  <span className="block">سطح دسترسی</span>
                  <Field
                    name="role"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />

                  <span className="block">تاییده ایمیل</span>
                  <Field
                    name="emailVerified"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full"
                  />
                </div>
                <button
                  type="submit"
                  className="flex items-center gap-x-2 bg-blue-500/20 text-blue-500 px-6 py-2 rounded-xl hover:ring-4 ring-blue-500/50 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" opacity="0.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.5 12.5l2 2l5-5"
                      />
                    </g>
                  </svg>
                  <span>ویرایش کاربر</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";

export default function ProfileUser({ user }: any) {
  return (
    <>
      <div className="p-4">
        <div className="flex items-center justify-between bg-blue-500 p-4 rounded-xl text-zinc-100 mb-4">
          <span className="block">سطح دسترسی : {user.role}</span>
          <span className="block">
            تاییده ایمیل : {String(user.emailVerified)}
          </span>
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
            <div className="flex items-center flex-col gap-8">
              <div className="flex flex-col gap-y-4 w-full">
                <span className="block">نام کاربری</span>
                <Field
                  name="userName"
                  type="text"
                  className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-4 ring-blue-500/50 transition-all w-full"
                />

                <span className="block">نام</span>
                <Field
                  name="firstName"
                  type="text"
                  className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-4 ring-blue-500/50 transition-all w-full"
                />

                <span className="block">نام خانوادگی</span>
                <Field
                  name="lastName"
                  type="text"
                  className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-4 ring-blue-500/50 transition-all w-full"
                />

                <span className="block">ایمیل</span>
                <Field
                  name="email"
                  type="email"
                  className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-4 ring-blue-500/50 transition-all w-full"
                />

                <span className="block">شماره موبایل</span>
                <Field
                  name="phone"
                  type="text"
                  className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-4 ring-blue-500/50 transition-all w-full"
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
                <span>ویرایش اطلاعات</span>
              </button>
              <span className="text-rose-500 text-xs">
                لطفا بعد از ویرایش از حساب خارج شوید و دوباره وارد شوید!
              </span>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}

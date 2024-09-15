"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignUp() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <img src="/images/logos/mobit.svg" alt="logo" className="w-32" />
      </div>
      <Formik
        initialValues={{
          phone: "",
          userName: `کاربر-${Math.floor(Math.random() * 1000)}`,
          password: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string().required("شماره موبایل الزامی است."),
          password: Yup.string().required("رمز عبور الزامی است."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          try {
            const response = await fetch("/api/auth/sign-up", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(values),
            });

            const data = await response.json();

            if (data.status === 409) {
              toast.error(data.message, {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                  fontSize: "12px",
                },
              });
            }
            if (data.status === 201) {
              // clear form
              values.phone = "";
              values.userName = "";
              values.password = "";

              toast.success(data.message, {
                style: {
                  borderRadius: "10px",
                  background: "#333",
                  color: "#fff",
                  fontSize: "12px",
                },
              });
              router.push("/sign-in");
            }
          } catch (error) {
            toast.error("خطا لطفا مقادیر را به درستی وارد کنید.", {
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
        <Form className="w-full md:w-[420px] mx-auto p-5 flex flex-col gap-y-5 rounded-3xl shadow-lg -md mt-10 bg-white">
          <div>
            <span className="text-xl">ثبت نام در مبیت</span>
          </div>
          <label htmlFor="phone">شماره موبایل *</label>
          <Field
            name="phone"
            type="text"
            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-2 ring-blue-500"
            placeholder="09120000000"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="text-rose-500"
          />

          <label htmlFor="userName">نام کاربری</label>
          <Field
            name="userName"
            type="text"
            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-2 ring-blue-500"
          />

          <label htmlFor="password">رمز عبور *</label>
          <Field
            name="password"
            type="password"
            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-2 ring-blue-500"
            placeholder="رمز عبور"
          />
          <ErrorMessage
            name="password"
            component="div"
            className="text-rose-500"
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-xl px-10 py-3 text-white text-sm"
          >
            ثبت نام
          </button>
          {/* {message && <p className="text-center text-rose-500">{message}</p>} */}
        </Form>
      </Formik>
      <div className="flex items-center gap-x-2 justify-center mt-6">
        <span>حساب دارید؟</span>
        <Link href="/sign-in" className="text-blue-600">
          ورود
        </Link>
      </div>
    </>
  );
}

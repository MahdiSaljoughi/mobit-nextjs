"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <img src="/images/logos/mobit.svg" alt="logo" className="w-32" />
      </div>
      <Formik
        initialValues={{
          email: "",
          password: "",
          user_name: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("ایمل الزامی است ."),
          password: Yup.string().required("رمز عبور الزامی است ."),
          user_name: Yup.string().required("نام کاربری الزامی است ."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);

          try {
            await fetch("/api/auth/sign-up", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });

            setSubmitting(false);

            // clear form
            values.email = "";
            values.password = "";
            values.user_name = "";

            // toast
            toast("حساب شما با موفقیت ایجاد شد");

            router.replace("/sign-in");
          } catch (error) {
            toast("خطا ! لطفا مقادیر را به درستی وارد کنید .");
          }
        }}
      >
        <Form className="w-full md:w-[420px] mx-auto p-5 flex flex-col gap-y-5 rounded-3xl shadow-lg -md mt-10 bg-white">
          <div>
            <span className="text-xl">ثبت نام در مبیت</span>
          </div>
          <label htmlFor="email">ایمیل</label>
          <Field
            name="email"
            type="email"
            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-2 ring-blue-500"
            placeholder="ایمیل"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-rose-500"
          />

          <label htmlFor="user_name">نام کاربری</label>
          <Field
            name="user_name"
            type="text"
            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-2 ring-blue-500"
            placeholder="نام کاربری"
          />
          <ErrorMessage
            name="user_name"
            component="div"
            className="text-rose-500"
          />

          <label htmlFor="password">رمز عبور</label>
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

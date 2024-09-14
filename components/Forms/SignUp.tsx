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
          phone: "",
          password: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string().required("شماره تماس الزامی است ."),
          password: Yup.string().required("رمز عبور الزامی است ."),
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
            values.phone = "";
            values.password = "";

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
          <label htmlFor="phone">شماره تماس</label>
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

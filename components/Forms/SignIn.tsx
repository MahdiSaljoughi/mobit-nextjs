"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";
import Link from "next/link";

import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-center w-full">
        <img src="/images/logos/mobit.svg" alt="logo" className="w-32" />
      </div>
      <Formik
        initialValues={{
          email: "",
          hashedPassword: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string().required("ایمل الزامی است ."),
          hashedPassword: Yup.string().required("رمز عبور الزامی است ."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          const signInData = await signIn("credentials", {
            email: values.email,
            password: values.hashedPassword,
            redirect: false,
          });
          if (signInData?.error) {
            // console.log(signInData.error);
            toast("خطا ! لطفا مقادیر را به درستی وارد کنید .");
          } else {
            setSubmitting(false);

            //clear form
            values.email = "";
            values.hashedPassword = "";
            toast("با موفقیت وارد شدید .");
            router.replace("/dashbord");
          }
        }}
      >
        <Form className="w-full md:w-[420px] mx-auto p-5 flex flex-col gap-y-5 rounded-3xl shadow-lg -md mt-10 bg-white">
          <div>
            <span className="text-xl">ورود به مبیت</span>
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

          <label htmlFor="hashedPassword">رمز عبور</label>
          <Field
            name="hashedPassword"
            type="password"
            className="outline-none py-2 px-4 rounded-xl bg-zinc-100 focus:ring-2 ring-blue-500"
            placeholder="رمز عبور"
          />
          <ErrorMessage
            name="hashedPassword"
            component="div"
            className="text-rose-500"
          />
          <button
            type="submit"
            className="bg-blue-500 rounded-xl px-10 py-3 text-white text-sm"
          >
            ورود به مبیت
          </button>
        </Form>
      </Formik>
      <div className="flex items-center gap-x-2 justify-center mt-6">
        <span>حساب ندارید؟</span>
        <Link href="/sign-up" className="text-blue-600">
          ثبت نام
        </Link>
      </div>
    </>
  );
}

"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

export default function SignIn() {
  const router = useRouter();

  return (
    <div>
      <div className="flex items-center justify-center w-full">
        <img src="/images/logos/mobit.svg" alt="logo" className="w-32" />
      </div>
      <Formik
        initialValues={{
          phone: "",
          password: "",
        }}
        validationSchema={Yup.object({
          phone: Yup.string().required("شماره موبایل الزامی است."),
          password: Yup.string().required("رمز عبور الزامی است."),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);
          
          const signInData = await signIn("credentials", {
            phone: values.phone,
            password: values.password,
            redirect: false,
          });

          if (signInData?.error) {
            toast.error("خطا لطفا مقادیر را به درستی وارد کنید.", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                fontSize: "12px",
              },
            });
          } else {
            //clear form
            values.phone = "";
            values.password = "";

            toast.success("با موفقیت وارد شدید", {
              style: {
                borderRadius: "10px",
                background: "#333",
                color: "#fff",
                fontSize: "12px",
              },
            });

            router.replace("/dashbord");
          }
        }}
      >
        <Form className="w-full md:w-[420px] mx-auto p-5 flex flex-col gap-y-5 rounded-3xl shadow-lg -md mt-10 bg-white">
          <div>
            <span className="text-xl">ورود به مبیت</span>
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

          <label htmlFor="password">رمز عبور *</label>
          <Field
            name="password"
            type="text"
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
    </div>
  );
}

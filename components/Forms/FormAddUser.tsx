"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function FormAddUser() {
  return (
    <div className="w-full border border-zinc-700 p-4 md:p-8 rounded-3xl">
      <span className="block md:text-xl">فرم افزودن کاربر</span>
      <Formik
        initialValues={{
          email: "",
          password: "",
          user_name: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("ایمیل معتبر نیست .")
            .required("این فیلد الزامی است ."),
          password: Yup.string().required("این فیلد الزامی است ."),
          user_name: Yup.string().required("این فیلد الزامی است ."),
          phone: Yup.string().required("این فیلد الزامی است ."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          try {
            await fetch("/api/user", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });
            // Clear form
            resetForm();

            // Toast
            toast("کاربر جدید با موفقیت ایجاد شد .");
          } catch (error) {
            toast(`خطا : ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full pt-5 flex flex-col gap-y-5">
            <label htmlFor="email">ایمیل</label>
            <Field
              name="email"
              type="email"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="password">رمز عبور</label>
            <Field
              name="password"
              type="password"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="password"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="user_name">نام کاربری</label>
            <Field
              name="user_name"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="user_name"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="phone">شماره تماس</label>
            <Field
              name="phone"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-rose-500"
            />

            <button
              type="submit"
              className={`bg-blue-500 hover:bg-blue-600 rounded-2xl px-10 py-2 text-white transition-colors ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              {isSubmitting ? "در حال ارسال..." : "اضافه کردن"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

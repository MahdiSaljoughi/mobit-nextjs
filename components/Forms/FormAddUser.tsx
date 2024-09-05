"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function FormAddUser() {
  return (
    <div className="w-full">
      <span className="block text-xl">فرم افزودن کاربر</span>
      <Formik
        initialValues={{
          email: "",
          hashedPassword: "",
          user_name: "",
          phone: "",
          image: "",
          bio: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("ایمیل معتبر نیست .")
            .required("این فیلد الزامی است ."),
          hashedPassword: Yup.string().required("این فیلد الزامی است ."),
          user_name: Yup.string().required("این فیلد الزامی است ."),
          phone: Yup.string().required("این فیلد الزامی است ."),
          image: Yup.string().required("این فیلد الزامی است ."),
          bio: Yup.string().required("این فیلد الزامی است ."),
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
              className="outline-none py-3 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
            />
            <ErrorMessage
              name="email"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="hashedPassword">رمز عبور</label>
            <Field
              name="hashedPassword"
              type="text"
              className="outline-none py-3 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
            />
            <ErrorMessage
              name="hashedPassword"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="user_name">نام کاربری</label>
            <Field
              name="user_name"
              type="text"
              className="outline-none py-3 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
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
              className="outline-none py-3 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
            />
            <ErrorMessage
              name="phone"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="image">آدرس تصویر پروفایل</label>
            <Field
              name="image"
              type="text"
              className="outline-none py-3 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
            />
            <ErrorMessage
              name="image"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="bio">بیو</label>
            <Field
              name="bio"
              type="text"
              className="outline-none py-3 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
            />
            <ErrorMessage
              name="bio"
              component="div"
              className="text-rose-500"
            />

            <button
              type="submit"
              className={`bg-teal-400 hover:bg-teal-500 dark:bg-teal-500 dark:hover:bg-teal-400 rounded-xl px-10 py-2 text-white transition-colors ${
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

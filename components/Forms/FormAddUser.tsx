"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function FormAddUser() {
  return (
    <div className="w-full border border-zinc-700 p-4 md:p-8 rounded-3xl text-zinc-100">
      <span className="block md:text-xl text-blue-500">فرم افزودن کاربر</span>
      <Formik
        initialValues={{
          email: "",
          password: "",
          userName: "",
          phone: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("ایمیل معتبر نیست.")
            .required("این فیلد الزامی است."),
          password: Yup.string().required("این فیلد الزامی است."),
          userName: Yup.string().required("این فیلد الزامی است."),
          phone: Yup.string().required("این فیلد الزامی است."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          try {
            const response = await fetch("/api/user", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });

            const data = await response.json();

            if (data.status === 201) {
              // Clear form
              resetForm();

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

            <label htmlFor="userName">نام کاربری</label>
            <Field
              name="userName"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="userName"
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

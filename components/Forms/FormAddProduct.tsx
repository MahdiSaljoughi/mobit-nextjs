"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function FormAddProduct({ user_name }: any) {

  return (
    <div className="w-full border border-zinc-700 p-4 md:p-8 rounded-3xl">
      <span className="block md:text-xl">فرم افزودن محصول</span>
      <Formik
        initialValues={{
          title: "",
          price: "",
          slug: "",
          count: "",
          cat: "",
          description: "",
          image: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("این فیلد الزامی می باشد ."),
          price: Yup.number().required("این فیلد الزامی می باشد ."),
          description: Yup.string().required("این فیلد الزامی می باشد ."),
          image: Yup.string().required("این فیلد الزامی می باشد ."),
          slug: Yup.string().required("این فیلد الزامی می باشد ."),
          count: Yup.number().required("این فیلد الزامی می باشد ."),
          cat: Yup.string().required("این فیلد الزامی می باشد ."),
        })}
        onSubmit={async (values, { setSubmitting, resetForm }) => {
          setSubmitting(true);

          // تبدیل price و count به عدد
          const productData = {
            createdBy: user_name,
            ...values,
            price: Number(values.price),
            count: Number(values.count),
          };

          try {
            await fetch("/api/product", {
              method: "POST",
              body: JSON.stringify(productData), // ارسال داده‌های تبدیل شده
              headers: {
                "Content-Type": "application/json",
              },
            });

            // Clear form
            resetForm();

            // Toast
            toast("محصول جدید با موفقیت ایجاد شد .");
          } catch (error) {
            toast(`خطا : ${error}`);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="w-full pt-5 flex flex-col gap-y-5">
            <label htmlFor="title">عنوان محصول</label>
            <Field
              name="title"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="price">قیمت محصول</label>
            <Field
              name="price"
              type="number"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="price"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="cat">کته گوری</label>
            <Field
              name="cat"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="cat"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="slug">اسلاگ</label>
            <Field
              name="slug"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="slug"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="count">تعداد موجودی</label>
            <Field
              name="count"
              type="number"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="count"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="description">توضیحات</label>
            <Field
              name="description"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="description"
              component="div"
              className="text-rose-500"
            />

            <label htmlFor="image">آدرس عکس</label>
            <Field
              name="image"
              type="text"
              className="outline-none py-3 px-4 rounded-2xl focus:ring-2 ring-blue-500 bg-zinc-800"
            />
            <ErrorMessage
              name="image"
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

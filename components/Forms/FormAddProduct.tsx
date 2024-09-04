"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function FormAddProduct() {
  return (
    <div className="w-full bg-slate-500">
      <Formik
        initialValues={{
          title: "",
          price: 0,
          slug: "",
          count: 0,
          cat: "",
          description: "",
          image: "",
        }}
        validationSchema={Yup.object({
          title: Yup.string().required("Required"),
          price: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          description: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          image: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          slug: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          count: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          cat: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(false);

          try {
            const respone = await fetch("/api/product", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });

            setSubmitting(false);

            // clear form
            values.title = "";
            values.price = 0;
            values.cat = "";
            values.slug = "";
            values.count = 0;
            values.description = "";
            values.image = "";

            // toast
            toast("Product created");
          } catch (error) {
            toast(`err is : ${error}`);
          }
        }}
      >
        <Form className="w-40 mx-auto py-40 flex flex-col items-center gap-y-5">
          <label htmlFor="title">title</label>
          <Field
            name="title"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="title">
            {(msg) => <div className="text-rose-500">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="price">price</label>
          <Field
            name="price"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="price" />

          <label htmlFor="cat">cat</label>
          <Field
            name="cat"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="cat" />

          <label htmlFor="slug">slug</label>
          <Field
            name="slug"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="slug" />

          <label htmlFor="count">count</label>
          <Field
            name="count"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="count" />

          <label htmlFor="description">description</label>
          <Field
            name="description"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="description" />

          <label htmlFor="image">image</label>
          <Field
            name="image"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="image" />

          <button
            type="submit"
            className="bg-blue-500 rounded-xl px-10 py-2 text-white"
          >
            اضافه کردن
          </button>
        </Form>
      </Formik>
    </div>
  );
}

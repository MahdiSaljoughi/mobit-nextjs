"use client";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export default function FormAddUser() {
  return (
    <div className="w-full bg-slate-400">
      <Formik
        initialValues={{
          email: "",
          hashedPassword: "",
          user_name: "",
          phone: "",
          image: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          hashedPassword: Yup.string()
            .max(15, "Must be 15 characters or less")
            .required("Required"),
          user_name: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          phone: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
          image: Yup.string()
            .max(20, "Must be 20 characters or less")
            .required("Required"),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const respone = await fetch("/api/user", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });
            setSubmitting(false);
            values.email = "";
            values.hashedPassword = "";
            values.user_name = "";
            values.phone = "";
            values.image = "";
            toast("User created");
          } catch (error) {
            toast(`err is : ${error}`);
          }
        }}
      >
        <Form className="w-40 mx-auto py-40 flex flex-col items-center gap-y-5">
          <label htmlFor="email">email</label>
          <Field
            name="email"
            type="email"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="email">
            {(msg) => <div className="text-rose-500">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="hashedPassword">hashedPassword</label>
          <Field
            name="hashedPassword"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="hashedPassword" />

          <label htmlFor="user_name">user_name</label>
          <Field
            name="user_name"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="user_name" />

          <label htmlFor="phone">phone</label>
          <Field
            name="phone"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="phone" />

          <label htmlFor="image">image</label>
          <Field
            name="image"
            type="text"
            className="bg-gray-700 outline-none py-2 px-4 rounded-xl text-white"
          />
          <ErrorMessage name="image" />

          <button type="submit" className="bg-blue-500 rounded-xl px-10 py-2 text-white">اضافه کردن</button>
        </Form>
      </Formik>
    </div>
  );
}

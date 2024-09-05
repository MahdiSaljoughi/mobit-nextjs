"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

export function EditUser() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.4em"
              height="1.4em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M11.943 1.25H13.5a.75.75 0 0 1 0 1.5H12c-2.378 0-4.086.002-5.386.176c-1.279.172-2.05.5-2.62 1.069c-.569.57-.896 1.34-1.068 2.619c-.174 1.3-.176 3.008-.176 5.386s.002 4.086.176 5.386c.172 1.279.5 2.05 1.069 2.62c.57.569 1.34.896 2.619 1.068c1.3.174 3.008.176 5.386.176s4.086-.002 5.386-.176c1.279-.172 2.05-.5 2.62-1.069c.569-.57.896-1.34 1.068-2.619c.174-1.3.176-3.008.176-5.386v-1.5a.75.75 0 0 1 1.5 0v1.557c0 2.309 0 4.118-.19 5.53c-.194 1.444-.6 2.584-1.494 3.479c-.895.895-2.035 1.3-3.48 1.494c-1.411.19-3.22.19-5.529.19h-.114c-2.309 0-4.118 0-5.53-.19c-1.444-.194-2.584-.6-3.479-1.494c-.895-.895-1.3-2.035-1.494-3.48c-.19-1.411-.19-3.22-.19-5.529v-.114c0-2.309 0-4.118.19-5.53c.194-1.444.6-2.584 1.494-3.479c.895-.895 2.035-1.3 3.48-1.494c1.411-.19 3.22-.19 5.529-.19m4.827 1.026a3.503 3.503 0 0 1 4.954 4.953l-6.648 6.649c-.371.37-.604.604-.863.806a5.3 5.3 0 0 1-.987.61c-.297.141-.61.245-1.107.411l-2.905.968a1.492 1.492 0 0 1-1.887-1.887l.968-2.905c.166-.498.27-.81.411-1.107q.252-.526.61-.987c.202-.26.435-.492.806-.863zm3.893 1.06a2.003 2.003 0 0 0-2.832 0l-.376.377q.032.145.098.338c.143.413.415.957.927 1.469a3.9 3.9 0 0 0 1.807 1.025l.376-.376a2.003 2.003 0 0 0 0-2.832m-1.558 4.391a5.4 5.4 0 0 1-1.686-1.146a5.4 5.4 0 0 1-1.146-1.686L11.218 9.95c-.417.417-.58.582-.72.76a4 4 0 0 0-.437.71c-.098.203-.172.423-.359.982l-.431 1.295l1.032 1.033l1.295-.432c.56-.187.779-.261.983-.358q.378-.18.71-.439c.177-.139.342-.302.759-.718z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] font-[fontd2]">
          <DialogHeader>
            <DialogTitle className="text-center">ویرایش کاربر</DialogTitle>
            <DialogDescription className="text-center">
              پس از ایجاد تغیرات روی ثبت کلیک کنید.
            </DialogDescription>
          </DialogHeader>
          <div className="w-full">
            <Formik
              initialValues={{
                email: "",
                user_name: "",
                phone: "",
                image: "",
                bio: "",
                role: "",
              }}
              validationSchema={Yup.object({
                email: Yup.string()
                  .email("ایمیل معتبر نیست .")
                  .required("این فیلد الزامی است ."),
                user_name: Yup.string().required("این فیلد الزامی است ."),
                phone: Yup.string().required("این فیلد الزامی است ."),
                image: Yup.string().required("این فیلد الزامی است ."),
                bio: Yup.string().required("این فیلد الزامی است ."),
                role: Yup.string().required("این فیلد الزامی است ."),
              })}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setSubmitting(true);

                try {
                  await fetch("/api/user", {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  });
                  // Clear form
                  resetForm();

                  // Toast
                  toast("کاربر با موفقیت ویرایش شد .");
                } catch (error) {
                  toast(`خطا : ${error}`);
                } finally {
                  setSubmitting(false);
                }
              }}
            >
              {({ isSubmitting }) => (
                <Form className="w-full pt-5 flex flex-col gap-y-5">
                  <Field
                    name="email"
                    type="email"
                    className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
                    placeholder="ایمیل"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-rose-500"
                  />

                  <Field
                    name="user_name"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
                    placeholder="نام کاربری"
                  />
                  <ErrorMessage
                    name="user_name"
                    component="div"
                    className="text-rose-500"
                  />

                  <Field
                    name="phone"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
                    placeholder="شماره تماس"
                  />
                  <ErrorMessage
                    name="phone"
                    component="div"
                    className="text-rose-500"
                  />

                  <Field
                    name="image"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
                    placeholder="تصویر"
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="text-rose-500"
                  />

                  <Field
                    name="bio"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
                    placeholder="درباره"
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-rose-500"
                  />

                  <Field
                    name="bio"
                    type="text"
                    className="outline-none py-2 px-4 rounded-xl ring-2 ring-orange-300 bg-white/0"
                    placeholder="ADMIN , USER"
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
                    {isSubmitting ? "در حال ارسال..." : "ثبت"}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

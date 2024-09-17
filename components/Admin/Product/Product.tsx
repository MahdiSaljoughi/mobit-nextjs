"use client";

import { ErrorMessage, Field, Form, Formik } from "formik";
import Image from "next/image";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Product({ product }: any) {
  const router = useRouter();

  const handelDeleteProduct = async () => {
    try {
      const response = await fetch("/api/product", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: product.id }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });

        router.replace("/dashbord/product");

        setInterval(() => window.location.reload(), 2000);
      }
      if (data.status === 404) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });
      }
      if (data.status === 500) {
        toast.error(data.message, {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
            fontSize: "12px",
          },
        });
      }
    } catch (error: any) {
      toast.error(error.message, {
        style: {
          borderRadius: "10px",
          background: "#f00",
          color: "#fff",
          fontSize: "12px",
        },
      });
    }
  };

  return (
    <>
      <div className="p-4">
        <img
          src="/images/logos/mobit.png"
          alt="logo-mobit"
          className="w-40 mx-auto"
        />
      </div>
      <div className="p-4 min-h-screen text-zinc-100">
        <div className="border border-zinc-700 p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={handelDeleteProduct}
              className="text-red-500 bg-red-500/30 px-6 py-2 rounded-xl flex items-center gap-x-2 hover:ring-4 ring-red-500/50 transition-all"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.4em"
                height="1.4em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M19 4h-3.5l-1-1h-5l-1 1H5v2h14M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6z"
                />
              </svg>
              <span>حذف محصول</span>
            </button>
            <Link
              href={"/dashbord/product"}
              className="inline-flex items-center gap-x-2 bg-green-500/20 text-green-500 px-6 py-2 rounded-xl hover:ring-4 ring-green-500/50 transition-all"
            >
              <span>بازگشت</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H4m0 0l6-6m-6 6l6 6"
                />
              </svg>
            </Link>
          </div>
          <Formik
            initialValues={{
              id: product.id,
              title: product.title,
              titleEng: product.titleEng,
              slug: product.slug,
              price: product.price,
              count: product.count,
              description: product.description,
              cat: product.cat,
              image: product.image,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(false);
              const response = await fetch("/api/product", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
              });
              const data = await response.json();
              if (data.status === 200) {
                toast.success("با موفقیت ویرایش شد", {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
                router.push("/dashbord/product");

                setInterval(() => window.location.reload(), 2000);
              }
              if (data.status === 404) {
                toast.error(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
              }
              if (data.status === 400) {
                toast.error(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
              }
              if (data.status === 500) {
                toast.error(data.message, {
                  style: {
                    borderRadius: "10px",
                    background: "#333",
                    color: "#fff",
                    fontSize: "12px",
                  },
                });
              }
            }}
          >
            <Form>
              <div className="flex items-center flex-col gap-8 border border-zinc-700 p-4 rounded-xl shadow-sm">
                <div className="flex items-center justify-between w-full border-b border-zinc-700 pb-4">
                  <div>
                    <span className="block">id</span>
                    <span className="block">{product?.id}</span>
                  </div>

                  <div>
                    <span className="block">createdBy</span>
                    <span className="block">{product?.createdBy}</span>
                  </div>

                  <div>
                    <span className="block">createdAt</span>
                    <span className="block">
                      {product?.createdAt.toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <span className="block">createdAt</span>
                    <span className="block">
                      {product?.createdAt.toLocaleTimeString()}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center justify-center gap-4">
                    <div className="bg-zinc-800 p-4 rounded-xl">
                      <span className="block">تصویر</span>
                      <Image
                        src={product!.image}
                        alt={product!.titleEng}
                        width={300}
                        height={300}
                      />
                      <Field
                        name="image"
                        type="text"
                        className="outline-none py-2 px-4 rounded-xl bg-zinc-700 focus:ring-4 ring-blue-500/50 transition-all"
                        placeholder="/images/products/..."
                      />
                    </div>

                    <div className="w-full">
                      <div className="w-full">
                        <span className="block">عنوان</span>
                        <Field
                          name="title"
                          as="textarea"
                          type="text"
                          className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-[600px] h-20"
                        />
                      </div>
                      <div className="w-full">
                        <span className="block">عنوان انگلیسی</span>
                        <Field
                          name="titleEng"
                          as="textarea"
                          type="text"
                          className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-[600px] h-20"
                        />
                      </div>

                      <div className="w-full">
                        <span className="block">اسلاگ</span>
                        <Field
                          name="slug"
                          as="textarea"
                          type="text"
                          className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-[600px] h-20"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
                      <span className="block">قیمت</span>
                      <Field
                        name="price"
                        type="number"
                        className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <span className="block">دسته بندی</span>
                      <Field
                        name="cat"
                        type="text"
                        className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all"
                      />
                    </div>

                    <div>
                      <span className="block">تعداد</span>
                      <Field
                        name="count"
                        type="number"
                        className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full">
                  <span className="block">توضیحات</span>
                  <Field
                    as="textarea"
                    name="description"
                    type="textera"
                    className="outline-none py-2 px-4 rounded-xl bg-zinc-800 focus:ring-4 ring-blue-500/50 transition-all w-full min-h-96"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center gap-x-2 bg-blue-500/20 text-blue-500 px-6 py-2 rounded-xl hover:ring-4 ring-blue-500/50 transition-all"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5em"
                    height="1.5em"
                    viewBox="0 0 24 24"
                  >
                    <g fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" opacity="0.5" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m8.5 12.5l2 2l5-5"
                      />
                    </g>
                  </svg>
                  <span>ویرایش و بروزرسانی</span>
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}

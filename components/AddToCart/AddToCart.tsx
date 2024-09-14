"use client";

import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/store/cart-slice";
import { RootState } from "@/store/store";

export default function AddToCart({
  id,
  title,
  price,
  count,
  titleEng,
  slug,
  image,
}: any) {
  const router = useRouter();

  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const addToCartHandler = () => {
    dispatch(addToCart({ id, title, price, count, titleEng, slug, image }));
    router.push("/cart");
  };

  const removeFromCartHandler = () => {
    dispatch(removeFromCart(id));
  };

  return (
    <>
      {cartItems.find((item) => item.id === id) ? (
        <div className="flex items-center justify-between px-4 py-2 rounded-xl border-2 min-w-40">
          <button onClick={addToCartHandler} className="text-blue-500">
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
                d="M12 5v14m-7-7h14"
              />
            </svg>
          </button>
          <span>
            {cartItems.map((x) => {
              if (x.id === id) {
                return x.qunatity;
              }
            })}
          </span>
          <button onClick={removeFromCartHandler} className="text-red-500">
            {cartItems.find((item) => {
              if (item.id === id) return item.qunatity > 1;
            }) ? (
              <>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.2em"
                  height="1.5em"
                  viewBox="0 0 256 256"
                >
                  <path
                    fill="currentColor"
                    d="M228 128a12 12 0 0 1-12 12H40a12 12 0 0 1 0-24h176a12 12 0 0 1 12 12"
                  />
                </svg>
              </>
            ) : (
              <>
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
              </>
            )}
          </button>
        </div>
      ) : (
        <button
          className="rounded-xl bg-blue-500 text-white px-4 py-2.5 text-sm md:w-full border-2 border-zinc-50"
          onClick={addToCartHandler}
        >
          افزودن به سبد خرید
        </button>
      )}
    </>
  );
}

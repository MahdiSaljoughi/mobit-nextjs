"use client";

import { useRouter } from "next/navigation";

import { useContext } from "react";
import { CartContext } from "@/contexts/cart";

export default function AddToCart({ product }: any) {
  const router = useRouter();

  const { state, dispatch } = useContext(CartContext);

  function addToCartHandler() {
    if (!product) {
      console.error("Product is undefined");
      return;
    }

    const existingItem = state.cart.cartItems.find(
      (item: any) => item.slug === product.slug
    );

    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty) {
      alert(`بیشتر موجود نیست موجودی : ${product.count}`);
      return;
    }
    dispatch({ type: "ADD_ITEMS", payload: { ...product, qty } });

    router.push("/cart");
  }

  return (
    <button
      className="rounded-xl bg-blue-500 text-white px-4 py-2.5 text-sm"
      onClick={addToCartHandler}
    >
      افزودن به سبد خرید
    </button>
  );
}

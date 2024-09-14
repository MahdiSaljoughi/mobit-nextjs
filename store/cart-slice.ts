import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
export type CartItem = {
  id: string;
  title: string;
  price: number;
  qunatity: number;
  titleEng: string;
  slug: string;
  image: string;
};

type CartState = {
  items: CartItem[];
};

const initialState: CartState = {
  items: Cookies.get("cart")
    ? JSON.parse(Cookies.get("cart")!)
    : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(
      state,
      action: PayloadAction<{
        id: string;
        title: string;
        price: number;
        count: number;
        titleEng: string;
        slug: string;
        image: string;
      }>
    ) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id
      );

      if (itemIndex >= 0) {
        state.items[itemIndex].qunatity++;
      } else {
        state.items.push({ ...action.payload, qunatity: 1 });
      }
      Cookies.set("cart", JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<string>) {
      const itemIndex = state.items.findIndex(
        (item) => item.id === action.payload
      );

      if (state.items[itemIndex].qunatity === 1) {
        state.items.splice(itemIndex, 1);
      } else {
        state.items[itemIndex].qunatity--;
      }
      Cookies.set("cart", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

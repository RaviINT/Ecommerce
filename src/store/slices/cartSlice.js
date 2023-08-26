import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};
export const cartSlice = createSlice({
  initialState,
  name: "cartSlice",
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
    },
    removeCart: (state, action) => {
      const newData = state.cart.filter((item) => item.id !== action.payload);
      state.cart = newData;
    },
  },
});

export const { addToCart, removeCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Cart } from "../../types";

// Define a type for the slice state
type CartState = {
  id: string
  cart: Cart
}

// Define the initial state using that type
const initialState = { id: "", cart: {} } as CartState

export const cartSlice = createSlice({
  name: "cart",
   // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload
    }
  }
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
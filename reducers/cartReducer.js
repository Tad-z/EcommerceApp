import { createSlice } from "@reduxjs/toolkit";

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    setCart: (state, action) => {
      let { cartItems } = action.payload;
      return {
        ...state,
        cart: cartItems,
      };
    },
    updateCart: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.cart.find(
        (element => element.CartId === productId)
      );
        if (product) {
            product.quantity = quantity;
        }
    },
  },
});

export const { setCart, updateCart } = cartReducer.actions;

export default cartReducer.reducer;

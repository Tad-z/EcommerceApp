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
    removeItemFromCart: (state, action) => {
      const { productId } = action.payload;
      const filteredCart = state.cart.filter(
        (element => element.CartId !== productId)
      );
      return {
        ...state,
        cart: filteredCart,
      };
    }
  },
});

export const { setCart, updateCart, removeItemFromCart } = cartReducer.actions;

export default cartReducer.reducer;

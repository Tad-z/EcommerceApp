import { createSlice } from "@reduxjs/toolkit";

export const cartReducer = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    price: 0,
    cartItems: 0,
  },
  reducers: {
    setCart: (state, action) => {
      let { cartItems } = action.payload;
      const subtotal = state.cart.reduce(
        (a, c) => a + c.product.price * c.quantity, 0
      );
      return {
        ...state,
        cart: cartItems,
        cartItems: cartItems.length,
        price: subtotal,
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
    addToCart: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems + 1,
      };
    },
    removeItemFromCart: (state, action) => {
      const { productId } = action.payload;
      const filteredCart = state.cart.filter(
        (element => element.CartId !== productId)
      );
      return {
        ...state,
        cart: filteredCart,
        cartItems: filteredCart.length,
      };
    },
    clearCart: (state) => {
      return {
        ...state,
        cart: [],
        price: 0,
        cartItems: 0,
      };
    }
  },
});

export const { setCart, updateCart,addToCart, removeItemFromCart, clearCart  } = cartReducer.actions;

export default cartReducer.reducer;

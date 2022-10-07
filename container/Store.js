import axios from "axios";
import { createContext, useEffect, useReducer, useState } from "react";
 

export const Store = createContext();

export const ACTIONS = {
    REMOVE_FROM_CART: "remove-items"
}

const initialState = {
    cart: { cartItems: [] },
};

function reducer(state, action) {
    switch (action.type) {
        case ACTIONS.REMOVE_FROM_CART: {
           const cartItems = state.cart.cartItems.filter(item => item.CartId !== action.payload.id)
           return {...state, cart: {...state.cart, cartItems}}; 
        }
        default:
            return state;
    }
}


export function StoreProvider({ children }) {
    // const [cart, setCart] = useState([]);

    // const getCart = async () => {
    //     const defaultEndpoint = "http://localhost:4000/cart"
    //     const response = await fetch(defaultEndpoint)
    //     const cartItems = await response.json()

    //     setCart(cartItems)
    // }

    // useEffect(() => {
    //     getCart()
    // }, [])
    // const { data = [] } = cart
    // const cartItems = data
    // const initialState = {
    //     cartItems: cartItems
    // }

    const [state, dispatch] = useReducer(reducer, initialState);
    const value = { state, dispatch };
    return <Store.Provider value={value}>{children}</Store.Provider>
}
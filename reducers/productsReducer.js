import { createSlice } from "@reduxjs/toolkit"

export const productReducer = createSlice({ 
    name: "products",
    initialState: {
        queue: []
    },
    reducers: {
        setProducts: (state, action) => {
            let { product } = action.payload;
            return {
                ...state,
                queue: product
            }
        },
    },  
})

export const { setProducts } = productReducer.actions;

export default productReducer.reducer;
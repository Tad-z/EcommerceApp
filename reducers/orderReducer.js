import { createSlice } from "@reduxjs/toolkit"

export const orderReducer = createSlice({ 
    name: "order",
    initialState: {
        queue: []
    },
    reducers: {
        setOrder: (state, action) => {
            let { order } = action.payload;
            return {
                ...state,
                queue: order
            }
        },
    },  
})

export const { setOrder } = orderReducer.actions;

export default orderReducer.reducer;
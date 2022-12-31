import { createSlice } from "@reduxjs/toolkit"

export const loginReducer = createSlice({ 
    name: "loginDetails",
    initialState: {
        username: null
    },
    reducers: {
        setUsername: (state, action) => {
            let { username } = action.payload;
            return {
                ...state,
                username: username
            }
        },
    },  
})

export const { setUsername } = loginReducer.actions;

export default loginReducer.reducer;
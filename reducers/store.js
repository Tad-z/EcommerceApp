import { combineReducers, configureStore } from '@reduxjs/toolkit'

/** call reducers */
import productReducer  from './productsReducer'
import cartReducer from './cartReducer'
import loginReducer from './loginReducer'

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    loginDetails: loginReducer
})

export default configureStore({ reducer: rootReducer })

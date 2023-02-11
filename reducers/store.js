import { combineReducers, configureStore } from '@reduxjs/toolkit'

/** call reducers */
import productReducer  from './productsReducer'
import cartReducer from './cartReducer'
import loginReducer from './loginReducer'
import orderReducer from './orderReducer'

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer,
    loginDetails: loginReducer,
    order: orderReducer
})

export default configureStore({ reducer: rootReducer })

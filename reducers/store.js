import { combineReducers, configureStore } from '@reduxjs/toolkit'

/** call reducers */
import productReducer  from './productsReducer'
import cartReducer from './cartReducer'

const rootReducer = combineReducers({
    products: productReducer,
    cart: cartReducer
})

export default configureStore({ reducer: rootReducer })
// const rootReducer = combineReducers({
//     questions : questionReducer,
//     result: resultReducer
// })

/** create store with reducer */
// export default configureStore({ reducer: productReducer })
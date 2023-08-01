import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../pages/api/helper";

import * as Action from "../reducers/cartReducer";


export const useFetchCart = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });
    
    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        (async () => {
            const { data  } = await getServerData(`https://emaxapi.onrender.com/cart`);
            let cartItems = data.cartItems;
            try {
              if (cartItems.length > 0) {
                setGetData((prev) => ({ ...prev, isLoading: false }));
                setGetData((prev) => ({ ...prev, apiData: { cartItems } }));
      
                /** dispatch an action */
                dispatch(Action.setCart({ cartItems }));
              } else {
                throw new Error("No Products Avalibale");
              }
            } catch (error) {
              setGetData((prev) => ({ ...prev, isLoading: false }));
              setGetData((prev) => ({ ...prev, serverError: error }));
            }
        })();
    }, [dispatch]);
    
    return [getData, setGetData];
}
   

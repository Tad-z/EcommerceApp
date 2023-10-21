import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../pages/api/helper";

import * as Action from "../reducers/orderReducer";


export const useFetchOrder = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        loading: false,
        data: [],
        error: null,
    });
    
    useEffect(() => {
        setGetData((prev) => ({ ...prev, loading: true }));

        (async () => {
            const { data  } = await getServerData(`https://emaxapi.onrender.com/orders`);
            let order = data.order;
            try {
              if (order.length > 0) {
                setGetData((prev) => ({ ...prev, loading: false }));
                setGetData((prev) => ({ ...prev, data: { order } }));
      
                /** dispatch an action */
                dispatch(Action.setOrder({ order }));
              } else {
                throw new Error("No Order Avalibale");
              }
            } catch (error) {
              setGetData((prev) => ({ ...prev, loading: false }));
              setGetData((prev) => ({ ...prev, error: error }));
            }
        })();
    }, [dispatch]);
    
    return [getData, setGetData];
}
   

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getServerData } from "../pages/api/helper";

import * as Action from "../reducers/orderReducer";


export const useFetchOrder = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });
    
    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        (async () => {
            const { data  } = await getServerData(`http://localhost:4000/orders/`);
            let order = data.order;
            try {
              if (order.length > 0) {
                setGetData((prev) => ({ ...prev, isLoading: false }));
                setGetData((prev) => ({ ...prev, apiData: { order } }));
      
                /** dispatch an action */
                dispatch(Action.setOrder({ order }));
              } else {
                throw new Error("No Order Avalibale");
              }
            } catch (error) {
              setGetData((prev) => ({ ...prev, isLoading: false }));
              setGetData((prev) => ({ ...prev, serverError: error }));
            }
        })();
    }, [dispatch]);
    
    return [getData, setGetData];
}
   

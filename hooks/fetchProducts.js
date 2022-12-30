import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ApiCall, { getServerData } from "../pages/api/helper";

import * as Action from "../reducers/productsReducer";

export const useFetchProducts = () => {
    const dispatch = useDispatch();
    const [getData, setGetData] = useState({
        isLoading: false,
        apiData: [],
        serverError: null,
    });
    
    useEffect(() => {
        setGetData((prev) => ({ ...prev, isLoading: true }));

        (async () => {
            // const page = Number(query.page) || 1;
//   const defaultEndpoint = `http://localhost:4000/products/page/?page=${page}`
//   const res = await fetch(defaultEndpoint);
//   const data = await res.json();

  // const products = result.products;
            const { data } = await getServerData(`http://localhost:4000/products/`);
            // let products = result.products;
            console.log(data.products);
            let products = data.products;
            try {
              if (products.length > 0) {
                setGetData((prev) => ({ ...prev, isLoading: false }));
                setGetData((prev) => ({ ...prev, apiData: { products } }));
      
                /** dispatch an action */
                dispatch(Action.setProducts({ product: products }));
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
   

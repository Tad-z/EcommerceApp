// import { StoreProvider } from "../reducers/store";
import "../styles/globals.css";
import * as dotenv from "dotenv";
dotenv.config()
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import store from "../reducers/store";
import { Provider } from "react-redux";

// const MyContext = React.createContext();
// export const axiosInstance = axios.create({
//   baseURL: "http://localhost:4000/cart",
// });
function MyApp({ Component, pageProps }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [token, setToken] = useState("");

  
  // const auth = async () => {
  //   axiosInstance.interceptors.request.use(
  //     (config) => {
  //       if (typeof window !== "undefined") {
  //         const userToken = window.localStorage.getItem("token");
  //         console.log("userToken", userToken);
  //         setToken(userToken);
  //         const authentication = window.localStorage.getItem("isAuthenticated");
  //         setIsAuthenticated(authentication);
  //         if (token) {
  //           config.headers.Authorization = `Bearer ${token}`;
  //           return config;
  //         }
  //       }
  //       return config;
  //     },
  //     (error) => {
  //       return Promise.reject(error);
  //     }
  //   );
  // };

  // useEffect(() => {
  //   auth();
  // });

  // console.log("isAuthenticated", isAuthenticated);
  // console.log("Bearer", token);
  // use the next route and make sure protected pages are accessed only when users are logged in

  return (
    <Provider store={store}>
        {/* {isAuthenticated && */}
        <Component {...pageProps} />
        {/* } */}
    </Provider>
  );
}

export default MyApp;

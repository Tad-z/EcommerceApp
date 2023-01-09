// import { StoreProvider } from "../reducers/store";
import "../styles/globals.css";
import * as dotenv from "dotenv";
dotenv.config();
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import store from "../reducers/store";
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

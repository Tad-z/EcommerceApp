// import { StoreProvider } from "../reducers/store";
import "../styles/globals.css"
import * as dotenv from "dotenv";
dotenv.config();
import React from "react";
import store from "../reducers/store";
import { RingLoader } from "react-spinners"
import { Provider } from "react-redux";
import Router from "next/router";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {

    const start = () => {
      setLoading(true);
    };
    const end = () => {
      setLoading(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);
  return (
    <Provider store={store}>
      {loading ? (
        <div className="loader-container">
          <div>
            <RingLoader
              color='#5e4c34'
              loading={loading}
              size={80}
            />
          </div>
        </div>
      ) : (
        <Component {...pageProps} />
      )}
    </Provider>
  );
}



// export default MyApp;

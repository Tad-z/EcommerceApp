import React, { useContext, useEffect, useState } from "react";
import ApiCall from "../pages/api/hello";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";


const Header = ({ title }) => {
  const [cart, setCart] = useState([]);
  const [auth, setAuth] = useState("");
  const router = useRouter()
  const getCart = async () => {
    const cartItems = await ApiCall.getMethod("http://localhost:4000/cart");
    if (!cartItems) {
      setCart([]);
    } else {
      setCart(cartItems);
    }
  };
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isauth = window.localStorage.getItem("isAuthenticated");
      setAuth(isauth);
      console.log(auth);
    }
    getCart();
    // navItemsHandler()
  }, []);

  const { data = [] } = cart;
  const cartItems = data;
 
  return (
    <>
      <Head>
        <title>{title ? title + "-EcomerceApp" : "EcommerceApp"}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} autoClose={5000} />

      {/* min h screen sets the page to full height */}
      <header>
        <nav className="flex mb-10 h-12 w-full items-center bg-slate-50 fixed px-4 justify-between shadow-md">
          <Link href="/">
            <a className="text-lg font-bold">EcomerceApp</a>
          </Link>

          <div>
            {auth == "true" && (
              <>
                <Link href="/cart">
                  <a className="p-2">
                    Cart
                    {cartItems.length > 0 && (
                      <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font bold text-white">
                        {cartItems.length}
                      </span>
                    )}
                  </a>
                </Link>
                <Link onClick={() => {
                  localStorage.removeItem("token")
                  localStorage.removeItem("isAuthenticated")
                  router.push('/')}}>
                  <a className="p-3">Logout</a>
                </Link>
              </>
            )}
            {auth == null && (
              <>
                <Link href="/signup">
                  <a className="p-2">Signup</a>
                </Link>
                <Link href="/login">
                  <a className="p-2">Login</a>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;

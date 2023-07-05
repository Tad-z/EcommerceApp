import React, { useContext, useEffect, useState } from "react";
import ApiCall from "../pages/api/helper";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import { useFetchCart } from "../hooks/fetchCart";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";

const Header = ({ title }) => {
  const [auth, setAuth] = useState("");
  const [username, setUsername] = useState("")
  const router = useRouter();
  useFetchCart();
  useSelector((state) => console.log(state));
  const cartItems = useSelector((state) => state.cart.cart);
  const usernamee = useSelector((state) => state.loginDetails.username);

  useEffect(() => {
    if (typeof window !== "undefined" || usernamee !== null) {
      const isauth = window.localStorage.getItem("isAuthenticated");
      setAuth(isauth);
      window.localStorage.setItem("username", usernamee);
      let username = window.localStorage.getItem("username");
      setUsername(username);
    }
  },[]);

  return (
    <>
      <Head>
        <title>{title ? title + "-EcomerceApp" : "EcommerceApp"}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} autoClose={3000} />

      {/* min h screen sets the page to full height */}
      <header>
        <nav className="flex mb-10 h-12 w-full items-center bg-slate-50 fixed px-4 justify-between shadow-md">
          <Link href="/">
            <a className="text-lg font-bold">EcomerceApp</a>
          </Link>
          <div className="flex justify-center">
            {auth == "true" && (
              <>
                <a className="p-2">{`Hey ${username}`}</a>
                <Link href="/cart">
                  <a className="p-2 ">
                    Cart
                    {cartItems.length > 0 && (
                      <span className="bg-red-500 ml-1 rounded-full text-sm px-2 py-1">
                        {cartItems.length}
                      </span>
                    )}
                  </a>
                </Link>
                <a
                  className="p-2 cursor-pointer"
                  onClick={() => {
                    localStorage.clear();
                    router.push("/");
                  }}
                >
                  Logout
                </a>
              </>
            )}
            {auth == null && (
              <>
                <Link href="/signup">
                  <a className="p-2 bg-amber-500 rounded-sm hover:bg-amber-600">Signup</a>
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

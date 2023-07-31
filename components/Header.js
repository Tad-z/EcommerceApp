import React, { useContext, useEffect, useState } from "react";
import ApiCall from "../pages/api/helper";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import { ToastContainer } from "react-toastify";
import { useFetchCart } from "../hooks/fetchCart";
import { useDispatch, useSelector } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import logo from "../assets/logo2.jpg";

const Header = ({ title }) => {
  const [auth, setAuth] = useState("");
  const [username, setUsername] = useState("")
  const router = useRouter();
  useFetchCart();
  useSelector((state) => console.log(state));
  const cartItems = useSelector((state) => state.cart.cart);
  const usernamee = useSelector((state) => state.loginDetails.username);
  const forceRefresh = () => {
    window.location.reload(true);
  };

  useEffect(() => {
    
    if (typeof window !== "undefined" || usernamee !== null) {
      const isauth = window.localStorage.getItem("isAuthenticated");
      setAuth(isauth);
      window.localStorage.setItem("username", usernamee);
      let username = window.localStorage.getItem("username");
      setUsername(username);
    }
  
  }, []);

  return (
    <div>
      <Head>
        <title>{title ? title + "-EcomerceApp" : "EcommerceApp"}</title>
        <meta name="description" content="Ecommerce website, sells clothes,shoes,jeans,hoodies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} autoClose={3000} />

      {/* min h screen sets the page to full height */}
      <header>
        <nav className="flex py-1 h-14 w-full items-center bg-[#f3f3eb] z-[9999] fixed top-0 px-5 justify-between shadow-md">
          <Link href="/">
            <Image 
              src={logo}
              height={50}
              width={150}
            />
          </Link>

          <div className="flex justify-center items-center gap-8 ">
            <Link href="#products"  scroll={false}>
              <p className={styles.navLinks}>Shop</p>
            </Link>
            {auth == "true" && (
              <>
                <a className={styles.navLinks}>{`Hey ${username}`}</a>
                <Link href="/cart">
                  <p className={styles.navLinks}>
                    Cart
                    {cartItems.length > 0 && (
                      <span className="bg-red-500 ml-1 rounded-full text-sm px-2 py-1">
                        {cartItems.length}
                      </span>
                    )}
                  </p>
                </Link>
                <a
                  href="/"
                  className={styles.navLinks}
                  onClick={() => {
                    localStorage.clear(); 
                    forceRefresh()
                  }}
                >
                  Logout
                </a>
              </>
            )}
            {auth == null && (
              <>
                <Link href="/login">
                  <p className={styles.loginButton}>Login</p>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;

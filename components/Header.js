import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import { ToastContainer } from "react-toastify";
import { useFetchCart } from "../hooks/fetchCart";
import { useSelector } from "react-redux";
import { GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo2.jpg";

const Header = ({ title }) => {
  const [auth, setAuth] = useState("");
  const [username, setUsername] = useState("")
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen((prevState) => !prevState);
  };
  const [isFixed, setIsFixed] = useState(false);

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

    const handleScroll = () => {
      let y = window.scrollY;
      console.log("scroll", y);
      if (y > visualViewport.height) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };

  }, [usernamee]);

  return (
    <div>
      <Head>
        <title>{title ? title + "-EcomerceApp" : "EcommerceApp"}</title>
        <meta name="description" content="Ecommerce website, sells clothes,shoes,jeans,hoodies" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position="bottom-center" limit={1} autoClose={3000} />

      {/* min h screen sets the page to full height */}
      <header className={`header ${isFixed ? "fixed" : ""}`}>
        <Link href="/">
          <Image
            src={logo}
            height={50}
            width={150}
            alt="logo"
          />
        </Link>
        <nav className={`main-nav ${mobileNavOpen ? "active" : ""}`}>
          <div className="flex justify-center items-center gap-8 flex-col lg:flex-row">
            <div className="mobile-nav-links">
              <Link href="#products" scroll={false}>
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
                  <Link href="/">
                    <a
                      className={styles.navLinks}
                      onClick={() => {
                        localStorage.clear();
                        forceRefresh()
                      }}
                    >
                      Logout
                    </a>
                  </Link>
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
          </div>
        </nav>
        <button className="btn-mobile-nav" onClick={toggleMobileNav}>
          <GiHamburgerMenu
            className={`icon-mobile-nav ${mobileNavOpen ? "hidden" : ""}`}
            name="menu-outline"
          />
          <GrClose
            className={`icon-mobile-nav ${mobileNavOpen ? "" : "hidden"}`}
            name="close-ouline"
          />
        </button>
      </header>
    </div>
  );
};

export default Header;

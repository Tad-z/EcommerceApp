import React, { useEffect, useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import { ToastContainer } from "react-toastify";
import { GiHamburgerMenu } from "react-icons/gi"
import { GrClose } from "react-icons/gr"
import Link from "next/link";
import Image from "next/image";
import logo from "../assets/logo2.jpg";
import { useRouter } from "next/router";
import { getServerData } from "../pages/api/helper";
import { AiOutlineShoppingCart } from "react-icons/ai";




const Header = ({ title }) => {
  const [name, setName] = useState("user");
  const [length, setLength] = useState();
  const [auth, setAuth] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [tokenExpireTime, setTokenExpireTime] = useState("");
  const toggleMobileNav = () => {
    setMobileNavOpen((prevState) => !prevState);
  };
  const [isFixed, setIsFixed] = useState(false);

  const getCartItems = async () => {
    try {
      const cartItems = await getServerData("https://emaxapi.onrender.com/cart")
      if (!cartItems) return
      const { data } = cartItems
      let count = data.count
      console.log("count", count);
      if (count) {
        setLength(count)
      }
      return count;
    } catch (error) {
      console.log(error.message)
    }
  }


  // useFetchCart();
  // useSelector((state) => console.log(state));
  // const cartItems = useSelector((state) => state.cart.cart);

  useEffect(() => {
    checkTokenExpiration();
    getCartItems();
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("username")
      setName(user);
      const isauth = window.localStorage.getItem("isAuthenticated");
      setAuth(isauth);
    }
    const handleScroll = () => {
      // getCartItems()
      let y = window.scrollY;
      console.log("scroll", y);
      if (y > visualViewport.height) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    const tokenExpirationCheckInterval = setInterval(() => {
      checkTokenExpiration();
    }, 1800000);

    const handleClick = async () => {
      await getCartItems()
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(tokenExpirationCheckInterval);
    };
  }, []);

  const router = useRouter();

  // Logout function
  const handleLogout = async () => {
    localStorage.clear();

    await router.push("/");
    window.location.reload();
  };

  // Logout after 1 hour
  const checkTokenExpiration = () => {
    if (typeof window === "undefined") return;
    const expireTime = localStorage.getItem("tokenExpireTime");
    if (!expireTime) return
    console.log({ expireTime });
    if (expireTime) {
      const currentTime = new Date().getTime();
      console.log("currentTime", currentTime);
      if (currentTime > parseInt(expireTime)) {
        handleLogout();
      }
    }
  };

  return (
    <div>
      <Head>
        <title>{title ? title + "-EMAX" : "EMAX"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Ecommerce website, sells clothes,shoes,jeans,hoodies" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="icon" sizes="32x32" href="/favicon.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
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
                  <a className={styles.navLinks}>{`Hey ${name}`}</a>
                  <Link href="/cart">
                    <p className={styles.navLinks}>
                      <span className="flex items-center">
                        <AiOutlineShoppingCart size={26} />
                        {length > 0 && (
                          <sup className="bg-[#946F3A] ml-1 rounded-full text-sm px-2 py-1">
                            {length}
                          </sup>
                        )}
                      </span>
                    </p>
                  </Link>
                  <Link href="/">
                    <a
                      className={styles.navLinks}
                      onClick={handleLogout}

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

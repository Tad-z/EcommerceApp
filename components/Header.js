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
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";




const Header = ({ title }) => {
  const [name, setName] = useState("user");
  const [length, setLength] = useState();
  const [auth, setAuth] = useState("");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const toggleMobileNav = () => {
    setMobileNavOpen((prevState) => !prevState);
  };
  const [isFixed, setIsFixed] = useState(false);


  useSelector((state) => console.log({state}));
  const count = useSelector((state) => state.cart.cartItems);
  

  useEffect(() => {
    if(count) {
      console.log(count);
      setLength(count)
    }
    checkTokenExpiration();
    if (typeof window !== "undefined") {
      const user = localStorage.getItem("username")
      setName(user);
      const isauth = window.localStorage.getItem("isAuthenticated");
      setAuth(isauth);
    }
    const handleScroll = () => {
      let y = window.scrollY;
      if (y > visualViewport.height) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    const tokenExpirationCheckInterval = setInterval(() => {
      checkTokenExpiration();
    }, 1800000);


    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(tokenExpirationCheckInterval);
    };
  }, [count]);

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
    if (expireTime) {
      const currentTime = new Date().getTime();
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

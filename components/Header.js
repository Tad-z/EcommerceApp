import React, { useContext, useEffect, useState } from 'react'
import ApiCall from '../pages/api/hello';
import Head from 'next/head'
import { ToastContainer } from 'react-toastify';
import Link from 'next/link'

const Header = ({ title }) => {
  const [cart, setCart] = useState([]);
  const getCart = async () => {
    const token = localStorage.getItem("token")
    const cartItems = await ApiCall.getMethod("http://localhost:4000/cart", {
      headers: {
        Authorization: token
      }
    })
    if (!cartItems) {
      setCart([])
    } else {
      setCart(cartItems)
    }
  }
  useEffect(() => {
    getCart()
  })

  const { data = [] } = cart
  const cartItems = data


  return (
    <>
      <Head>
        <title>{title ? title + "-EcomerceApp" : "EcommerceApp"}</title>
        <meta name="description" content="Ecommerce website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ToastContainer position='bottom-center' limit={1} autoClose={5000} />

      {/* min h screen sets the page to full height */}
      <header>
        <nav className='flex mb-10 h-12 w-full items-center bg-slate-50 fixed px-4 justify-between shadow-md'>

          <Link href="/">
            <a className='text-lg font-bold'>EcomerceApp</a>
          </Link>

          <div>
            <Link href="/cart"><a className='p-2'>Cart
              {cartItems.length > 0 && (
                <span className='ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font bold text-white'>
                  {cartItems.length}
                </span>
              )}

            </a></Link>
            
              {/* {!localStorage.getItem("isAuthenticated") && ( */}
                <>
                  <Link href="/signup"><a className='p-2'>Signup</a></Link>
                  <Link href="/login"><a className='p-2'>Login</a></Link>
                </>
                           {/* )} */}
            </div>
        </nav>
      </header>
    </>
  )
}

export default Header
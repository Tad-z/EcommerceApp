import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ColorRing } from "react-loader-spinner";
import CardCart from "../components/CardCart";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Main from "../components/Main";
import ApiCall from "./api/helper";
import { useFetchCart } from "../hooks/fetchCart";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateCart } from "../reducers/cartReducer";
import styles from "../styles/Home.module.css";

export default function CartScreen() {
  const dispatch = useDispatch();
  const [{ isLoading, serverError, apiData }] = useFetchCart();
  useSelector((state) => console.log(state));
  const cartItems = useSelector((state) => state.cart.cart);
  console.log("p",cartItems);
  

  const router = useRouter();
  if (isLoading)
    return (
      <div className="loader-container">
        <div>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      </div>
    );

  if (serverError)
    return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

  const removeItemHandler = async (item) => {
    const productId = item.CartId;
    dispatch(removeItemFromCart({ productId }));
    await axios.delete(`https://emaxapi.onrender.com/cart/${productId}`);
  };

  const updateProducts = async (item) => {
    console.log(item);
    const productId = item.CartId;
    console.log("id", productId);
    const post = { quantity: item.quantity };
    const quantity = item.quantity;
    dispatch(updateCart({ productId, quantity }));
    console.log("q", quantity);
    await axios.patch(`https://emaxapi.onrender.com/cart/${productId}`, post);
  };

  return (
    <>
      <Header title="Shopping Cart" />
      <div className="p-4">  
        {cartItems?.length === 0 ? (
          <div>
            <h1 className="my-7 text-xl font-bold">Shopping Cart</h1>
            <p>Cart is empty. <Link href="/">Continue Shopping</Link></p>
          </div>
        ) : (
          <>
            <h1 className="mt-11 mb-6 text-xl font-bold">Shopping Cart</h1>
            <div className="grid md:grid-cols-4 md:gap-3 sm: grid-rows-2">
              <div className="overflow-x auto md:col-span-3">
                <table className="min-w-full ">
                  <thead className="border-b ">
                    <tr>
                      <th className="px-5 sm:text-lg text-left">Products</th>
                      <th className="p-5 sm:text-lg text-center">Price</th>
                      <th className="p-5 sm:text-lg text-right">Quantity</th>
                      <th className="p-5 sm:text-lg">Total</th>
                      <th className="p-5 sm:text-lg text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems?.map((item) => (
                      <>
                        <CardCart
                          key={item.slug}
                          updateProducts={updateProducts}
                          removeItemHandler={removeItemHandler}
                          item={item}
                        />
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="checkout-card place-self-center p-5">
                <ul>
                  <li>
                    <div className="pb-3 text-xl">
                      Subtotal ({cartItems?.length}) : N
                      {cartItems?.reduce(
                        (a, c) => a + c.product.price * c.quantity,
                        0
                      )}
                    </div>
                  </li>
                  <li>
                    <button
                      onClick={() => router.push("/shipping")}
                      className={styles.addtocartbutton}
                    >
                      Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

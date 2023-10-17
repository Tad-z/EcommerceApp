import axios from "axios";
import Link from "next/link";
import React from "react";
import CardCart from "../components/CardCart";
import { useRouter } from "next/router";
import Header from "../components/Header";
import { useFetchCart } from "../hooks/fetchCart";
import { useDispatch, useSelector } from "react-redux";
import { removeItemFromCart, updateCart } from "../reducers/cartReducer";
import styles from "../styles/Home.module.css";
import { RingLoader } from "react-spinners"

export default function CartScreen() {
  const dispatch = useDispatch();
  const [{ isLoading }] = useFetchCart();
  useSelector((state) => console.log(state));
  const cartItems = useSelector((state) => state.cart.cart);



  const router = useRouter();
  if (isLoading)
    return (
      <div className="loader-container">
        <div>
          <RingLoader
            color='#5e4c34'
            loading={isLoading}
            size={80}
          />
        </div>
      </div>
    );

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
      <div className={styles.tableContainer}>
        {cartItems ? (
          <>
            {cartItems?.length === 0 ? (
              <div>
                <h1 className="my-7 text-xl font-bold">Shopping Cart</h1>
                <p>Cart is empty. <span className="hover:underline"><Link href="/">Continue Shopping</Link></span></p>
              </div>
            ) : (
              <>
                <h1 className="mt-11 mb-6 text-xl font-bold">Shopping Cart</h1>
                <div className="grid grid-cols-4 ">
                  <div className="md:col-span-3 lg:col-span-3">
                    <div>
                      <table className="min-w-full">
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
          </>
        ) : (
          <div>
            <h1 className="my-7 text-xl font-bold">Shopping Cart</h1>
            <p>Cart is empty. <span className="hover:underline"><Link href="/">Continue Shopping</Link></span></p>
          </div>
        )}
      </div>
    </>
  );
}

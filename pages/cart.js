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
    const productId = item.CartId;
    const post = { quantity: item.quantity };
    const quantity = item.quantity;
    dispatch(updateCart({ productId, quantity }));

    await axios.patch(`https://emaxapi.onrender.com/cart/${productId}`, post);
  };


  return (
    <>
      <Header title="Shopping Cart" />
      <div className={styles.tableContainer}>
        {cartItems ? (
          <>
            {cartItems?.length === 0 ? (
              <div className="mx-auto">
                <h1 className="my-7  text-xl font-bold">Shopping Cart</h1>
                <p>Cart is empty. <span className="hover:underline"><Link href="/">Continue Shopping</Link></span></p>
              </div>
            ) : (
              <div className="m-4 lg:m-9">
                <h1 className="mt-11 mb-6 text-xl font-bold">Shopping Cart</h1>
                <div className="grid grid-cols-4 gap-10">
                  <div className="md:col-span-3 lg:col-span-3">
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
                  </div>
                  <div className="checkout-card mx-auto place-self-start p-5">
                    <ul>
                      <li className="text-center border-b text-xl font-bold my-4 py-1">
                        Order Summary ({cartItems?.length} items)
                      </li>
                      <li>
                        <div className="flex justify-between">
                          <p>Shipping</p>
                          <div>N0.00</div>
                        </div>
                      </li>
                      <li>
                        <div className="flex justify-between border-dotted pb-3 border-b-2">
                          <p>Taxes</p>
                          <div>N0.00</div>
                        </div>
                      </li>
                      <li className="py-5">
                        <div className="flex justify-between">
                          <p>Order Total</p>
                          <div>₦{cartItems?.reduce(
                            (a, c) => a + c.product.price * c.quantity,
                            0
                          )}</div>
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
              </div>
            )}
          </>
        ) : (
          <div className="mx-auto">
            <h1 className="my-7 text-xl font-bold">Shopping Cart</h1>
            <p>Cart is empty. <span className="hover:underline"><Link href="/">Continue Shopping</Link></span></p>
          </div>
        )}
      </div>
    </>
  );
}

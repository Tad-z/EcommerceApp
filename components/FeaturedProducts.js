import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postServerData } from "../pages/api/helper";
import { getError } from "../reducers/error";
import { useRouter } from "next/router";
import style from "../styles/Home.module.css";
import { useDispatch } from "react-redux";

import * as Action from "../reducers/cartReducer";


const defaultEndpoint = "https://emaxapi.onrender.com/products"
export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint);
    const data = await res.json();
    return { props: { data } }
}


export default function FeaturedProducts({ product }) {
  const dispatch = useDispatch();
    const router = useRouter();
    const addToCartHandler = async () => {
        if (typeof window !== "undefined") {
          const auth = window.localStorage.getItem("isAuthenticated");
          if (auth == null) {
            router.push("/login");
          } else {
            try {
              const post = { productId: product._id };
              const result = await postServerData(
                `https://emaxapi.onrender.com/cart`,
                post
              );
              dispatch(Action.addToCart());
              
              if (result) {
                toast("You have added to cart successfully");
              } else {
                toast.error("Something went wrong");
              }
            } catch (err) {
              toast.error(getError(err));
            }
          }
        }
      };
    return (
        <div className={style.cardBest}>
            <img className={style.cardImage} alt={product.name} src={`https://emaxapi.onrender.com/${product.productImage}`} />
            <div className='flex flex-col justify-center px-5 py-3'>
                <h2 className='text-lg text-left'>{product.title}</h2>
                <h2 className='mb-2 text-left text-lg font-bold'>₦{product.price}</h2>
                <button
                    type="button"
                    onClick={addToCartHandler}
                    className={style.addtocartbuttonn}
                >
                    Add to cart
                </button>
            </div>
        </div>


    )
}
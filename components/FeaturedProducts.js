import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postServerData } from "../pages/api/helper";
import { getError } from "../reducers/error";
import { useRouter } from "next/router";
import style from "../styles/Home.module.css";


const defaultEndpoint = "https://emaxapi.onrender.com/products"
export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint);
    const data = await res.json();
    return { props: { data } }
}


export default function FeaturedProducts({ product }) {
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
              
              if (result) {
                toast("You have added to cart successfully");
                console.log("success");
                // router.push("/cart");
              } else {
                toast.error("Something went wrong");
                console.log("error1");
              }
            } catch (err) {
              toast.error(getError(err));
              console.log("error2");
            }
          }
        }
      };
    return (
        <div className={style.cardBest}>
            <img className={style.cardImage} alt={product.name} src={`https://emaxapi.onrender.com/${product.productImage}`} />
            <div className='flex flex-col justify-center px-5 py-3'>
                <h2 className='text-lg text-left'>{product.title}</h2>
                <h2 className='mb-2 text-left text-lg font-bold'>N{product.price}</h2>
                 {/* <Link href={`/product/${product.slug}`}>
                    <button type="button" className='w-[80%] text-[#333] my-2 mx-auto block rounded-md border-[#946f3a] py-1 px-1 bg-white'>
                        View product details
                    </button>
                 </Link> */}
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
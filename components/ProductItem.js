import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postServerData } from "../pages/api/helper";
import { getError } from "../reducers/error";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

export default function ProductItem({ product }) {
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
    <div className={styles.card}>
      <img
        className={styles.cardImage}
        alt={product.name}
        src={`https://emaxapi.onrender.com/${product.productImage}`}
      />
      <div className="flex flex-col justify-center p-5">
        <h2 className="text-lg text-left">{product.title}</h2>
        <h2 className="mb-5 text-left text-lg font-bold">₦{product.price}</h2>
        <Link href={`/product/${product.slug}`}>
          <button type="button" className={styles.viewdetailsbutton}>
            View product details
          </button>
        </Link>
        <button
          id="button"
          type="button"
          onClick={addToCartHandler}
          className={styles.addtocartbutton}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

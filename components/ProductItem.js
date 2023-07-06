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
            `http://localhost:4000/cart/`,
            post
          );
          if (result) {
            toast("You have added to cart successfully");
            console.log("success");
            router.push("/cart");
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
    <div className={styles.card}>
      <img
        className="image"
        alt={product.name}
        src={`http://localhost:4000/${product.productImage}`}
      />
      <div className="flex flex-col justify-center p-5">
        <h2 className="text-lg text-left">{product.title}</h2>
        <h2 className="mb-5 text-left text-lg font-bold">N{product.price}</h2>
        <Link href={`/product/${product.slug}`}>
          <button type="button" className={styles.viewdetailsbutton}>
            View product details
          </button>
        </Link>
        <button
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

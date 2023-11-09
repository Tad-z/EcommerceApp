import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react'
import ReactStars from 'react-stars';
import Header from '../../components/Header';
import Main from '../../components/Main';
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import { postServerData } from '../api/helper';
import { getError } from '../../reducers/error';
import styles from '../../styles/Home.module.css'
import { useDispatch } from "react-redux";

import * as Action from "../../reducers/cartReducer";

export async function getServerSideProps() {
  const defaultEndpoint = `https://emaxapi.onrender.com/products`
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return { props: { data } }
}

export default function ProductScreen({ data }) {
  const dispatch = useDispatch();
  const { products = [] } = data || {};
  const router = useRouter();
  const { query } = useRouter()
  const { slug } = query;
  const ratingChanged = (newRating) => {
    console.log(newRating);
  }
  const product = products?.find((x) => x.slug === slug)

  const src = `https://emaxapi.onrender.com/${product.productImage}`
  if (!product) {
    return (
      <div>Page not found</div>
    )
  }
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
            // router.push("/cart");
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
    <>
      <Header title={product?.name} />
      <Main>
        {/* <div className='py-2 mt-8'>
          <Link href="/"><button className='back-to-products-button text-white'>Back to products</button></Link>
        </div> */}
        <div className='grid md:grid-cols-4 mt-10  mb-5 md:gap-3'>
          <div className='md:col-span-2 mt-8'>
            <Image
              loader={() => src}
              src={src}
              alt={product?.name}
              width={450}
              height={450}
              layout="responsive"
            ></Image>
          </div>
          <div className='md:col-span-2 mt-10 mx-5'>
            <ul>
              <li>
                <h1 className='text-3xl font-bold'>{product?.title}</h1>
              </li>
              <li>
                <ReactStars
                  count={5}
                  onChange={ratingChanged}
                  size={24}
                  color2={'#ffd700'}
                  value={4.0}></ReactStars>
              </li>
              <li>
                <p>
                  Add you viewing ten equally believe put. Separate families my on drawings do oh offended strictly elegance. Perceive jointure be mistress by jennings properly. An admiration at he discovered difficulty continuing. We in building removing possible suitable friendly on. Nay middleton him admitting consulted and behaviour son household. Recurred advanced he oh
                </p>
              </li>
              <br></br>
              <li>
                <h1 className='text-2xl text-red-500'>₦{product?.price}</h1>
              </li>
              <br></br>
              <li>
                <p><span className='font-bold'>Colour:</span> &nbsp; {product?.color}</p>
              </li>
              <br></br>
              <div className='flex items-center gap-2'>
                <p className='font-bold'>Size:</p>
                <div>
                  <button className='size-button'>M</button>
                  <button className='size-button'>L</button>
                  <button className='size-button'>XL</button>
                </div>
              </div>
              <li>
                <p><span className='font-bold'>Categories: &nbsp;</span> Men, Women</p>
                <br />
                <p><span className='font-bold'>Tag: &nbsp;</span> Fashion,Cool,Nigeria,USA</p>
              </li>
              <br />
              <li>
                <button type="button" className={styles.addtocartbutton} onClick={addToCartHandler}>Add to Cart</button>
              </li>
            </ul>
          </div>
        </div>
      </Main>
    </>
  )
}

import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import ApiCall from '../pages/api/hello';
import { getError } from '../container/error';
import { useRouter } from 'next/router'; 




export default function ProductItem({ product }) {
  const router = useRouter()
  // router.push('login?redirect=/index')
  const addToCartHandler = async () => {
    router.push('login?redirect=/cart')
    try {
      const post = { productId: product._id }
      const result = await ApiCall.postMethod(`http://localhost:4000/cart/`, post)
      if (result) {
        toast("You have added to cart successfully");
        console.log("success");
      } else {
        toast.error("Something went wrong")
        console.log("error1");
      }
    } catch (err) {
      toast.error(getError(err));
      console.log("error2");
    }

  }
  return (
    <div className='card'>
      <img className='image' alt={product.name} src={`http://localhost:4000/${product.productImage}`} />
      <div className='flex flex-col justify-center p-5'>
        <h2 className='text-lg text-left'>{product.title}</h2>
        <h2 className='mb-5 text-left text-lg font-bold'>N{product.price}</h2>
        <Link href={`/product/${product.slug}`}>
          <button type='button' className='view-details-button'>View product details</button>
        </Link>
        <button type="button" onClick={addToCartHandler} className='add-to-cart-button'>Add to cart</button>
      </div>

    </div>
  )
}

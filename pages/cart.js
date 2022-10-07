import axios from 'axios';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import CardCart from '../components/CardCart';
import { useRouter } from 'next/router';
import Header from '../components/Header';
import Main from '../components/Main';
import ApiCall from './api/hello';


const defaultEndpoint = "http://localhost:4000/cart"

export async function getServerSideProps() {
  const res = await ApiCall.getMethod(defaultEndpoint);
  return { props: { res } }  
}

export default function CartScreen({ res }) {
  const { data = [] } = res
  const [cartItems, setCartItems] = useState(data)
  const router = useRouter()

  const removeItemHandler = async (item) => {
    const filteredCart = cartItems.filter(items => items.CartId !== item.CartId)
    const id = item.CartId
    await axios.delete(`http://localhost:4000/cart/${id}`)

    setCartItems(filteredCart)
  }

 
  const updateProducts = async (item) => {
    console.log(item);
    const id = item.CartId
    console.log("id", id);
    const post = { "quantity": item.quantity }
    console.log("p", post);
    await axios.patch(`http://localhost:4000/cart/${id}`, post)

  }

  return (
    <>
      <Header title='Shopping Cart' />
      <Main>
        <h1 className='mb-4 text-xl font-bold'>Shopping Cart</h1>
        {
          cartItems.length === 0 ?
            (<div>
              Cart is empty. <Link href="/">Continue Shopping</Link>
            </div>) :
            (
              <>
              <h1 className='mb-4 text-xl font-bold'>Shopping Cart</h1>
              <div className="grid md: grid-cols-4 md:gap-5">
                <div className='overflow-x auto md:col-span-3'>
                  <table className='min-w-full'>
                    <thead className='border-b'>
                      <tr>
                        <th className="px-5 text-left">Products</th>
                        <th className="p-5 text-right">Price</th>
                        <th className="p-5 text-right">Quantity</th>
                        <th className="p-5">Total</th>
                        <th className="p-5 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {(cartItems).map((item) => (
                        <>
                          <CardCart key={item.slug} updateProducts={updateProducts} removeItemHandler={removeItemHandler} item={item} />
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className='checkout-card p-5'>
                  <ul>
                    <li>
                      <div className='pb-3 text-xl'>
                        Subtotal ({cartItems.length})
                        {' '}
                        : N
                        {cartItems.reduce((a, c) => a + c.product.price * c.quantity, 0)}
                      </div>
                    </li>
                    <li>
                      <button onClick={() => router.push('login?redirect=/shipping')} className='add-to-cart-button w-full'>
                        Checkout
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
              </>
            )
        }
      </Main>
    </>


  )
}

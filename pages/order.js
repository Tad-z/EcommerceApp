import React from 'react'
import Header from '../components/Header'
import CheckoutWizard from '../components/CheckoutWizard'
import styles from '../styles/Home.module.css'
import { clearCart } from '../reducers/cartReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchOrder } from '../hooks/fetchOrder'
import { useFetchCart } from '../hooks/fetchCart'
import CartOrder from "../components/CartOrder";
import Link from 'next/link'
import axios from 'axios'
import { RingLoader } from "react-spinners"




export default function Order() {
    const dispatch = useDispatch();
    const [{ isLoading, serverError }] = useFetchOrder();
    useFetchCart();
    const orders = useSelector((state) => state.order.queue);
    const cart = useSelector((state) => state.cart.cart);
    let total = useSelector((state) => state.cart.price);
    //    const cartItems = cart.map((item) => {
    //     return item.CartId
    //    })
    //    console.log("c", cartItems);
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

    if (serverError)
        return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;

    const order = orders[orders.length - 1];
    let [fullname, phoneNumber, city, adress, email] = ""
    if (order && order.fullname) {
        fullname = order.fullname
    }

    if (order && order.phoneNumber) {
        phoneNumber = order.phoneNumber
    }

    if (order && order.city) {
        city = order.city
    }

    if (order && order.adress) {
        adress = order.adress
    }

    if (order && order.user) {
        email = order.user.email
    }
    // console.log(email)

    const clearCartItems = async () => {
        dispatch(clearCart());
        await axios.delete(`https://emaxapi.onrender.com/cart/`);
    }

    return (
        <>
            <Header title="Review Order" />
            <div className=' min-h-screen '>
                {/* <Main> */}
                <div className="mt-10 container mx-auto my-9 px-4">
                    <CheckoutWizard activeStep={2} />
                </div>
                <div className='grid lg:p-10 md:p-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-2 my-2 text-gray-600 gap-6'>
                    <div className=' bg-white shadow-sm self-start rounded-lg  p-8'>
                        <div className='flex flex-col  items-start gap-6'>
                            <div className='flex justify-between px-5 pb-5 border-b w-full'>
                                <p>Email</p>
                                <p>{email}</p>
                            </div>
                            <div className='flex justify-between px-5 pb-5 border-b w-full'>
                                <p>Phone Number</p>
                                <p>0{phoneNumber}</p>
                            </div>
                            <div className='flex justify-between px-5 pb-5 border-b w-full'>
                                <p>Name</p>
                                <p>{fullname}</p>
                            </div>
                            <div className='flex justify-between px-5 pb-5 border-b w-full'>
                                <p>City</p>
                                <p>{city}</p>
                            </div>
                            <div className='flex justify-between px-5 pb-5 border-b w-full'>
                                <p>Adress</p>
                                <p>{adress}</p>
                            </div>
                            <div className='flex justify-between px-5 w-full'>
                                <p>Shipping Method</p>
                                <p className='text-[#946F3A]'>Cash On Delivery</p>
                            </div>
                        </div>
                    </div>
                    <div className='mt-5 self-start'>
                        {cart?.map((item) => (
                            <>
                                <CartOrder
                                    key={item.slug}
                                    item={item}
                                />
                            </>
                        ))}
                        <div className='p-8 border-t flex justify-between'>
                            <p className='text-lg'>Order Total</p>
                            <p className='text-lg text-[#946F3A]'>N{total}</p>
                        </div>
                    </div>

                </div>
                <div className='w-full flex justify-center border-t p-10'>
                    <button className={styles.loginButton} onClick={clearCartItems}>
                        <Link href='/thankyou'> Complete Order </Link>
                    </button>
                </div>
                <div className='text-center border-t my-5 py-5 hover:text-[#946F3A]'>
                    <Link href='/shipping'>
                        Return to Shipping
                    </Link>
                </div>
            </div>
            {/* </Main> */}
        </>
    )
}


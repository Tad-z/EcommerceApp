import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import CheckoutWizard from '../components/CheckoutWizard'
import styles from '../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useFetchOrder } from '../hooks/fetchOrder'
import { useFetchCart } from '../hooks/fetchCart'



export default function order() {
    const dispatch = useDispatch();
    const [{ loading, data, error }] = useFetchOrder();
    const [{ isLoading, serverError, apiData }] = useFetchCart();
    const orders = useSelector((state) => state.order.queue);
    const cartItems = useSelector((state) => state.cart.cart);
    console.log("q",cartItems.product)
    // if (cartItems && cartItems.quantity) {
    //     quantity = cartItems.quantity
    //     console.log("q",quantity)
    // }
    // const order = orders[orders.length - 1];
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
    console.log(email)
    return (
        <>
            <Header title="Review Order" />
            <Main>
                <div className="mt-10">
                    <CheckoutWizard activeStep={2} />
                </div>
                <div className='grid grid-cols-2 mt-5'>
                    <div className=' bg-white shadow-sm rounded-lg text-gray-600 m-8 p-8'>
                        <div className='flex flex-col items-start gap-6'>
                            <div className='flex gap-10 pb-5 border-b w-full'>
                                <p>Email</p>
                                <p>{email}</p>
                            </div>
                            <div className='flex gap-10 pb-5 border-b w-full'>
                                <p>Phone Number</p>
                                <p>0{phoneNumber}</p>
                            </div>
                            <div className='flex gap-10 pb-5 border-b w-full'>
                                <p>Name</p>
                                <p>{fullname}</p>
                            </div>
                            <div className='flex gap-10 pb-5 border-b w-full'>
                                <p>City</p>
                                <p>{city}</p>
                            </div>
                            <div className='flex gap-10'>
                                <p>Adress</p>
                                <p>{adress}</p>
                            </div>
                        </div>
                    </div>
                    <div> 
                        {cartItems.map((item) => {
                            <div>
                                <img src={item.product.productImage} />
                            </div>
                            
                        })}
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <button className={styles.loginButton}>
                        Complete Order
                    </button>
                </div>
            </Main>
        </>
    )
}


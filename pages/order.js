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
    const cart = useSelector((state) => state.cart.cart);
    const order = orders[orders.length - 1];
    let [fullname, city, adress, email] = ""
    if (order && order.fullname) {
        fullname = order.fullname
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
                    <div className=' bg-[#f3f3eb] text-gray-600 m-8 p-8'>
                        <div className='flex flex-col items-start gap-5'>
                            <div className='flex gap-10'>
                                <p>Email</p>
                                <p>{email}</p>
                            </div>
                            <div className='flex gap-10'>
                                <p>Name</p>
                                <p>{fullname}</p>
                            </div>
                            <div className='flex gap-10'>
                                <p>City</p>
                                <p>{city}</p>
                            </div>
                            <div className='flex gap-10'>
                                <p>Adress</p>
                                <p>{adress}</p>
                            </div>
                        </div>
                    </div>
                    <div>section 2</div>
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


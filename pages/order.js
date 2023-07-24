import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'
import CheckoutWizard from '../components/CheckoutWizard'
import styles from '../styles/Home.module.css'


export default function order() {
    return (
        <>
            <Header title="Review Order" />
            <Main>
                <div className="mt-10">
                    <CheckoutWizard activeStep={2} />
                </div>
                <div className='grid grid-cols-2 mt-16'>
                    <div>
                        <div>
                            <p>
                                <span>Contact</span>
                                <span>Contact</span>
                            </p>
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


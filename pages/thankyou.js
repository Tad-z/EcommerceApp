import React from 'react'
import Header from '../components/Header'
import { AiOutlineCheckCircle } from "react-icons/ai";
import Link from 'next/link';
import styles from '../styles/Home.module.css'

const thankyou = () => {
    return (
        <>
            <Header title="Thank You" />
                <div className={styles.container}>
                    <div className={styles.containerInner}>
                        <AiOutlineCheckCircle className="h-24 w-24 text-[#5e4c34] mb-6" />
                        <h1 className="text-lg">Thank You!</h1>
                        <p className="text-base">Your order has been placed successfully.</p>
                        <p className="text-base mb-9">You will receive a mail shortly.</p>
                        <Link href="/"><p  className="hover:underline cursor-pointer">Home</p></Link>
                    </div>
                </div>
        </>
    )
}

export default thankyou
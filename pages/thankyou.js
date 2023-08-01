import React from 'react'
import Header from '../components/Header'
import { AiOutlineCheckCircle } from "react-icons/ai";

const thankyou = () => {
    return (
        <>
            <Header title="Thank You" />
                <div className="container">
                    <div className="container__inner">
                        <AiOutlineCheckCircle className="thankyou__icon" />
                        <h1 className="thankyou__title">Thank You!</h1>
                        <p className="thankyou__text">Your order has been placed successfully.</p>
                        <a href="/" className="thankyou__btn">Go Back</a>
                    </div>
                </div>
        </>
    )
}

export default thankyou
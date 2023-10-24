import Link from 'next/link'
import React, { useState } from 'react'
import { AiFillPlusCircle, AiFillMinusCircle, AiFillCloseCircle } from "react-icons/ai";

const CardCart = ({ item, removeItemHandler, updateProducts }) => {
    const [count, setCount] = useState(item.quantity);
    function decrementCount() {
        if (count > 1) {
            setCount(count - 1);
            const updatedItem = {
                ...item,
                quantity: count - 1
            };
            updateProducts(updatedItem);
        }
    }


    function incrementCount() {
        setCount(count + 1);
        const updatedItem = {
            ...item,
            quantity: count + 1
        };
        updateProducts(updatedItem);
    }

    // Calculate the updated price based on the current quantity
    const updatedPrice = item.product.price * count;

    return (
        <div className="border-t-2 py-4 flex flex-col items-start justify-between gap-16 lg:flex-row">
            <div className='flex'>
                <Link href={`/product/${item.product.slug}`}>
                    <div>
                        <img src={`https://emaxapi.onrender.com/${item.product.productImage}`} alt={item.title} width={150} height={150}></img>
                    </div>
                </Link>
                <div className='flex flex-col gap-14 px-5'>
                    <p className=''>{item.product.title}</p>

                    <p className='font-semibold'>N{updatedPrice}</p>
                </div>

            </div>

            <div className='flex flex-row items-center gap-32'>
                <div className='text-center flex'>
                    <button className='px-3' onClick={() => decrementCount()}>
                        <AiFillMinusCircle className='h-7 w-7 mx-1 text-center' />
                    </button>
                    {count}
                    <button className='px-3' onClick={() => incrementCount()}>
                        <AiFillPlusCircle className='h-7 w-7 mx-1 text-center' />
                    </button>
                </div>
                <div className='flex items-center mx-4'>
                    <button onClick={() => removeItemHandler(item)}>
                        <AiFillCloseCircle id="myButton" className=" h-7 w-7"></AiFillCloseCircle>
                    </button>

                </div>

            </div>


        </div>
    )
}


export default CardCart;


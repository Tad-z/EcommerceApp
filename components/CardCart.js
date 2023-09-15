import Link from 'next/link'
import React, { useState } from 'react'
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { BiXCircle } from 'react-icons/bi';

const CardCart = ({ item, removeItemHandler, updateProducts }) => {
    const [count, setCount] = useState(item.quantity);
    function decrementCount() {
        if (count > 1){
            setCount(count - 1)
        }
        return count;
         
    }
    function incrementCount() {
        setCount(count + 1)
    }
    const updatedItem = {
      ...item,
      quantity: count
    };
    return (
        <tr className="border-b">
            <td>
                <Link href={`/product/${item.product.slug}`}>
                    <div className='flex items-center'>
                        <img src={`https://emaxapi.onrender.com/${item.product.productImage}`} alt={item.title} width={60} height={60}></img>
                        &nbsp;
                        {item.product.title}
                    </div>
                </Link>
            </td>
            <td className='p-5 text-lg text-center'>N{item.product.price}</td>
            <td className='p-5 text-center flex justify-end items-center'>
                <button onClick={() => decrementCount()}>
                    <AiOutlineMinusSquare className='h-7 w-7 mx-1 text-center' />
                </button>
                {updatedItem.quantity}
                <button onClick={() => incrementCount()}>
                    <AiOutlinePlusSquare className='h-7 w-7 mx-1 text-center' />
                </button>
            </td>
            <td className='p-5 text-center'>
                <p>N{item.product.price * updatedItem.quantity}</p>
            </td>
            <td className='p-5 text-center'>
                <button onClick={() => removeItemHandler(item)}>
                    <BiXCircle id="myButton" className="h-5 w-5"></BiXCircle>
                </button>
            </td>
            <td>
                <button className='update-products-button' onClick={() => updateProducts(updatedItem)}>
                    Update
                </button>
            </td>

        </tr>
    )
}

export default CardCart;

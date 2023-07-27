import Link from 'next/link'
import React from 'react'


const CardOrder = ({ item, total }) => {
    if (total) {
        let total = total
    }
    return (
        <>
            <div className="border-t flex gap-5 p-8">
                <div>
                    <Link href={`/product/${item.product.slug}`}>
                        <div className='flex items-center'>
                            <img src={`http://localhost:4000/${item.product.productImage}`} alt={item.title} width={150} height={150}></img>
                            &nbsp;

                        </div>
                    </Link>
                </div>
                <div>
                    <p>{item.product.title}</p>
                    <p className='p-1 flex items'>Qty:{item.quantity}</p>
                    <p className='p-1 text-[#946F3A]'>N{item.product.price}</p>
                </div>
            </div>
        </>

    )
}

export default CardOrder;

import React from 'react'
import style from '../styles/Home.module.css'


const defaultEndpoint = "https://emaxapi.onrender.com/products"
export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint);
    const data = await res.json();
    return { props: { data } }
}


export default function FeaturedProducts({ product }) {
    return (
        <div className={style.cardBest}>
            <img className={style.cardImage} alt={product.name} src={`https://emaxapi.onrender.com/${product.productImage}`} />
            <div className='flex flex-col justify-center p-5'>
                <h2 className='text-lg text-left'>{product.title}</h2>
                <h2 className='mb-2 text-left text-lg font-bold'>N{product.price}</h2>
            </div>
        </div>


    )
}
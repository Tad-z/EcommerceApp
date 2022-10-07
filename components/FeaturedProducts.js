import React from 'react'


const defaultEndpoint = "http://localhost:4000/products"
export async function getServerSideProps() {
    const res = await fetch(defaultEndpoint);
    const data = await res.json();
    return { props: { data } }
}


export default function FeaturedProducts({ product }) {
    return (
        <div className='card-slide '>
            <img className='image' alt={product.name} src={`http://localhost:4000/${product.productImage}`} />
            <div className='flex flex-col justify-center p-5'>
                <h2 className='text-lg text-left'>{product.title}</h2>
                <h2 className='mb-2 text-left text-lg font-bold'>N{product.price}</h2>
            </div>
        </div>


    )
}
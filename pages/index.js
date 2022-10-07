import { useState } from "react";
import styles from '../styles/Home.module.css'
import FeaturedProducts from "../components/FeaturedProducts";
import ProductItem from "../components/ProductItem";
import Link from "next/link";
import Header from "../components/Header";
import Main from "../components/Main";
import Footer from "../components/Footer";


export async function getServerSideProps({ query }) {
  const page = Number(query.page) || 1;
  const defaultEndpoint = `http://localhost:4000/products/page/?page=${page}`
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  return { props: { page, data } }
}


export default function Home({ data, page }) {
  const { result = [] } = data || {};
  const products = result.products;
  const [input, setInput] = useState("")
  const Products = products.filter((product) => product.title.toLowerCase().includes(input))
  const featuredProducts = products.slice(4, 9) || (10, 16)
  return (
    <>
      <Header title="Home Page"/>
      <Main>
        <h2 className="mt-12 text-xl font-semibold">Featured Products</h2>
        <div className="new">
          <div className="featured-products track ">
            {featuredProducts.map((product) => <FeaturedProducts product={product} key={product._id} />)}
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center">Our Products</h2>
        <p className="text-center text-lg mb-4">We offer the best products at the best price</p>
        <div className="form">
          <input className="input" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Search for products" name='query' type='search' />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {Products.map((product) => <ProductItem product={product} key={product._id} />)}
        </div>
        <div className="flex justify-center my-2">
          {result.next && <Link href={`/?page=${result.next.page}`}><button className={styles.button}> Next Page -{result.next.page} </button></Link>}
          {result.previous && <Link href={`/?page=${result.previous.page}`}><button className={styles.button}> Previous Page -{result.previous.page} </button></Link>}
        </div>
      </Main>
      <Footer />
    </>
  )
}

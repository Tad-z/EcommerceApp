import { useState } from "react";
import styles from '../styles/Home.module.css'
import FeaturedProducts from "../components/FeaturedProducts";
import ProductItem from "../components/ProductItem";
import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";



// export async function getServerSideProps({ query }) {
//   const page = Number(query.page) || 1;
//   const defaultEndpoint = `http://localhost:4000/products/page/?page=${page}`
//   const res = await fetch(defaultEndpoint);
//   const data = await res.json();
//   return { props: { page, data } }
// }
import { useFetchProducts } from "../hooks/fetchProducts";
import { useSelector } from "react-redux";
import { ColorRing } from "react-loader-spinner";

export default function Home({ data, page }) {
  const [{ isLoading, serverError, apiData }] = useFetchProducts();
  const products = useSelector(
    (state) => state.products.queue
  )
  const [input, setInput] = useState("")
  const Products = products.filter((product) => product.title.toLowerCase().includes(input))
  const featuredProducts = products.slice(4, 9) || (8, 14)
  useSelector(state => console.log(state));
  if (isLoading)
    return (
      <div className="loader-container">
        <div>
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      </div>
    );

  if (serverError)
    return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;
  // const { result = [] } = data || {};
  // const products = result.products;

  return (
    <>
      <Header title="Home Page" />
      <Hero />
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
          {/* {result.next && <Link href={`/?page=${result.next.page}`}><button className={styles.button}> Next Page -{result.next.page} </button></Link>}
          {result.previous && <Link href={`/?page=${result.previous.page}`}><button className={styles.button}> Previous Page -{result.previous.page} </button></Link>} */}
        </div>
      </Main>
      <Footer />
    </>
  )
}

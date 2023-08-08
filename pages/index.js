import { useState } from "react";
import styles from '../styles/Home.module.css'
import FeaturedProducts from "../components/FeaturedProducts";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { AiOutlineSearch } from "react-icons/ai";



// export async function getServerSideProps({ query }) {
//   const page = Number(query.page) || 1;
//   const defaultEndpoint = `http://localhost:4000/products/page/?page=${page}`
//   const res = await fetch(defaultEndpoint);
//   const data = await res.json();
//   return { props: { page, data } }
// }
import { useFetchProducts } from "../hooks/fetchProducts";
import { useSelector } from "react-redux";
// import { ColorRing } from "react-loader-spinner";
import { RingLoader } from "react-spinners"


export default function Home() {
  let [{ isLoading, serverError }] = useFetchProducts();
  const products = useSelector(
    (state) => state.products.queue
  )
  const [input, setInput] = useState("")
  const Products = products.filter((product) => product.title.toLowerCase().includes(input))
  const featuredProducts = products.slice(8, 11) || (12, 15)
  useSelector(state => console.log(state));
  if (isLoading)
    return (
      <div className="loader-container">
        <div>
          <RingLoader
            color= '#5e4c34'
            loading={isLoading}
            size={80}
          />
        </div>
      </div>
    );

  if (serverError)
    return <h3 className="text-light">{serverError || "Unknown Error"}</h3>;
  // const { result = [] } = data || {};
  // const products = result.products;

  return (
    <div>
      <Header title="Home Page" />
      <Hero />
      <Main>
        <h2 className="mb-8 mx-8 lg:text-4xl md:text-3xl text-2xl font-semibold">Best Sellers</h2>
        <div className={styles.bestSellers}>
              {featuredProducts.map((product) => <FeaturedProducts product={product} key={product._id} />)}
        </div>
        <h2 className="lg:text-4xl md:text-3xl text-2xl  mb-8 mx-8 font-bold" id="products">Our Products</h2>
        {/* <p className=" text-lg mb-4">We offer the best products at the best price</p> */}
        <div className={styles.form}>
          <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} name='query' type='search' />
          <AiOutlineSearch className={styles.search} />
        </div>
        <div className={styles.productContainer}>
          {Products.map((product) => <ProductItem product={product} key={product._id} />)}
        </div>
        <div className="flex justify-center my-2">
          {/* {result.next && <Link href={`/?page=${result.next.page}`}><button className={styles.button}> Next Page -{result.next.page} </button></Link>}
          {result.previous && <Link href={`/?page=${result.previous.page}`}><button className={styles.button}> Previous Page -{result.previous.page} </button></Link>} */}
        </div>
      </Main>
      <Footer />
    </div>
  )
}

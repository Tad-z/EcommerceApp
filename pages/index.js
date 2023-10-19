import { useState } from "react";
import { useRouter } from "next/router";
import styles from '../styles/Home.module.css'
import FeaturedProducts from "../components/FeaturedProducts";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { AiOutlineSearch } from "react-icons/ai";
// import { RingLoader } from "react-spinners"
import Pagination from "../components/Pagination";



export async function getServerSideProps({ query }) {
  const page = Number(query.page) || 1;
  const defaultEndpoint = `https://emaxapi.onrender.com/products/page/?page=${page}`
  const res = await fetch(defaultEndpoint);
  const data = await res.json();
  console.log(data);
  return { props: { page, data } }
}


export default function Home({ page, data }) {
  // const [isLoading, setIsLoading] = useState(true);
  const { result = [] } = data || {};
  const products = result.products;
  const pages = result.totalPages;
  const router = useRouter();
  const [input, setInput] = useState("")
  const Products = products.filter((product) => product.title.toLowerCase().includes(input))
  const featuredProducts = products.slice(5, 8) || (12, 15)

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`);
  };
  // setTimeout(() => {
  //   setIsLoading(false)
  // }, 3000);

  // if (isLoading)
  //   return (
  //     <div className="loader-container">
  //       <div>
  //         <RingLoader
  //           color='#5e4c34'
  //           loading={isLoading}
  //           size={80}
  //         />
  //       </div>
  //     </div>
  //   );


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
        <div className={styles.form}>
          <input className={styles.input} value={input} onChange={(e) => setInput(e.target.value)} name='query' type='search' />
          <AiOutlineSearch className={styles.search} />
        </div>
        <div className={styles.productContainer}>
          {Products.map((product) => <ProductItem product={product} key={product._id} />)}
        </div>
        <div className="flex justify-center mt-1 mb-2">
          <Pagination currentPage={page} totalPages={pages} onPageChange={handlePageChange} />
        </div>
      </Main>
      <Footer />
    </div>
  )
}

// index.js
import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import FeaturedProducts from "../components/FeaturedProducts";
import ProductItem from "../components/ProductItem";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Main from "../components/Main";
import Footer from "../components/Footer";
import { AiOutlineSearch } from "react-icons/ai";
import Pagination from "../components/Pagination";
import { useFetchProducts } from "../hooks/fetchProducts";
import { useSelector } from "react-redux";
import { RingLoader } from "react-spinners";

// ==============================
// Retry fetch util
// ==============================
async function fetchWithRetry(url, options = {}, retries = 8, delay = 4000) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (err) {
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delay));
      } else {
        throw err;
      }
    }
  }
}

export async function getServerSideProps({ query }) {
  const page = Number(query.page) || 1;
  const defaultEndpoint = `https://emaxapi.onrender.com/products/page/?page=${page}`;

  let data = { result: { products: [], totalPages: 1 } };

  try {
    data = await fetchWithRetry(defaultEndpoint);
  } catch (err) {
    console.error("Backend not ready:", err.message);
    // keep fallback data empty so frontend can show loader
  }

  return { props: { page, data } };
}

export default function Home({ page, data }) {
  const { result = {} } = data || {};
  let products = result.products || [];
  const pages = result.totalPages || 1;
  const router = useRouter();
  const [input, setInput] = useState("");
  useFetchProducts();
  const apiData = useSelector((state) => state.products.queue);

  const featuredProducts = products.slice(5, 8) || [];
  if (input) {
    products = apiData.filter((product) =>
      product.title.toLowerCase().includes(input.toLowerCase())
    );
  }

  const handlePageChange = (newPage) => {
    router.push(`/?page=${newPage}`);
  };

  // ==============================
  // Loader when no products yet
  // ==============================
  if (!products || products.length === 0) {
    return (
      <div className="loader-container flex flex-col items-center justify-center h-screen">
        <RingLoader color="#5e4c34" size={80} />
        <p className="mt-4 text-lg text-gray-600">
          Waking up server... please wait ☕
        </p>
      </div>
    );
  }

  return (
    <div>
      <Header title="Home Page" />
      <Hero />
      <Main>
        <h2 className="mb-8 mx-8 lg:text-4xl md:text-3xl text-2xl font-semibold">
          Best Sellers
        </h2>
        <div className={styles.bestSellers}>
          {featuredProducts.map((product) => (
            <FeaturedProducts product={product} key={product._id} />
          ))}
        </div>
        <h2
          className="lg:text-4xl md:text-3xl text-2xl mb-8 mx-8 font-bold"
          id="products"
        >
          Our Products
        </h2>
        <div className={styles.form}>
          <input
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            name="query"
            type="search"
          />
          <AiOutlineSearch className={styles.search} />
        </div>
        <div className={styles.productContainer}>
          {products.map((product) => (
            <ProductItem product={product} key={product._id} />
          ))}
        </div>
        <div className="flex justify-center mt-1 mb-2">
          <Pagination
            currentPage={page}
            totalPages={pages}
            onPageChange={handlePageChange}
          />
        </div>
      </Main>
      <Footer />
    </div>
  );
}

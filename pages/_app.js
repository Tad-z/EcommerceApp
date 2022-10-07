import { StoreProvider } from '../container/Store'
import '../styles/globals.css'
import axios from 'axios'
import useLocalStorage from "use-local-storage"
import { useEffect, useState } from 'react'


function MyApp({ Component, pageProps }) {
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  // const [token, setToken] = useState("")

  
    const isAuthenticated = useLocalStorage("isAuthenticated", "");
    const token = useLocalStorage("token", "");
    // // const authenticated = localStorage.getItem("isAuthenticated") !== null
    // // setToken(localStorage.getItem("token"))
    // setIsAuthenticated(authenticated)
    // setToken((userToken))
  

  // useEffect(() => {
  //   auth()
  //   console.log(token);
  // }, [isAuthenticated, token])


  axios.interceptors.request.use(async (config) => {
    try {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    } catch (error) {
      console.log(error);
      return Promise.reject(error)
    }
  })

  console.log("isAuthenticated", isAuthenticated);
  console.log("Bearer", token);
  // use the next route and make sure protected pages are accessed only when users are logged in

  return (
    <StoreProvider>
      {isAuthenticated &&
        <Component {...pageProps} />
      }
    </StoreProvider>
  )
}

export default MyApp

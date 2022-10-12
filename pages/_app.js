import { StoreProvider } from '../container/Store'
import '../styles/globals.css'
import axios from 'axios'
import { useEffect, useState } from 'react'


function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState("")

  const auth = async () => {
    axios.interceptors.request.use((config) => {
      if(typeof window !== 'undefined') {
        const userToken = window.localStorage.getItem("token")
        setToken(userToken)
        const authentication = window.localStorage.getItem("isAuthenticated")
        setIsAuthenticated(authentication)
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }
      }
      return config;
    }, (error) => {
      return Promise.reject(error)
    })
  }
  
  useEffect(() => {
    auth()
  }, [token])

 
  
   

  // console.log("isAuthenticated", isAuthenticated);
  // console.log("Bearer", token);
  // use the next route and make sure protected pages are accessed only when users are logged in

  return (
    <StoreProvider>
      {/* {isAuthenticated && */}
        <Component {...pageProps} />
      {/* } */}
    </StoreProvider>
  )
}

export default MyApp

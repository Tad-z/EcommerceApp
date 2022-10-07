// import React, { useContext, useState } from 'react'

// const AppContext = React.createContext()
// export async function getServerSideProps({ query }) {
//     const page = Number(query.page) || 1;
//     const EndpointPages = `http://localhost:4000/products/page/?page=${page}`
//     // const Endpoint = `http://localhost:4000/products/`
//     const res = await fetch(EndpointPages);
//     // const endpoint = await fetch(Endpoint);
//     const dataPages = await res.json();
//     // const data = await endpoint.json()
//     return { props: { page, dataPages } }
//   }

// //dataPages, data, page, 
// export default function AppProvider({ dataPages, data, page,children }) {
//     const dataone = useState(dataPages)
   
//   return (
//     <AppContext.Provider value={{dataPages, data, page, dataone }} >{ children }</AppContext.Provider>
//   )
// }
// export const useGlobalContext = () => {
//     return useContext(AppContext)
// }
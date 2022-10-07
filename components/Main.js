import React from 'react'
import { ToastContainer } from 'react-toastify';

const Main = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col justify-between '>
      <main className='container m-auto mt-4 px-4'>{children}</main>
    </div>
  )
}

export default Main
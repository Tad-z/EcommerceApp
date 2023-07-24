import React from 'react'
import { ToastContainer } from 'react-toastify';

const Main = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col justify-between '>
      <main className='container mx-auto my-9 px-4 smooth-scroll'>{children}</main>
    </div>
  )
}

export default Main
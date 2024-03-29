import React from 'react'


const Main = ({ children }) => {
  return (
    <div className='flex min-h-screen flex-col justify-between '>
      <main className='container mx-auto my-9 px-4'>{children}</main>
    </div>
  )
}

export default Main
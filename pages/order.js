import React from 'react'
import Header from '../components/Header'
import Main from '../components/Main'

export default function order() {
    return (
        <>
            <Header title="Review Order" />
            <Main>
                <div className='grid grid-cols-2 mt-16'>
                    <div>section 1</div>
                    <div>section 2</div>
                </div>
            </Main>
        </>
    )
}


import React from 'react'
import styles from '../styles/Home.module.css'

const Hero = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerContainerInner}>
          <h1>We got you covered</h1>
          <p>
            We are here to provide you with the best quality clothing at the
            best price
          </p>
          <a href="" className={styles.btn}>Shop Now</a>
        </div>
      </div>
    </header>
  )
}

export default Hero
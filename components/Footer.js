import React from 'react'
import Image from 'next/image'
import logo from "../assets/logo2-white.jpg";
import Link from 'next/link';
import { BsInstagram } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import styles from '../styles/Home.module.css'


export default function Footer() {
  return (
    <footer className=' py-24 px-8 border-t-[1px]   border-[#eee] bg-white'>
      <div className=' my-0 mx-auto grid gap-16 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-start '>
        <div className='flex flex-col text-xs justify-center text-gray-800'>
          <a href="#" className="block mb-3">
            <Image
              src={logo}
              alt="logo"
              width={200}
              height={90}
            />
          </a>

          <p className={styles.text}>
            We are here to provide you with the best quality clothing at the
            best price
          </p>

          <ul className={styles.socialLinks}>
            <li>
              <a href="#" className={styles.footerLinks}>
                <BsInstagram />

              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                <BsFacebook />

              </a>
            </li>
            <li>
              <a href="#" className={styles.footerLinks}>
                <BsTwitter />
              </a>
            </li>
          </ul>
        </div>

        <div className={styles.adressCol}>
          <p className={styles.footerHeading}>Contact Us</p>
          <address className={styles.contacts}>
            <p className='text-[#767676] text-base'>Adebetin Plaza, Oshodi, Lagos State</p>
            <p className='text-[#767676] mb-4 text-base'>Omoridion Plaza, Lagos Island, Lagos State</p>

            <a className='block text-[#767676] text-base' href="tel:0908767892">0908767892</a>
            <a className='block text-[#767676] text-base' href="mailto:hello@emax.com">hello@emax.com</a>
          </address>
        </div>

        <div>
          <p className={styles.footerHeading}>Quick Links</p>
          <ul className='flex flex-col gap-3'>
            <li>
              <Link href="#products">
                <p className='text-[#767676] cursor-pointer hover:underline text-base'>Shop</p>
              </Link>
            </li>
            
          </ul>
        </div>

        

      </div>
      <p className='text-center mt-10 text-sm'>Copyright @ 2022 EcomerceApp</p>

    </footer>

  )
}

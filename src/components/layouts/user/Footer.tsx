import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Container from './Container';

const Footer = () => {
  return (
     <footer className='z-0 relative mx-auto border-b border-white/10 bg-gradient-to-br from-[#0B0118] via-[#160327] to-[#32073B] text-white shadow-[0_20px_45px_rgba(5,1,19,0.55)]'>
        <div className='absolute inset-y-0 left-0 w-1/2 bg-[radial-gradient(circle_at_top,_rgba(245,187,11,0.12),_transparent_60%)] opacity-60 pointer-events-none' />
        <div className='absolute inset-y-0 right-0 w-1/3 bg-[radial-gradient(circle_at_bottom,_rgba(255,107,0,0.15),_transparent_55%)] opacity-60 pointer-events-none' />
      <Container>
        <div className="mx-auto my-5 flex flex-col md:flex-row md:items-start gap-8 md:gap-0">
          <div className="md:w-2/5 w-full flex flex-col items-center md:items-start md:mb-0">
            <Image src="/tvkillustration.png" alt="Logo"  width={300} height={500}/>
          </div>
          <div className="md:w-3/5 w-full grid grid-cols-1 sm:grid-cols-3 gap-8 my-auto text-center md:text-start">
            <div>
              <h3 className="font-semibold mb-3 text-[1rem] md:text-lg xl:text-xl bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,187,11,0.35)] underline">Navigation</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Home</Link></li>
                <li><Link href="/about" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">About</Link></li>
                <li><Link href="/product" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Product</Link></li>
                <li><Link href="/contact" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Contact Us</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-[1rem] bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,187,11,0.35)] md:text-lg xl:text-xl underline">Legal</h3>
                <ul className="space-y-2">
                  <li><Link href="/promotional-conditions" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Promotional Lucky Draw Disclaimer</Link></li>
                  <li><Link href="/terms-conditions" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Terms and Conditions</Link></li>
                  <li><Link href="/privacy-policy" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Privacy Policy</Link></li>
                  <li><Link href="/shipping-policy" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Shipping & Delivery</Link></li>
                  <li><Link href="/return-policy" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-lg">Return & Cancellation</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-[1rem] bg-gradient-to-r from-[#F5BB0B] via-[#FFED9F] to-[#FF6B00] text-transparent bg-clip-text drop-shadow-[0_0_20px_rgba(255,187,11,0.35)] md:text-lg xl:text-xl underline">Support</h3>
              <ul className="space-y-2 text-sm ">
                  <li className=''>
                      <a href="mailto:support@sugimx.com" className="hover:text-[#F5BB0B] text-sm md:text-md xl:text-xl">support@sugimx.com</a>
                  </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer
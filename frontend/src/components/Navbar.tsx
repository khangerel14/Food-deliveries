'use client';

import { Basketsvg, RedOnion } from '@/images';
import { useRouter } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '@/context/StoreContext';
import axios from 'axios';
import { User } from './User';

export const Navbar = () => {
  const { user, error } = useUser();
  const [cartData, setCartData] = useState<any | null>(null);
  const router = useRouter();
  const { cartItems }: any = useContext(StoreContext);
  const [header, setHeader] = useState(false);

  const scrollHeader = () => {
    setHeader(window.scrollY >= 20);
  };

  const getCartItem = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cart');
      setCartData(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    getCartItem();
    window.addEventListener('scroll', scrollHeader);
    return () => window.removeEventListener('scroll', scrollHeader);
  }, []);

  const foodLength = cartItems ? Object.keys(cartItems).length : 0;

  const logIn = () => {
    router.push('/logIn', { scroll: false });
  };

  const homePage = () => {
    router.push('dashboard', { scroll: false });
  };

  if (error) return <p>{error.message}</p>;

  return (
    <div
      className='w-full z-50 fixed transition-all duration-300'
      style={{
        background: header ? 'white' : 'transparent',
        boxShadow: header ? '0 4px 10px rgba(0, 0, 0, 0.1)' : 'none',
      }}
    >
      <div className='flex items-center justify-between w-[1225px] mx-auto font-semibold h-[60px] max-xl:px-12 max-xl:w-full max-sm:px-2'>
        <button onClick={homePage}>
          <RedOnion />
        </button>
        {user ? (
          <div className='flex gap-4 items-center'>
            <button
              className='relative flex items-center justify-end'
              onClick={() => router.push('/basket', { scroll: false })}
            >
              <Basketsvg />
              <p className='absolute inset-0 -top-2 left-3 text-white h-5 w-5 pr-0 rounded-full bg-[#F91944] flex justify-center items-center'>
                {foodLength}
              </p>
            </button>
            <User cartData={cartData} />
          </div>
        ) : (
          <div className='flex items-center gap-5 font-light'>
            <button onClick={logIn}>Sign In</button>
            <button
              onClick={logIn}
              className='p-3 text-white rounded-full px-7 bg-[#F91944]'
            >
              Sign Up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

'use client';

import {
  Carousel,
  Card,
  Footer,
  Navbar,
  MenuBar,
  ChooseUs,
} from '@/components';
import StoreContextProvider from '@/context/StoreContext';
import { White } from '@/images';
import { Suspense } from 'react';

const Page = () => {
  return (
    <StoreContextProvider>
      <div className='mx-auto overflow-x-hidden overflow-y-hidden'>
        <White />
        <div className='absolute inset-0 mx-auto h-fit'>
          <Navbar />
          <div className='flex items-center h-fit'>
            <Carousel />
          </div>
        </div>
      </div>
      <MenuBar />
      <Suspense fallback={<div>loading...</div>}>
        <Card />
      </Suspense>
      <ChooseUs />
      <Footer />
    </StoreContextProvider>
  );
};

export default Page;

import { StoreContext } from '@/context/StoreContext';
import { useContext } from 'react';

export const Carousel = () => {
  const { inputValue, setInputValue }: any = useContext(StoreContext);
  return (
    <div className='flex items-center flex-col w-full h-[400px] max-lg:h-[300px] max-md:h-[250px] max-sm:h-[180px] justify-center gap-3 md:gap-10 top-24 z-20'>
      <h1 className='text-xl text-gray-700 font-bold md:text-5xl'>
        Best food waiting for your belly
      </h1>
      <input
        className='border rounded-full w-96 h-10 font-normal px-4 outline-none'
        type='search'
        placeholder='Хайх...'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </div>
  );
};

"use client";

import {
  Carousel,
  Card,
  Footer,
  Navbar,
  MenuBar,
  ChooseUs,
} from "@/components";
import StoreContextProvider from "@/context/StoreContext";
import { White } from "@/images";
import { Suspense } from "react";

const Page = () => {
  return (
    <StoreContextProvider>
      <div className="mx-auto flex items-center h-full">
        <White />
        <div className="absolute inset-0 mx-auto h-fit">
          <Navbar />
          <div className="flex justify-center h-[420px]">
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

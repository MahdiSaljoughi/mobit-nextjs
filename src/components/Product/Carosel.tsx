"use client";

import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

import Product from "./Product";

export default function Carosel({ product }: any) {
  return (
    <>
      <Swiper
        slidesPerView={4}
        centeredSlides={true}
        autoplay={true}
        spaceBetween={0}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next-custom",
          prevEl: ".swiper-button-prev-custom",
        }}
        className="mySwiper w-full"
        loop={true}
        breakpoints={{
          200: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 0,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 0,
          },
          1400: {
            slidesPerView: 4,
            spaceBetween: 0,
          },
        }}
      >
        {product.map((product: any, index: any) => (
          <SwiperSlide key={index}>
            <div className="p-2">
              <Product item={product} />
            </div>
          </SwiperSlide>
        ))}
        <div className="flex items-center justify-center w-full">
          <button className="swiper-button-prev-custom">
            <div className="p-1.5 lg:p-2 mb-1 rounded-xl lg:rounded-2xl text-zinc-500 hover:scale-110 transition-transform-2 mx-2 border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
                className="rotate-180"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19l-7-7l7-7"
                />
              </svg>
            </div>
          </button>
          <button className="swiper-button-next-custom">
            <div className="p-1.5 lg:p-2 mb-1 rounded-xl lg:rounded-2xl text-zinc-500 hover:scale-110 transition-transform-2 mx-2 border">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="1.5em"
                height="1.5em"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19l-7-7l7-7"
                />
              </svg>
            </div>
          </button>
        </div>
      </Swiper>
    </>
  );
}

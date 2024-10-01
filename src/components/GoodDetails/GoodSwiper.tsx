"use client";
import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";

register();
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import GoodItem from "../common/GoodItem";
import { computeProductTotalPrice } from "@/helpers/product";


const GoodSwiper = (item: any) => {

  return (
    <Swiper
      spaceBetween={1}
      breakpoints={{
        768: {
          slidesPerView: 2
        },
        1080: {
          slidesPerView: 3,
        },
        1435: {
          slidesPerView: 4,
        },
        1790: {
          slidesPerView: 5,
        },
      }}
      navigation
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
    >
      {item.relatedGoods.map((good: any, index: any) => (
        <SwiperSlide key={index}>
          <GoodItem good={good} key={good.id} product={computeProductTotalPrice(good)} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default GoodSwiper;

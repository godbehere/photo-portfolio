'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const slides = [
  { src: '/images/hero1.jpg', alt: 'Wedding Ceremony' },
  { src: '/images/hero2.jpg', alt: 'Mountain Landscape' },
  { src: '/images/hero3.jpg', alt: 'Studio Portrait' },
];

export default function HeroSlideshow() {
  return (
    <div className="w-full h-[80vh] relative">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000 }}
        loop
        className="h-full"
      >
        {slides.map((slide, idx) => (
          <SwiperSlide key={idx}>
            <div className="relative w-full h-[80vh]">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                className="object-cover"
                priority={idx === 0}
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <h1 className="text-white text-4xl md:text-6xl font-bold drop-shadow-lg">
                  {slide.alt}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

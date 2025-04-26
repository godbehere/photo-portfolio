'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import Image from 'next/image';

const slides = [
  { src: '/images/airplane.jpg', alt: 'Flight' },
  { src: '/images/caterpillar.jpg', alt: 'Caterpillar' },
  { src: '/images/grasshopper.jpg', alt: 'Grasshopper' },
  { src: '/images/mushroom.jpg', alt: 'Mushroom' },
  { src: '/images/peru-lake.jpg', alt: 'Lake' },
  { src: '/images/sloth.jpg', alt: 'Sloth' },
];

export default function HeroSlideshow() {
  return (
    <div className="w-full h-full">
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
                  {/* {slide.alt} */}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

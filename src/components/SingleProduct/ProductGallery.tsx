// src/components/SingleProduct/ProductGallery.tsx
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper"; 
import "swiper/css";
import "swiper/css/navigation";

interface Props {
  images: string[];
  discount?: number; // optional, in case you want to show discount badge
}

export default function ProductGallery({ images, discount }: Props) {
  const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperType | null>(null);

  return (
    <div className="row">
      <div className="item is_sticky">
        {/* discount badge (if available) */}
        {discount && (
          <div className="price">
            <span className="discount">
              {discount}%<br />OFF
            </span>
          </div>
        )}

        {/* main big image carousel */}
        <div className="big-image">
          <Swiper
            modules={[Navigation, Thumbs]}
            navigation
            thumbs={{ swiper: thumbsSwiper }}
            loop
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img src={src} alt={`Product image ${idx + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* thumbnail carousel */}
        {/* <div className="small-image">
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={10}
            slidesPerView={3}
            freeMode
            watchSlidesProgress
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img src={src} alt={`Thumbnail ${idx + 1}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div> */}
      </div>
    </div>
  );
}

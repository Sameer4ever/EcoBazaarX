// src/components/ProductsPage/ProductGallery.tsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductGalleryProps {
  images: string[];
  discount?: number;
}

export default function ProductGallery({ images, discount }: ProductGalleryProps) {
  return (
    <div className="product-gallery">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        loop={true}              // 🔄 enables continuous loop
        spaceBetween={10}
        slidesPerView={1}        // 👈 only 1 image at a time
        className="product-swiper"
      >
        {images.map((img, idx) => (
          <SwiperSlide key={idx}>
            <div className="main-image">
              {discount && <span className="discount-badge">-{discount}%</span>}
              <img src={img} alt={`product-${idx}`} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

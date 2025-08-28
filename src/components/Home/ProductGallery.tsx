import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import 'swiper/css';
import "swiper/css/navigation";
import "swiper/css/thumbs";

export default function ProductGallery() {
  const [thumbs, setThumbs] = useState<SwiperType | null>(null);

  return (
    <div className="product-gallery">
      <Swiper
        className="small-image"
        modules={[Thumbs]}
        onSwiper={setThumbs}
        watchSlidesProgress
        slidesPerView={3}
        spaceBetween={10}
      >
        {/* thumbnail images */}
        <SwiperSlide><img src="/assets/img/products/prod1.jpg" /></SwiperSlide>
      </Swiper>

      <Swiper
        className="big-image"
        modules={[Navigation, Thumbs]}
        navigation
        loop
        thumbs={{ swiper: thumbs && !thumbs.destroyed ? thumbs : null }}
      >
        {/* big images */}
        <SwiperSlide><img src="/assets/img/products/prod1.jpg" /></SwiperSlide>
      </Swiper>
    </div>
  );
}

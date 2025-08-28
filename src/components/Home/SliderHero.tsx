import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function SliderHero() {
  return (
    <div className="slider">
      <div className="container">
        <div className="wrapper">
          <Swiper modules={[Pagination]} loop pagination={{ clickable: true }}>
            <SwiperSlide>
              <div className="item">
                <div className="image object-cover">
                  <img src="/assets/img/slider/slider0.jpg" alt="Shoes" />
                </div>
                <div className="text-content flexcol">
                  <h4>Shoes</h4>
                  <h2>
                    <span>Get The Latest</span><br />
                    <span>Shoe Collection</span>
                  </h2>
                  <a href="#" className="primary-button">Buy Now</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="image object-cover">
                  <img src="/assets/img/slider/slider1.jpg" alt="Fashion" />
                </div>
                <div className="text-content flexcol">
                  <h4>Fashion</h4>
                  <h2>
                    <span>Look Stylish</span><br />
                    <span>All The Time</span>
                  </h2>
                  <a href="#" className="primary-button">Buy Now</a>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="item">
                <div className="image object-cover">
                  <img src="/assets/img/slider/slider2.jpg" alt="Minimalist Wooden Sofa" />
                </div>
                <div className="text-content flexcol">
                  <h4>Quick Offer</h4>
                  <h2>
                    <span>Minimalist Wooden Sofa</span><br />
                    <span>Extra 50% Off</span>
                  </h2>
                  <a href="#" className="primary-button">Buy Now</a>
                </div>
              </div>
            </SwiperSlide>
            {/* Add Slide 2 & 3 here exactly as your HTML */}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

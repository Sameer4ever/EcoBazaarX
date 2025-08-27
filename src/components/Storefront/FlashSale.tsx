import { useEffect, useState } from "react";

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    const end = new Date().getTime() + 3600 * 1000; // 1 hour
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = end - now;
      setTimeLeft({
        h: Math.floor((distance / (1000 * 60 * 60)) % 24),
        m: Math.floor((distance / (1000 * 60)) % 60),
        s: Math.floor((distance / 1000) % 60),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="flash-sales">
      <div className="container">
        <div className="section-heading flexitem">
          <h2>Flash Sale</h2>
          <div className="countdown">
            <span>{timeLeft.h}h</span> : <span>{timeLeft.m}m</span> : <span>{timeLeft.s}s</span>
          </div>
        </div>
        <div className="products flexwrap">
          <div className="item">
            <div className="media">
              <img src="/assets/img/products/jas345.jpg" alt="Blazer" />
            </div>
            <div className="content">
              <h3 className="main-links">Women's Blazer</h3>
              <div className="price">
                <span className="current">₹5500</span>
                <span className="normal">₹9900</span>
              </div>
            </div>
          </div>
          <div className="item">
            <div className="media">
              <img src="/assets/img/products/tas23.jpg" alt="Bag" />
            </div>
            <div className="content">
              <h3 className="main-links">Women's Bag</h3>
              <div className="price">
                <span className="current">₹2125</span>
                <span className="normal">₹2500</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React, { useEffect } from "react";

/**
 * Full 1:1 JSX version of your original homepage
 * Assumptions:
 * - CDN for Remix Icons, Google Fonts, and Swiper are included in public/index.html
 * - All images live in: public/assets/...
 * - This page is routed at "/" in App.tsx
 */
const Home: React.FC = () => {
  useEffect(() => {
    // ===== COPY MENUS INTO OFF-CANVAS =====
    function copyMenu() {
      const dptCategory = document.querySelector(".dpt-cat") as HTMLElement | null;
      const dptPlace = document.querySelector(".departments") as HTMLElement | null;
      if (dptCategory && dptPlace) dptPlace.innerHTML = dptCategory.innerHTML;

      const topNav = document.querySelector(".header-top .wrapper") as HTMLElement | null;
      const topPlace = document.querySelector(".off-canvas .thetop-nav") as HTMLElement | null;
      if (topNav && topPlace) topPlace.innerHTML = topNav.innerHTML;
    }
    copyMenu();

    // ===== MOBILE MENU TOGGLES =====
    const menuButton = document.querySelector(".trigger") as HTMLElement | null;
    const closeButton = document.querySelector(".t-close") as HTMLElement | null;
    const navbarNav = document.querySelector(".site-off") as HTMLElement | null;
    const addClass = document.querySelector(".site") as HTMLElement | null;

    const openMenu = () => {
      if (!addClass) return;
      addClass.classList.toggle("showmenu");
      document.body.style.overflow = "hidden";
    };
    const closeMenu = () => {
      if (!addClass) return;
      addClass.classList.remove("showmenu");
      document.body.style.overflow = "";
    };

    menuButton?.addEventListener("click", openMenu);
    closeButton?.addEventListener("click", closeMenu);

    const docClick = (e: Event) => {
      if (!navbarNav || !closeButton || !menuButton || !addClass) return;
      const t = e.target as Node;
      if (!navbarNav.contains(t) && !closeButton.contains(t) && !menuButton.contains(t)) {
        addClass.classList.remove("showmenu");
        document.body.style.overflow = "";
      }
    };
    document.addEventListener("click", docClick);

    // ===== SUB MENU MOBILE =====
    const submenu = Array.from(document.querySelectorAll(".has-child .click")) as HTMLElement[];
    const toggle = function (this: HTMLElement, e: Event) {
      e.preventDefault();
      submenu.forEach((item) =>
        item !== this ? item.closest(".has-child")?.classList.remove("expand") : null
      );
      this.closest(".has-child")?.classList.toggle("expand");
    };
    submenu.forEach((m) => m.addEventListener("click", toggle));

    // ===== SEARCH TOGGLE (MOBILE) =====
    const searchButton = document.querySelector(".t-search") as HTMLElement | null;
    const tClose = document.querySelector(".search-close") as HTMLElement | null;
    const showClass = document.querySelector(".site") as HTMLElement | null;
    const openSearch = () => showClass?.classList.toggle("showsearch");
    const closeSearch = () => showClass?.classList.remove("showsearch");
    searchButton?.addEventListener("click", openSearch);
    tClose?.addEventListener("click", closeSearch);

    // ===== DPT MENU TOGGLE =====
    const dptButton = document.querySelector(".dpt-cat .dpt-trigger") as HTMLElement | null;
    const dptClass = document.querySelector(".site") as HTMLElement | null;
    const toggleDpt = () => dptClass?.classList.toggle("showdpt");
    dptButton?.addEventListener("click", toggleDpt);

    // ===== SWIPER INIT (hero) =====
    const w = window as any;
    if (w.Swiper) {
      new w.Swiper(".myslider.swiper", {
        loop: true,
        pagination: { el: ".swiper-pagination" },
      });

      // Product gallery swipers (if used later)
      const productThumb = new w.Swiper(".small-image", {
        loop: true,
        spaceBetween: 10,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesProgress: true,
        breakpoints: { 481: { spaceBetween: 32 } },
      });
      new w.Swiper(".big-image", {
        loop: true,
        autoHeight: true,
        navigation: { nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" },
        thumbs: { swiper: productThumb },
      });
    } else {
      console.warn("Swiper not found on window. Make sure CDN JS is loaded in index.html");
    }

    // cleanup
    return () => {
      menuButton?.removeEventListener("click", openMenu);
      closeButton?.removeEventListener("click", closeMenu);
      document.removeEventListener("click", docClick);
      submenu.forEach((m) => m.removeEventListener("click", toggle));
      searchButton?.removeEventListener("click", openSearch);
      tClose?.removeEventListener("click", closeSearch);
      dptButton?.removeEventListener("click", toggleDpt);
    };
  }, []);

  return (
    <div id="page" className="site page-home">
      {/* =============== OFF CANVAS (MOBILE) =============== */}
      <aside className="site-off desktop-hide">
        <div className="off-canvas">
          <div className="canvas-head flexitem">
            <div className="logo">
              <a href="/"><span className="circle"></span>&nbsp;BubbleShop</a>
            </div>
            <a className="t-close flexcenter"><i className="ri-close-line"></i></a>
          </div>
          <div className="departments"></div>
          <div className="thetop-nav"></div>
        </div>
      </aside>

      {/* ===================== HEADER ===================== */}
      <header>
        {/* header top */}
        <div className="header-top mobile-hide">
          <div className="container">
            <div className="wrapper flexitem">
              <div className="left"></div>
              <div className="right">
                <ul className="flexitem main-links">
                  <li><a href="/signin">Login</a></li> {/* 👈 redirected to /signin */}
                  <li><a href="#">Track Order</a></li>
                  <li>
                    <a href="#">
                      India <span className="icon-small"><i className="ri-arrow-down-s-line"></i></span>
                    </a>
                    <ul>
                      <li className="current"><a href="#">Other</a></li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* header nav */}
        <div className="header-nav">
          <div className="container">
            <div className="wrapper flexitem">
              <a className="trigger desktop-hide"><i className="ri-menu-2-line"></i></a>
              <div className="left flexitem">
                <div className="logo">
                  <a href="/"><span className="circle"></span>&nbsp;EcoBazaarX</a>
                </div>
              </div>
              <div className="right">
                <ul className="flexitem second-links">
                  <li className="mobile-hide">
                    <a href="#">
                      <div className="icon-large"><i className="ri-heart-line"></i></div>
                      <div className="fly-item"><span className="item-number">0</span></div>
                    </a>
                  </li>
                  <li>
                    <a className="iscart">
                      <div className="icon-large">
                        <i className="ri-shopping-cart-line"></i>
                        <div className="fly-item"><span className="item-number">0</span></div>
                      </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* header main */}
        <div className="header-main mobile-hide">
          <div className="container">
            <div className="wrapper flexitem">
              <div className="left">
                <div className="dpt-cat">
                  <div className="dpt-head">
                    <div className="main-text">All Categories</div>
                    <div className="mini-text mobile-hide">Total 1082 Products</div>
                    <a className="dpt-trigger mobile-hide">
                      <i className="ri-menu-3-line ri-xl"></i>
                    </a>
                  </div>

                  <div className="dpt-menu">
                    <ul className="second-links">
                      <li className="has-child beauty">
                        <a className="click">
                          <div className="icon-large"><i className="ri-bear-smile-line"></i></div>
                          Beauty
                          <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
                        </a>
                        <ul>
                          <li><a>Makeup</a></li>
                          <li><a>Skin Care</a></li>
                          <li><a>Hair Care</a></li>
                          <li><a>Powder</a></li>
                          <li><a>Lipstick</a></li>
                          <li><a>Eye Cream</a></li>
                          <li><a>Body Lotion</a></li>
                        </ul>
                      </li>

                      <li className="has-child electric">
                        <a className="click">
                          <div className="icon-large"><i className="ri-headphone-fill"></i></div>
                          Electronics
                          <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
                        </a>
                        <ul>
                          <li><a>Camera</a></li>
                          <li><a>Mobile Phones</a></li>
                          <li><a>Computer</a></li>
                          <li><a>Laptop</a></li>
                          <li><a>Headphone</a></li>
                          <li><a>Fan</a></li>
                          <li><a>Television</a></li>
                          <li><a>Hair Dryer</a></li>
                          <li><a>Light</a></li>
                        </ul>
                      </li>

                      <li className="has-child fashion">
                        <a className="click">
                          <div className="icon-large"><i className="ri-t-shirt-air-line"></i></div>
                          Women's Fashion
                          <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
                        </a>
                        <ul>
                          <li><a>Dress</a></li>
                          <li><a>Shoes</a></li>
                          <li><a>Watches</a></li>
                          <li><a>Bags</a></li>
                          <li><a>Trousers</a></li>
                          <li><a>Jacket</a></li>
                        </ul>
                      </li>

                      <li>
                        <a className="click">
                          <div className="icon-large"><i className="ri-shirt-line"></i></div>
                          Men's Fashion
                        </a>
                      </li>
                      <li>
                        <a className="click">
                          <div className="icon-large"><i className="ri-user-5-line"></i></div>
                          Kid's Fashion
                        </a>
                      </li>
                      <li>
                        <a className="click">
                          <div className="icon-large"><i className="ri-heart-pulse-line"></i></div>
                          Health
                        </a>
                      </li>

                      <li className="has-child homekit">
                        <a className="click">
                          <div className="icon-large"><i className="ri-home-8-line"></i></div>
                          Home Appliances
                          <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
                        </a>

                        <div className="mega">
                          <div className="flexcol">
                            <div className="row">
                              <h4><a>Kitchen</a></h4>
                              <ul>
                                <li><a>Stove</a></li>
                                <li><a>Dishwasher</a></li>
                                <li><a>Microwave</a></li>
                                <li><a>Pan</a></li>
                                <li><a>Wok</a></li>
                              </ul>
                            </div>
                          </div>

                          <div className="flexcol">
                            <div className="row">
                              <h4><a>Wall Decoration</a></h4>
                              <ul>
                                <li><a>Painting</a></li>
                                <li><a>Mirror</a></li>
                                <li><a>Photo Frame</a></li>
                                <li><a>Wall Clocks</a></li>
                                <li><a>Wall Stickers</a></li>
                              </ul>
                            </div>
                            <div className="row">
                              <h4><a>Electronics</a></h4>
                              <ul>
                                <li><a>Light</a></li>
                                <li><a>Television</a></li>
                                <li><a>Refrigerators</a></li>
                              </ul>
                            </div>
                          </div>

                          <div className="flexcol">
                            <div className="row">
                              <h4><a>Bedroom</a></h4>
                              <ul>
                                <li><a>Mattress</a></li>
                                <li><a>Bed Sheets</a></li>
                                <li><a>Pillow Cover</a></li>
                                <li><a>Blankets</a></li>
                                <li><a>Wardrobe</a></li>
                                <li><a>Study Desk</a></li>
                                <li><a>Bookshelf</a></li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </li>

                      <li>
                        <a className="click">
                          <div className="icon-large"><i className="ri-basketball-line"></i></div>
                          Sports
                        </a>
                      </li>
                      <li>
                        <a className="click">
                          <div className="icon-large"><i className="ri-shield-star-line"></i></div>
                          Best Seller
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="right">
                <div className="search-box">
                  <form className="search">
                    <span className="icon-large"><i className="ri-search-line"></i></span>
                    <input type="search" placeholder="What product are you looking for today?" />
                    <button type="submit">Search</button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </header>

      {/* ===================== MAIN ===================== */}
      <main>
        {/* slider */}
        <div className="slider">
          <div className="container">
            <div className="wrapper">
              <div className="myslider swiper">
                <div className="swiper-wrapper">
                  <div className="swiper-slide">
                    <div className="item">
                      <div className="image object-cover">
                        <img src="assets/img/slider/slider0.jpg" alt="Shoes" />
                      </div>
                      <div className="text-content flexcol">
                        <h4>Shoes</h4>
                        <h2><span>Get The Latest</span><br /><span>Shoe Collection</span></h2>
                        <a className="primary-button">Buy Now</a>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="item">
                      <div className="image object-cover">
                        <img src="assets/img/slider/slider1.jpg" alt="Fashion" />
                      </div>
                      <div className="text-content flexcol">
                        <h4>Fashion</h4>
                        <h2><span>Look Stylish</span><br /><span>All The Time</span></h2>
                        <a className="primary-button">Buy Now</a>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="item">
                      <div className="image object-cover">
                        <img src="assets/img/slider/slider2.jpg" alt="Minimalist Wooden Sofa" />
                      </div>
                      <div className="text-content flexcol">
                        <h4>Quick Offer</h4>
                        <h2><span>Minimalist Wooden Sofa</span><br /><span>Extra 50% Off</span></h2>
                        <a className="primary-button">Buy Now</a>
                      </div>
                    </div>
                  </div>

                  <div className="swiper-slide">
                    <div className="item">
                      <div className="image object-cover">
                        <img src="assets/img/slider/slider3.jpg" alt="Workout Accessories" />
                      </div>
                      <div className="text-content flexcol">
                        <h4>Best Offer</h4>
                        <h2><span>Home Workout Accessories</span><br /><span>Extra 40% Off</span></h2>
                        <a className="primary-button">Buy Now</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>
        </div>

        {/* brands */}
        {/* <div className="brands">
          <div className="container">
            <div className="wrapper flexitem">
              <div className="item"><a><img src="assets/img/brands/zara.png" alt="Brand Zara" /></a></div>
              <div className="item"><a><img src="assets/img/brands/samsung.png" alt="Brand Samsung" /></a></div>
              <div className="item"><a><img src="assets/img/brands/oppo.png" alt="Brand Oppo" /></a></div>
              <div className="item"><a><img src="assets/img/brands/asus.png" alt="Brand Asus" /></a></div>
              <div className="item"><a><img src="assets/img/brands/hurley.png" alt="Brand Hurley" /></a></div>
              <div className="item"><a><img src="assets/img/brands/dng.png" alt="Brand D&G" /></a></div>
            </div>
          </div>
        </div> */}

        {/* FLASH SALE / trending */}
        <div className="trending">
          <div className="container">
            <div className="wrapper">
              <div className="sectop flexitem">
                <h2><span className="circle"></span><span>FLASH SALE</span></h2>
              </div>

              <div className="column">
                <div className="flexwrap">
                  {/* big product */}
                  <div className="row products big">
                    <div className="item">
                      <div className="offer">
                        <p>Ends In</p>
                        <ul className="flexcenter">
                          <li>23</li><li>15</li><li>27</li><li>60</li>
                        </ul>
                      </div>

                      <div className="media">
                        <div className="image">
                          <a><img src="assets/img/products/jas345.jpg" alt="Korean Style: Get Women's Blazer at Best Price" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>45%</span></div>
                      </div>

                      <div className="content">
                        <div className="rating">
                          <div className="stars"></div>
                          <span className="mini-text">(2,548)</span>
                        </div>
                        <h3 className="main-links"><a>Korean Style: Get Women's Blazer at Best Price</a></h3>
                        <div className="price">
                          <span className="current">₹ 5500</span>
                          <span className="normal mini-text">₹ 9900</span>
                        </div>
                        <div className="stock mini-text">
                          <div className="qty">
                            <span>Stock: <strong className="qty-available">187</strong></span>
                            <span>Sold: <strong className="qty-sold">3,725</strong></span>
                          </div>
                          

                          <div className="bar"><div className="available"></div></div>
                          <div className="carbon-footprint mini-text">
                            <span>🌍 Carbon Impact: <strong>25kg CO₂</strong></span>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>

                  {/* mini products (row 1) */}
                  <div className="row products mini" style={{ marginBottom: 0 }}>
                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/paket.jpg" alt="Complete Women's Clothing Package" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>25%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Special Offer: Complete Women's Clothing Package</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(10,548)</span></div>
                        <div className="price"><span className="current">₹ 6750</span><span className="normal mini-text">₹ 9000</span></div>
                        <div className="mini-text"><p>24,376 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/tas23.jpg" alt="Multifunctional Women's Bag for Active Lifestyle" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>15%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Multifunctional Women's Bag for Active Lifestyle</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(498)</span></div>
                        <div className="price"><span className="current">₹ 2125</span><span className="normal mini-text">₹ 25000</span></div>
                        <div className="mini-text"><p>576 Sold</p><p className="stock-danger">Stock: Only 7 Left</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/outfitwanitakantor.jpg" alt="Women's Office Outfit White Top" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>10%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Women's Office Outfit White Top</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(6,548)</span></div>
                        <div className="price"><span className="current">₹ 27000</span><span className="normal mini-text">₹ 30000</span></div>
                        <div className="mini-text"><p>7,876 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/bajulakilaki.jpg" alt="Cool and Elegant Men's Shirt" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>5%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Cool and Elegant Men's Shirt</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(248)</span></div>
                        <div className="price"><span className="current">₹ 25500</span><span className="normal mini-text">₹ 27000</span></div>
                        <div className="mini-text"><p>376 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>
                  </div>

                  {/* mini products (row 2) */}
                  <div className="row products mini">
                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/shoe3.jpg" alt="Cool Unisex Shoes, Perfect for Vacation" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>17%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Cool Unisex Shoes, Perfect for Vacation</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(4,548)</span></div>
                        <div className="price"><span className="current">₹ 41500</span><span className="normal mini-text">₹ 5000</span></div>
                        <div className="mini-text"><p>5,875 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/celanawanita.jpg" alt="Affordable Women's Jeans" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>10%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Affordable Women's Jeans</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(367)</span></div>
                        <div className="price"><span className="current">₹ 18000</span><span className="normal mini-text">₹ 20000</span></div>
                        <div className="mini-text"><p>856 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/hoodiewanita.jpg" alt="Women's Hoodie, Comfortable for Sports" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>5%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Women's Hoodie, Comfortable for Sports</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(1,238)</span></div>
                        <div className="price"><span className="current">₹ 15300</span><span className="normal mini-text">₹ 17000</span></div>
                        <div className="mini-text"><p>1,563 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>

                    <div className="item">
                      <div className="media">
                        <div className="thumbnail object-cover">
                          <a><img src="assets/img/products/headphonegaming.jpg" alt="Wireless Multiplatform Gaming Headphone" /></a>
                        </div>
                        <div className="hoverable">
                          <ul>
                            <li className="active"><a><i className="ri-heart-line"></i></a></li>
                            <li><a><i className="ri-eye-line"></i></a></li>
                            <li><a><i className="ri-shuffle-line"></i></a></li>
                          </ul>
                        </div>
                        <div className="discount circle flexcenter"><span>35%</span></div>
                      </div>
                      <div className="content">
                        <h3 className="main-links"><a>Wireless Multiplatform Gaming Headphone</a></h3>
                        <div className="rating"><div className="stars"></div><span className="mini-text">(848)</span></div>
                        <div className="price"><span className="current">₹ 48500</span><span className="normal mini-text">₹ 75000</span></div>
                        <div className="mini-text"><p>1,076 Sold</p><p>Free Shipping</p><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* featured / recommendations */}
        <div className="features">
          <div className="container">
            <div className="wrapper">
              <div className="sectop flexitem">
                <h2><span className="circle"></span><span>Recommendations</span></h2>
                <div className="second-links">
                  <a className="view-all">View All<i className="ri-arrow-right-line"></i></a>
                </div>
              </div>

              <div className="column">
                <div className="products main flexwrap">
                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/home5.jpg" alt="Best Affordable Bed Cover" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>25%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Best Affordable Bed Cover</a></h3>
                      <div className="price"><span className="current">₹ 27000</span><span className="normal mini-text">₹ 39900</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                      <div className="footer">
                        <ul className="mini-text">
                          <li>Polyester, Cotton</li>
                          <li>Pull On Closure</li>
                          <li>Fashion Personality</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/shoe4.jpg" alt="Minimalist & Simple Men's Shoes" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>20%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Minimalist & Simple Men's Shoes</a></h3>
                      <div className="price"><span className="current">₹ 49000</span><span className="normal mini-text">₹ 59800</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/home3.jpg" alt="Smart Table" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>30%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Smart Table</a></h3>
                      <div className="price"><span className="current">₹ 25900</span><span className="normal mini-text">₹ 39000</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/shoe3.jpg" alt="Cool Unisex Shoes" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>17%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(4,548)</span></div>
                      <h3><a>Cool Unisex Shoes</a></h3>
                      <div className="price"><span className="current">₹ 41000</span><span className="normal mini-text">₹ 50000</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/shoe1-3.jpg" alt="Latest Men's Nike Shoes" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>30%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Latest Men's Nike Shoes</a></h3>
                      <div className="price"><span className="current">₹ 59000</span><span className="normal mini-text">₹ 79800</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/shoe5.jpg" alt="Black Nike Shoes" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>30%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Black Nike Shoes</a></h3>
                      <div className="price"><span className="current">₹ 59000</span><span className="normal mini-text">₹ 79000</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a><img src="assets/img/products/shoe2.jpg" alt="Colorful Women's Shoes" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>23%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Colorful Women's Shoes</a></h3>
                      <div className="price"><span className="current">₹ 49900</span><span className="normal mini-text">₹ 65000</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                  <div className="item">
                    <div className="media">
                      <div className="thumbnail object-cover">
                        <a href="single-product.html"><img src="assets/img/products/shoe1.jpg" alt="Nike Shoes Promo Sale" /></a>
                      </div>
                      <div className="hoverable">
                        <ul>
                          <li className="active"><a><i className="ri-heart-line"></i></a></li>
                          <li><a><i className="ri-eye-line"></i></a></li>
                          <li><a><i className="ri-shuffle-line"></i></a></li>
                        </ul>
                      </div>
                      <div className="discount circle flexcenter"><span>45%</span></div>
                    </div>
                    <div className="content">
                      <div className="rating"><div className="stars"></div><span className="mini-text">(1,568)</span></div>
                      <h3><a>Nike Shoes Promo Sale</a></h3>
                      <div className="price"><span className="current">₹ 39900</span><span className="normal mini-text">₹ 79000</span><p>🌍 Carbon Impact: <strong>25kg CO₂</strong></p></div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>

        {/* banners + product categories */}
        <div className="banners">
          <div className="container">
            <div className="wrapper">
              <div className="column">
                <div className="banner flexwrap">
                  <div className="row">
                    <div className="item">
                      <div className="image">
                        <img src="assets/img/banner/banner1.jpg" alt="Living Room Chair" />
                      </div>
                      <div className="text-content flexcol">
                        <h4>Brutal Sale!</h4>
                        <h3><span>Get Promo Now!</span><br />Living Room Chair</h3>
                        <a className="primary-button">Buy Now</a>
                      </div>
                      <a className="over-link"></a>
                    </div>
                  </div>

                  <div className="row">
                    <div className="item get-gray">
                      <div className="image">
                        <img src="assets/img/banner/banner2.jpg" alt="Clothing" />
                      </div>
                      <div className="text-content flexcol">
                        <h4>Brutal Sale!</h4>
                        <h3><span>Discount Every Day!</span><br />All Clothing</h3>
                        <a className="primary-button">Buy Now</a>
                      </div>
                      <a className="over-link"></a>
                    </div>
                  </div>
                </div>

                <div className="product-categories">
                  <div className="flexwrap">
                    <div className="row">
                      <div className="item">
                        <div className="image">
                          <img src="assets/img/banner/procat1.jpg" alt="Eyebrow Pencil" />
                        </div>
                        <div className="content mini-links">
                          <h4>Beauty</h4>
                          <ul className="flexcol">
                            <li><a>Makeup</a></li>
                            <li><a>Skin Care</a></li>
                            <li><a>Hair Care</a></li>
                            <li><a>Lipstick</a></li>
                            <li><a>Eye Cream</a></li>
                          </ul>
                          <div className="second-links">
                            <a className="view-all">View All<i className="ri-arrow-right-line"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="item">
                        <div className="image">
                          <img src="assets/img/banner/procat2.jpg" alt="iPhone" />
                        </div>
                        <div className="content mini-links">
                          <h4>Gadget</h4>
                          <ul className="flexcol">
                            <li><a>Camera</a></li>
                            <li><a>Mobile Phones</a></li>
                            <li><a>Cellphone</a></li>
                            <li><a>Tablet</a></li>
                            <li><a>Headphone</a></li>
                          </ul>
                          <div className="second-links">
                            <a className="view-all">View All<i className="ri-arrow-right-line"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row">
                      <div className="item">
                        <div className="image">
                          <img src="assets/img/banner/procat3.jpg" alt="Plant decoration" />
                        </div>
                        <div className="content mini-links">
                          <h4>Home Decor</h4>
                          <ul className="flexcol">
                            <li><a>Kitchen</a></li>
                            <li><a>Dining Room</a></li>
                            <li><a>Pantry</a></li>
                            <li><a>Living Room</a></li>
                            <li><a>Bathroom</a></li>
                          </ul>
                          <div className="second-links">
                            <a className="view-all">View All<i className="ri-arrow-right-line"></i></a>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer>
        {/* newsletter */}
        <div className="newsletter">
          <div className="container">
            <div className="wrapper">
              <div className="box">
                <div className="content">
                  <h3>Join Newsletter</h3>
                  <p>Get email updates about our store and <strong>special offers</strong></p>
                </div>
                <form className="search">
                  <span className="icon-large"><i className="ri-mail-line"></i></span>
                  <input type="mail" name="email" placeholder="Enter your email" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* widgets */}
        <div className="widgets">
          <div className="container">
            <div className="wrapper">
              <div className="flexwrap">
                <div className="row">
                  <div className="item mini-links">
                    <h4>Help & Contact</h4>
                    <ul className="flexcol">
                      <li><a>My Account</a></li>
                      <li><a>FAQ</a></li>
                      <li><a>Order Tracking</a></li>
                      <li><a>Help Categories</a></li>
                      <li><a>Terms & Conditions</a></li>
                      <li><a>Contact Customer Support</a></li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div className="item mini-links">
                    <h4>Product Categories</h4>
                    <ul className="flexcol">
                      <li><a>Beauty</a></li>
                      <li><a>Electronics</a></li>
                      <li><a>Women's Fashion</a></li>
                      <li><a>Men's Fashion</a></li>
                      <li><a>Kids' Fashion</a></li>
                      <li><a>Health</a></li>
                      <li><a>Home Appliances</a></li>
                      <li><a>Pet Food</a></li>
                      <li><a>Sports</a></li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div className="item mini-links">
                    <h4>Payment</h4>
                    <ul className="flexcol">
                      <li><a>E-Wallet</a></li>
                      <li><a>Cash on Delivery</a></li>
                      <li><a>Bank Transfer</a></li>
                      <li><a>Paypal</a></li>
                      <li><a>Bitcoin</a></li>
                    </ul>
                  </div>
                </div>

                <div className="row">
                  <div className="item mini-links">
                    <h4>About Us</h4>
                    <ul className="flexcol">
                      <li><a>Careers</a></li>
                      <li><a>News</a></li>
                      <li><a>Company Info</a></li>
                      <li><a>Privacy Policy</a></li>
                      <li><a>Legal Statement</a></li>
                    </ul>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* footer info */}
        <div className="footer-info">
          <div className="container">
            <div className="wrapper">
              <div className="flexcol">
                <div className="logo">
                  <a><span className="circle"></span>&nbsp;EcoBazaarX</a>
                </div>
                <div className="socials">
                  <ul className="flexitem">
                    <li><a><i className="ri-twitter-line"></i></a></li>
                    <li><a><i className="ri-facebook-line"></i></a></li>
                    <li><a><i className="ri-instagram-line"></i></a></li>
                    <li><a><i className="ri-linkedin-line"></i></a></li>
                    <li><a><i className="ri-youtube-line"></i></a></li>
                  </ul>
                </div>
              </div>
              <p className="mini-text">&copy; Copyright 2025 EcoBazaarX. All right reserved</p>
            </div>
          </div>
        </div>

        {/* nav menu mobile */}
        <div className="menu-bottom desktop-hide">
          <div className="container">
            <div className="wrapper">
              <nav>
                <ul className="flexitem">
                  <li><a><i className="ri-bar-chart-line"></i><span>Trending</span></a></li>
                  <li><a><i className="ri-user-6-line"></i><span>My Account</span></a></li>
                  <li><a><i className="ri-heart-line"></i><span>Wishlist</span></a></li>
                  <li><a className="t-search"><i className="ri-search-line"></i><span>Search</span></a></li>
                  <li>
                    <a>
                      <i className="ri-shopping-cart-line"></i>
                      <span>Cart</span>
                      <div className="fly-item"><span className="item-number">0</span></div>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* search bottom mobile */}
        <div className="search-bottom desktop-hide">
          <div className="container">
            <div className="wrapper">
              <form className="search">
                <a className="t-close search-close flexcenter"><i className="ri-close-line"></i></a>
                <span className="icon-large"><i className="ri-search-line"></i></span>
                <input type="search" name="search" placeholder="What product are you looking for today?" required />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
      </footer>
    </div>
  );
};

export default Home;

// src/components/SingleProduct/Header.jsx
import React, { useState } from "react";

function Header() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <header>
      <div className="header-top mobile-hide">
        <div className="container">
          <div className="wrapper flexitem">
            <div className="left">
              <ul className="flexitem main-links">
                <li>
                  <a href="#">Help</a>
                </li>
                <li>
                  <a href="#">Promos</a>
                </li>
                <li>
                  <a href="#">About EcoBazaarX</a>
                </li>
              </ul>
            </div>
            <div className="right">
              <ul className="flexitem main-links">
                <li>
                  <a href="#">Register</a>
                </li>
                <li>
                  <a href="#">Login</a>
                </li>
                <li>
                  <a href="#">Track Order</a>
                </li>
                <li>
                  <a href="#">
                    English
                    <span className="icon-small">
                      <i className="ri-arrow-down-s-line"></i>
                    </span>
                  </a>
                  <ul>
                    <li className="current">
                      <a href="#">English</a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header-nav">
        <div className="container">
          <div className="wrapper flexitem">
            <a className="trigger desktop-hide">
              <i className="ri-menu-2-line"></i>
            </a>
            <div className="left flexitem">
              <div className="logo">
                <a href="/bubblethemeshop">
                  <span className="circle"></span>&nbsp;EcoBazaarX
                </a>
              </div>
              <nav className="mobile-hide">
                <ul className="flexitem second-links">
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">Special Discounts</a>
                  </li>
                  <li>
                    <a href="#">Mobile Phones & Tablets</a>
                  </li>

                  <li className="has-child">
                    <a href="#">
                      Beauty
                      <div className="icon-small">
                        <i className="ri-arrow-down-s-line"></i>
                      </div>
                    </a>
                    <div className="mega">
                      <div className="container">
                        <div className="wrapper">
                          <div className="flexcol">
                            <div className="row">
                              <h4>Women's Clothing</h4>
                              <ul>
                                <li>
                                  <a href="#">Dress</a>
                                </li>
                                <li>
                                  <a href="#">Shirt</a>
                                </li>
                                <li>
                                  <a href="#">Jacket</a>
                                </li>
                                <li>
                                  <a href="#">Pants</a>
                                </li>
                                <li>
                                  <a href="#">Sweater</a>
                                </li>
                                <li>
                                  <a href="#">Cardigan</a>
                                </li>
                                <li>
                                  <a href="#">Hoodie & Sweatshirt</a>
                                </li>
                                <li>
                                  <a href="#">Pajamas & Robes</a>
                                </li>
                                <li>
                                  <a href="#">T-shirt</a>
                                </li>
                                <li>
                                  <a href="#">Swimwear</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flexcol">
                            <div className="row">
                              <h4>Jewelry</h4>
                              <ul>
                                <li>
                                  <a href="#">Earrings</a>
                                </li>
                                <li>
                                  <a href="#">Brooch</a>
                                </li>
                                <li>
                                  <a href="#">Ring</a>
                                </li>
                                <li>
                                  <a href="#">Necklace</a>
                                </li>
                                <li>
                                  <a href="#">Bracelet</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flexcol">
                            <div className="row">
                              <h4>Beauty</h4>
                              <ul>
                                <li>
                                  <a href="#">Makeup & Cosmetics</a>
                                </li>
                                <li>
                                  <a href="#">Bath Accessories</a>
                                </li>
                                <li>
                                  <a href="#">Skin Care</a>
                                </li>
                                <li>
                                  <a href="#">Hair Care</a>
                                </li>
                                <li>
                                  <a href="#">Perfume & Aromatherapy</a>
                                </li>
                                <li>
                                  <a href="#">Masks & Face Covers</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flexcol">
                            <div className="row">
                              <h4>Cosmetics & Makeup</h4>
                              <ul>
                                <li>
                                  <a href="#">Powder</a>
                                </li>
                                <li>
                                  <a href="#">Lipstick</a>
                                </li>
                                <li>
                                  <a href="#">Eye Pencil</a>
                                </li>
                                <li>
                                  <a href="#">Eyebrow Pencil</a>
                                </li>
                                <li>
                                  <a href="#">Blush</a>
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="flexcol products">
                            <div className="row">
                              <div className="media">
                                <div className="thumbnail object-cover">
                                  <a href="#">
                                    <img
                                      src="assets/img/products/apparel4.jpg"
                                      alt="Best Seller"
                                    />
                                  </a>
                                </div>
                              </div>
                              <div className="text-content">
                                <h4>Best Seller!</h4>
                                <a href="#" className="primary-button">
                                  Shop Now
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="right">
              <ul className="flexitem second-links">
                <li className="mobile-hide">
                  <a href="#">
                    <div className="icon-large">
                      <i className="ri-heart-line"></i>
                    </div>
                    <div className="fly-item">
                      <span className="item-number">0</span>
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="iscart">
                    <div className="icon-large">
                      <i className="ri-shopping-cart-line"></i>
                      <div className="fly-item">
                        <span className="item-number">0</span>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="header-main mobile-hide">
        <div className="container">
          <div className="wrapper flexitem">
            <div className="left">
              <div className="search-box">
                <form action="" className="search">
                  <span className="icon-large">
                    <i className="ri-search-line"></i>
                  </span>
                  <input
                    type="search"
                    placeholder="What product are you looking for today?"
                  />
                  <button type="submit">Search</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

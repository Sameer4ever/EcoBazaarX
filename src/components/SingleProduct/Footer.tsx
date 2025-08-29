// src/components/SingleProduct/Footer.jsx
import React from "react";

function Footer() {
  return (
  <footer>
      {/* <!-- newsletter --> */}
        <div className="newsletter">
          <div className="container">
            <div className="wrapper">
              <div className="box">
                <div className="content">
                  <h3>Join Newsletter</h3>
                  <p>
                    Get email updates about our store and
                    <strong>special offers</strong>
                  </p>
                </div>
                <form action="" className="search">
                  <span className="icon-large"><i className="ri-mail-line"></i></span>
                  <input
                    type="mail"
                    name="email"
                    placeholder="Enter your email"
                    required
                  />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- widgets --> */}
        <div className="widgets">
          <div className="container">
            <div className="wrapper">
              <div className="flexwrap">
                <div className="row">
                  <div className="item mini-links">
                    <h4>Help & Contact</h4>
                    <ul className="flexcol">
                      <li><a href="#">My Account</a></li>
                      <li><a href="#">FAQ</a></li>
                      <li><a href="#">Order Tracking</a></li>
                      <li><a href="#">Help Categories</a></li>
                      <li><a href="#">Terms & Conditions</a></li>
                      <li><a href="#">Contact Customer Support</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="item mini-links">
                    <h4>Product Categories</h4>
                    <ul className="flexcol">
                      <li><a href="#">Beauty</a></li>
                      <li><a href="#">Electronics</a></li>
                      <li><a href="#">Women's Fashion</a></li>
                      <li><a href="#">Men's Fashion</a></li>
                      <li><a href="#">Kids' Fashion</a></li>
                      <li><a href="#">Health</a></li>
                      <li><a href="#">Home Appliances</a></li>
                      <li><a href="#">Pet Food</a></li>
                      <li><a href="#">Sports</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="item mini-links">
                    <h4>Payment</h4>
                    <ul className="flexcol">
                      <li><a href="#">E-Wallet</a></li>
                      <li><a href="#">Cash on Delivery</a></li>
                      <li><a href="#">Bank Transfer</a></li>
                      <li><a href="#">Paypal</a></li>
                      <li><a href="#">Bitcoin</a></li>
                    </ul>
                  </div>
                </div>
                <div className="row">
                  <div className="item mini-links">
                    <h4>About Us</h4>
                    <ul className="flexcol">
                      <li><a href="">Careers</a></li>
                      <li><a href="">News</a></li>
                      <li><a href="">Company Info</a></li>
                      <li><a href="">Privacy Policy</a></li>
                      <li><a href="">Legal Statement</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- footer info --> */}
        <div className="footer-info">
          <div className="container">
            <div className="wrapper">
              <div className="flexcol">
                <div className="logo">
                  <a href="#"><span className="circle"></span>&nbsp;EcoBazaarX</a>
                </div>
                <div className="socials">
                  <ul className="flexitem">
                    <li>
                      <a href="#"><i className="ri-twitter-line"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="ri-facebook-line"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="ri-instagram-line"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="ri-linkedin-line"></i></a>
                    </li>
                    <li>
                      <a href="#"><i className="ri-youtube-line"></i></a>
                    </li>
                  </ul>
                </div>
              </div>
              <p className="mini-text">
                &copy; Copyright 2025 EcoBazaarX. All right reserved
              </p>
            </div>
          </div>
        </div>

        {/* <!-- nav menu mobile --> */}
        <div className="menu-bottom desktop-hide">
          <div className="container">
            <div className="wrapper">
              <nav>
                <ul className="flexitem">
                  <li>
                    <a href="#">
                      <i className="ri-bar-chart-line"></i>
                      <span>Trending</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ri-user-6-line"></i>
                      <span>My Account</span>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="ri-heart-line"></i>
                      <span>Wishlist</span>
                    </a>
                  </li>
                  <li>
                    <a href="#0" className="t-search">
                      <i className="ri-search-line"></i>
                      <span>Search</span>
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <i className="ri-shopping-cart-line"></i>
                      <span>Cart</span>
                      <div className="fly-item">
                        <span className="item-number">0</span>
                      </div>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>

        {/* <!-- search bottom mobile --> */}
        <div className="search-bottom desktop-hide">
          <div className="container">
            <div className="wrapper">
              <form action="" className="search">
                <a href="#0" className="t-close search-close flexcenter"
                  ><i className="ri-close-line"></i
                ></a>
                <span className="icon-large"><i className="ri-search-line"></i></span>
                <input
                  type="search"
                  name="search"
                  placeholder="What product are you looking for today?"
                  required
                />
                <button type="submit">Search</button>
              </form>
            </div>
          </div>
        </div>
        <div className="overlay"></div>
    </footer>
  );
}

export default Footer;

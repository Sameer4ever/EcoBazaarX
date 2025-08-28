import { useState } from "react";

interface DepartmentsMenuProps {
  defaultOpen?: boolean;
}

export default function DepartmentsMenu({ defaultOpen = false }: DepartmentsMenuProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="dpt-cat">
      <div className="dpt-head flex justify-between items-center">
        <div className="main-text">All Categories</div>
        <div className="mini-text mobile-hide">Total 1082 Products</div>
        <button
          className="dpt-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
        >
          {isOpen ? (
            <i className="ri-arrow-up-s-line ri-xl"></i>
          ) : (
            <i className="ri-arrow-down-s-line ri-xl"></i>
          )}
        </button>
      </div>

      {/* Categories Menu */}
      {isOpen && (
        <div className="dpt-menu">
          <ul className="second-links">
            {/* Beauty */}
            <li className="has-child beauty">
              <a href="#">
                <div className="icon-large"><i className="ri-bear-smile-line"></i></div>
                Beauty
                <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
              </a>
              <ul>
                <li><a href="#">Makeup</a></li>
                <li><a href="#">Skin Care</a></li>
                <li><a href="#">Hair Care</a></li>
                <li><a href="#">Powder</a></li>
                <li><a href="#">Lipstick</a></li>
                <li><a href="#">Eye Cream</a></li>
                <li><a href="#">Body Lotion</a></li>
              </ul>
            </li>

            {/* Electronics */}
            <li className="has-child electric">
              <a href="#">
                <div className="icon-large"><i className="ri-headphone-fill"></i></div>
                Electronics
                <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
              </a>
              <ul>
                <li><a href="#">Camera</a></li>
                <li><a href="#">Mobile Phones</a></li>
                <li><a href="#">Computer</a></li>
                <li><a href="#">Laptop</a></li>
                <li><a href="#">Headphone</a></li>
                <li><a href="#">Fan</a></li>
                <li><a href="#">Television</a></li>
                <li><a href="#">Hair Dryer</a></li>
                <li><a href="#">Light</a></li>
              </ul>
            </li>

            {/* Women's Fashion */}
            <li className="has-child fashion">
              <a href="#">
                <div className="icon-large"><i className="ri-t-shirt-air-line"></i></div>
                Women's Fashion
                <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
              </a>
              <ul>
                <li><a href="#">Dress</a></li>
                <li><a href="#">Shoes</a></li>
                <li><a href="#">Watches</a></li>
                <li><a href="#">Bags</a></li>
                <li><a href="#">Trousers</a></li>
                <li><a href="#">Jacket</a></li>
              </ul>
            </li>

            {/* Men's Fashion */}
            <li>
              <a href="#">
                <div className="icon-large"><i className="ri-shirt-line"></i></div>
                Men's Fashion
              </a>
            </li>

            {/* Kid's Fashion */}
            <li>
              <a href="#">
                <div className="icon-large"><i className="ri-user-5-line"></i></div>
                Kid's Fashion
              </a>
            </li>

            {/* Health */}
            <li>
              <a href="#">
                <div className="icon-large"><i className="ri-heart-pulse-line"></i></div>
                Health
              </a>
            </li>

            {/* Home Appliances */}
            <li className="has-child homekit">
              <a href="#">
                <div className="icon-large"><i className="ri-home-8-line"></i></div>
                Home Appliances
                <div className="icon-small"><i className="ri-arrow-right-s-line"></i></div>
              </a>
              <div className="mega">
                <div className="flexcol">
                  <div className="row">
                    <h4><a href="#">Kitchen</a></h4>
                    <ul>
                      <li><a href="#">Stove</a></li>
                      <li><a href="#">Dishwasher</a></li>
                      <li><a href="#">Microwave</a></li>
                      <li><a href="#">Pan</a></li>
                      <li><a href="#">Wok</a></li>
                    </ul>
                  </div>
                </div>
                <div className="flexcol">
                  <div className="row">
                    <h4><a href="#">Wall Decoration</a></h4>
                    <ul>
                      <li><a href="#">Painting</a></li>
                      <li><a href="#">Mirror</a></li>
                      <li><a href="#">Photo Frame</a></li>
                      <li><a href="#">Wall Clocks</a></li>
                      <li><a href="#">Wall Stickers</a></li>
                    </ul>
                  </div>
                  <div className="row">
                    <h4><a href="#">Electronics</a></h4>
                    <ul>
                      <li><a href="#">Light</a></li>
                      <li><a href="#">Television</a></li>
                      <li><a href="#">Refrigerators</a></li>
                    </ul>
                  </div>
                </div>
                <div className="flexcol">
                  <div className="row">
                    <h4><a href="#">Bedroom</a></h4>
                    <ul>
                      <li><a href="#">Mattress</a></li>
                      <li><a href="#">Bed Sheets</a></li>
                      <li><a href="#">Pillow Cover</a></li>
                      <li><a href="#">Blankets</a></li>
                      <li><a href="#">Wardrobe</a></li>
                      <li><a href="#">Study Desk</a></li>
                      <li><a href="#">Bookshelf</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

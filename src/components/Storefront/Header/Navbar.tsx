export default function Navbar() {
  return (
    <div className="header-nav">
      <div className="container">
        <nav className="flexitem">
          <ul className="main-menu flexitem">
            <li className="beauty">
              <a href="#">Beauty <i className="ri-arrow-down-s-line"></i></a>
              <div className="submenu">
                <ul>
                  <li><a href="#">Skincare</a></li>
                  <li><a href="#">Makeup</a></li>
                  <li><a href="#">Fragrances</a></li>
                </ul>
              </div>
            </li>
            <li className="electric">
              <a href="#">Electronics <i className="ri-arrow-down-s-line"></i></a>
              <div className="submenu">
                <ul>
                  <li><a href="#">Mobiles</a></li>
                  <li><a href="#">Laptops</a></li>
                  <li><a href="#">Headphones</a></li>
                </ul>
              </div>
            </li>
            <li className="fashion">
              <a href="#">Fashion <i className="ri-arrow-down-s-line"></i></a>
              <div className="submenu">
                <ul>
                  <li><a href="#">Men</a></li>
                  <li><a href="#">Women</a></li>
                  <li><a href="#">Kids</a></li>
                </ul>
              </div>
            </li>
            <li className="homekit">
              <a href="#">Home & Kitchen <i className="ri-arrow-down-s-line"></i></a>
              <div className="submenu mega">
                <ul>
                  <li><a href="#">Furniture</a></li>
                  <li><a href="#">Decor</a></li>
                  <li><a href="#">Cookware</a></li>
                </ul>
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

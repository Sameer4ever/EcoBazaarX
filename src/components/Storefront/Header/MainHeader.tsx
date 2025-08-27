import { Link } from "react-router-dom";

export default function MainHeader() {
  return (
    <div className="header-main">
      <div className="container flexitem">
        <div className="left">
          <div className="logo">
            <Link to="/">EcoBazaarX</Link>
          </div>
        </div>

        <div className="center">
          <div className="search-box">
            <form>
              <span className="icon-large"><i className="ri-search-line"></i></span>
              <input type="search" placeholder="Search for products..." />
              <button type="submit">Search</button>
            </form>
          </div>
        </div>

        <div className="right">
          <ul className="icons flexitem">
            <li><Link to="/wishlist"><i className="ri-heart-line"></i></Link></li>
            <li><Link to="/cart"><i className="ri-shopping-cart-line"></i></Link></li>
          </ul>
        </div>
      </div>
    </div>
  );
}

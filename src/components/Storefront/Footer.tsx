import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container wrapper flexitem">
        <div className="flexcol">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/signin">Login</Link></li>
            <li><Link to="/signup">Register</Link></li>
            <li><Link to="/cart">Cart</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
          </ul>
        </div>
        <div className="flexcol">
          <h4>Support</h4>
          <ul>
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Returns</a></li>
            <li><a href="#">Shipping</a></li>
          </ul>
        </div>
        <div className="flexcol">
          <h4>Follow Us</h4>
          <ul className="socials flexitem">
            <li><a href="#"><i className="ri-facebook-fill"></i></a></li>
            <li><a href="#"><i className="ri-instagram-line"></i></a></li>
            <li><a href="#"><i className="ri-twitter-x-line"></i></a></li>
          </ul>
        </div>
      </div>
      <div className="bottom">
        <p>© {new Date().getFullYear()} EcoBazaarX. All rights reserved.</p>
      </div>
    </footer>
  );
}

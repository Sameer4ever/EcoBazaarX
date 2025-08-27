import { Link } from "react-router-dom";

export default function Topbar() {
  return (
    <div className="header-top">
      <div className="container flexitem">
        <ul className="flexitem main-links">
          <li><Link to="/signin">Login</Link></li>
          <li><a href="#">Track Order</a></li>
          <li>
            <a href="#">India <i className="ri-arrow-down-s-line"></i></a>
            <ul>
              <li className="current"><a href="#">Other</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
}

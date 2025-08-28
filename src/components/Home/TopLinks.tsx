import { Link } from "react-router-dom";

export default function TopLinks() {
  return (
    <ul className="flexitem main-links">
      <Link to="/signin">Login</Link>
      <li><a href="#">Track Order</a></li>
      <li>
        <a href="#">
          India
          <span className="icon-small">
            <i className="ri-arrow-down-s-line"></i>
          </span>
        </a>
        <ul>
          <li className="current"><a href="#">Other</a></li>
        </ul>
      </li>
    </ul>
  );
}

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="widget">
        <h3>Categories</h3>
        <ul>
          <li><a href="#">Fashion</a></li>
          <li><a href="#">Accessories</a></li>
          <li><a href="#">Eco Bags</a></li>
        </ul>
      </div>

      <div className="widget">
        <h3>Promotions</h3>
        <a href="#"><img src="/assets/img/banner/sidebar-promo.jpg" alt="promo" /></a>
      </div>
    </aside>
  );
}

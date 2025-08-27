export default function Categories() {
  return (
    <section className="categories">
      <div className="container">
        <div className="section-heading">
          <h2>Shop by Category</h2>
        </div>
        <div className="category-grid">
          <div className="category-card">
            <img src="/assets/img/menu/menu_bg1.jpg" alt="Beauty" />
            <h3>Beauty</h3>
          </div>
          <div className="category-card">
            <img src="/assets/img/menu/menu_bg3.jpg" alt="Fashion" />
            <h3>Fashion</h3>
          </div>
          <div className="category-card">
            <img src="/assets/img/menu/menu_bg2.jpg" alt="Electronics" />
            <h3>Electronics</h3>
          </div>
          <div className="category-card">
            <img src="/assets/img/menu/menu_bg4.jpg" alt="Home & Kitchen" />
            <h3>Home & Kitchen</h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeaturedProducts() {
  return (
    <section className="featured-products">
      <div className="container">
        <div className="section-heading">
          <h2>Trending Products</h2>
        </div>
        <div className="products flexwrap">
          <div className="item">
            <div className="media">
              <img src="/assets/img/products/prod1.jpg" alt="Shoes" />
            </div>
            <div className="content">
              <h3 className="main-links">Trendy Shoes</h3>
              <div className="price"><span className="current">₹1999</span></div>
            </div>
          </div>
          <div className="item">
            <div className="media">
              <img src="/assets/img/products/prod2.jpg" alt="Jacket" />
            </div>
            <div className="content">
              <h3 className="main-links">Stylish Jacket</h3>
              <div className="price"><span className="current">₹3499</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

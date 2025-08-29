// src/components/Features.tsx
import { Link } from "react-router-dom";
import { products } from "../../data/products";


export default function Features() {
  return (
    <section className="features">
      <div className="container">
        <div className="wrapper">
          <div className="sectop flexitem">
            <h2>
              <span className="circle"></span>
              <span>🌱 Eco Picks for You</span>
            </h2>
            <div className="second-links">
              <Link to="/" className="view-all">
                View All<i className="ri-arrow-right-line"></i>
              </Link>
            </div>
          </div>

          <div className="column">
            <div className="products main flexwrap">
              {products.map((p) => (
                <div className="item" key={p.id}>
                  <div className="media">
                    <div className="thumbnail object-cover">
                      <Link to={`/product/${p.id}`}>
                        <img src={p.images[0]} alt={p.name} />
                      </Link>
                    </div>

                    <div className="hoverable">
                      <ul>
                        <li className="active">
                          <Link to={`/product/${p.id}`}>
                            <i className="ri-heart-line"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={`/product/${p.id}`}>
                            <i className="ri-eye-line"></i>
                          </Link>
                        </li>
                        <li>
                          <Link to={`/product/${p.id}`}>
                            <i className="ri-shuffle-line"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>

                    {p.discount && (
                      <div className="discount circle flexcenter">
                        <span>{p.discount}%</span>
                      </div>
                    )}
                  </div>

                  <div className="content">
                    <div className="rating">
                      <div className="stars"></div>
                      <span className="mini-text">(1,568)</span>
                    </div>
                    <h3>
                      <Link to={`/product/${p.id}`}>{p.name}</Link>
                    </h3>
                    <div className="price">
                      <span className="current">₹ {p.price}</span>
                      {p.oldPrice && (
                        <span className="normal mini-text">₹ {p.oldPrice}</span>
                      )}
                    </div>

                    <div className="carbonImpact">
                      <span className="normal ">Carbon Impact {p["Carbon Impact"]}</span>
            
                    </div>
                    {p.description && (
                      <div className="footer">
                        <ul className="mini-text">
                          {p.description.split(". ").map((d, i) =>
                            d.trim() ? <li key={i}>{d}</li> : null
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Keep your banners & categories section as before */}
      <div className="banners">
        <div className="container">
          <div className="wrapper">
            <div className="column">
              <div className="banner flexwrap">
                <div className="row">
                  <div className="item">
                    <div className="image">
                      <img
                        src="/assets/img/banner/banner1.jpg"
                        alt="Living Room Chair"
                      />
                    </div>
                    <div className="text-content flexcol">
                      <h4>Brutal Sale!</h4>
                      <h3>
                        <span>Get Promo Now!</span>
                        <br />
                        Living Room Chair
                      </h3>
                      <Link to="/" className="primary-button">
                        Buy Now
                      </Link>
                    </div>
                    <Link to="/" className="over-link"></Link>
                  </div>
                </div>
                <div className="row">
                  <div className="item get-gray">
                    <div className="image">
                      <img
                        src="/assets/img/banner/banner2.jpg"
                        alt="Clothing"
                      />
                    </div>
                    <div className="text-content flexcol">
                      <h4>Brutal Sale!</h4>
                      <h3>
                        <span>Discount Every Day!</span>
                        <br />
                        All Clothing
                      </h3>
                      <Link to="/" className="primary-button">
                        Buy Now
                      </Link>
                    </div>
                    <Link to="/" className="over-link"></Link>
                  </div>
                </div>
              </div>

              {/* categories */}
              <div className="product-categories">
                <div className="flexwrap">
                  <div className="row">
                    <div className="item">
                      <div className="image">
                        <img
                          src="/assets/img/banner/procat1.jpg"
                          alt="Eyebrow Pencil"
                        />
                      </div>
                      <div className="content mini-links">
                        <h4>Beauty</h4>
                        <ul className="flexcol">
                          <li><Link to="/">Makeup</Link></li>
                          <li><Link to="/">Skin Care</Link></li>
                          <li><Link to="/">Hair Care</Link></li>
                          <li><Link to="/">Lipstick</Link></li>
                          <li><Link to="/">Eye Cream</Link></li>
                        </ul>
                        <div className="second-links">
                          <Link to="/" className="view-all">
                            View All<i className="ri-arrow-right-line"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="item">
                      <div className="image">
                        <img
                          src="/assets/img/banner/procat2.jpg"
                          alt="iPhone"
                        />
                      </div>
                      <div className="content mini-links">
                        <h4>Gadget</h4>
                        <ul className="flexcol">
                          <li><Link to="/">Camera</Link></li>
                          <li><Link to="/">Mobile Phones</Link></li>
                          <li><Link to="/">Cellphone</Link></li>
                          <li><Link to="/">Tablet</Link></li>
                          <li><Link to="/">Headphone</Link></li>
                        </ul>
                        <div className="second-links">
                          <Link to="/" className="view-all">
                            View All<i className="ri-arrow-right-line"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="item">
                      <div className="image">
                        <img
                          src="/assets/img/banner/procat3.jpg"
                          alt="Plant decoration"
                        />
                      </div>
                      <div className="content mini-links">
                        <h4>Home Decor</h4>
                        <ul className="flexcol">
                          <li><Link to="/">Kitchen</Link></li>
                          <li><Link to="/">Dining Room</Link></li>
                          <li><Link to="/">Pantry</Link></li>
                          <li><Link to="/">Living Room</Link></li>
                          <li><Link to="/">Bathroom</Link></li>
                        </ul>
                        <div className="second-links">
                          <Link to="/" className="view-all">
                            View All<i className="ri-arrow-right-line"></i>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* end categories */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/Trending.tsx
import { Link } from "react-router-dom";
import { products } from "../../data/products"; // ✅ correct


export default function Trending() {
  // pick only trending products (ids 9–17 in this case)
  const trendingProducts = products.filter((p) => p.id >= 9 && p.id <= 17);

  return (
    <section className="trending">
      <div className="container">
        <div className="wrapper">
          <div className="sectop flexitem">
            <h2>
              <span className="circle"></span>
              <span>FLASH SALE</span>
            </h2>
          </div>

          <div className="column">
            <div className="flexwrap">
              {trendingProducts.map((p, index) => (
                <div
                  className={`row products ${index === 0 ? "big" : "mini"}`}
                  key={p.id}
                >
                  <div className="item">
                    {index === 0 && (
                      <div className="offer">
                        <p>Ends In</p>
                        <ul className="flexcenter">
                          <li>23</li>
                          <li>15</li>
                          <li>27</li>
                          <li>60</li>
                        </ul>
                      </div>
                    )}

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
                        <span className="mini-text">(2,548)</span>
                      </div>
                      <h3 className="main-links">
                        <Link to={`/product/${p.id}`}>{p.name}</Link>
                      </h3>
                      <div className="price">
                        <span className="current">₹ {p.price}</span>
                        {p.oldPrice && (
                          <span className="normal mini-text">₹ {p.oldPrice}</span>
                        )}
                      </div>
                      <div className="mini-text">
                        <p>Free Shipping</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

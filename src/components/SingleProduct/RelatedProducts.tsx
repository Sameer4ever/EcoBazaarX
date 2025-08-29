// src/components/SingleProduct/RelatedProducts.tsx
import React from "react";
import { Link } from "react-router-dom";
import { products, Product } from "../../data/products";

interface Props {
  category: string;
  currentProductId: number;
}

export default function RelatedProducts({ category, currentProductId }: Props) {
  const related = products
    .filter((p) => p.category === category && p.id !== currentProductId)
    .slice(0, 4); // limit to 4

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <section className="features">
      <div className="container">
        <div className="wrapper">
          <div className="sectop flexitem">
            <h2>
              <span className="circle"></span>Related Products
            </h2>
            <Link to="/" className="view-all">
              View All
            </Link>
          </div>

          <div className="column">
            <div className="products main flexwrap">
              {related.map((p) => (
                <div className="item" key={p.id}>
                  <div className="media">
                    <div className="thumbnail object-cover">
                      <Link to={`/product/${p.id}`}>
                        <img src={p.images[0]} alt={p.name} />
                      </Link>
                    </div>
                  </div>
                  <div className="content">
                    <h3>
                      <Link to={`/product/${p.id}`}>{p.name}</Link>
                    </h3>
                    <div className="price">
                      <span className="current">₹ {formatPrice(p.price)}</span>
                      {p.oldPrice && (
                        <span className="normal mini-text">
                          ₹ {formatPrice(p.oldPrice)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {related.length === 0 && (
                <p className="mini-text">No related products found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// src/components/SingleProduct/ProductDetails.tsx
import React from "react";
import { Product } from "../../data/products";
import { useNavigate } from "react-router-dom";

interface Props {
  product: Product;
}

export default function ProductDetails({ product }: Props) {
  const navigate = useNavigate(); // 👈 hook for navigation
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("en-IN").format(value);

  return (
    <div className="row">
      <div className="item">
        <h1>{product.name}</h1>
        <div className="content">
          {/* rating + reviews */}
          <div className="rating">
            <div className="stars"></div>
            <span className="mini-text">
              {product.reviews?.toLocaleString()} Reviews
            </span>
            <a href="#" className="add-review mini-text">
              Add Review
            </a>
          </div>

          {/* stock + category */}
          <div className="stock-sku">
            {product.stock && product.stock > 0 ? (
              <span className="available">Available</span>
            ) : (
              <span className="not-available">Out of Stock</span>
            )}
            <span className="sku mini-text">{product.category}</span>
          </div>

          {/* price */}
          <div className="price">
            <span className="current">₹ {formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="normal">₹ {formatPrice(product.oldPrice)}</span>
            )}
          </div>

          {/* colors (demo values for now) */}
          <div className="colors">
            <p>Color</p>
            <div className="variant">
              <label>
                <input type="radio" name="color" /> Grey
              </label>
              <label>
                <input type="radio" name="color" /> Blue
              </label>
              <label>
                <input type="radio" name="color" /> Green
              </label>
            </div>
          </div>

          {/* sizes (demo values for now) */}
          <div className="sizes">
            <p>Size</p>
            <div className="variant">
              {[40, 41, 42, 43, 44].map((size) => (
                <label key={size}>
                  <input type="radio" name="size" /> {size}
                </label>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="actions">
            <div className="qty-control flexitem">
              <button className="minus circle">-</button>
              <input type="text" value="1" readOnly />
              <button className="plus circle">+</button>
            </div>
            <div className="button-cart">
              <div style={{ display: "flex", gap: "30px" }}>
                <button className="primary-button">
                  <i className="ri-add-line"></i> Cart
                </button>
                <button
                  className="primary-button"
                  onClick={
                    () => navigate("/checkout", { state: { product } }) // 👈 pass product
                  }
                >
                  <i className="ri-add-line"></i> Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* description */}
          <div className="description collapse">
            <ul>
              <li className="has-child expand">
                <a className="icon-small click">Product Information</a>
                <ul className="content">
                  <li>
                    <span>Category</span> {product.category}
                  </li>
                  {product.stock !== undefined && (
                    <li>
                      <span>Stock</span> {product.stock}
                    </li>
                  )}
                  {product.sold !== undefined && (
                    <li>
                      <span>Sold</span> {product.sold}
                    </li>
                  )}
                </ul>
              </li>
              <li className="has-child">
                <a className="icon-small click">Details</a>
                <div className="content">
                  <p>{product.description}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

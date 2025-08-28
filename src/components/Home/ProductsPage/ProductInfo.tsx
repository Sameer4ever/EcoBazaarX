// src/components/ProductsPage/ProductInfo.tsx
import { products } from "../../../data/products";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="product-info">
      <h1 className="product-name">{product.name}</h1>

      {/* Rating */}
      <div className="rating">
        <span>⭐ {product.rating?.toFixed(1) ?? "N/A"}</span>
        <span className="reviews">({product.reviews ?? 0} reviews)</span>
      </div>

      {/* Price */}
      <div className="price">
        <span className="current">₹ {product.price}</span>
        {product.oldPrice && <span className="old">₹ {product.oldPrice}</span>}
      </div>

      {/* Variants (example: colors & size) */}
      {product.colors && (
        <div className="colors">
          <strong>Color:</strong>
          <div className="options">
            {product.colors.map((color, idx) => (
              <span key={idx} className="color-option">{color}</span>
            ))}
          </div>
        </div>
      )}

      {product.sizes && (
        <div className="sizes">
          <strong>Size:</strong>
          <div className="options">
            {product.sizes.map((size, idx) => (
              <span key={idx} className="size-option">{size}</span>
            ))}
          </div>
        </div>
      )}

      {/* Cart & actions */}
      <div className="actions">
        <button className="primary-button">+ Cart</button>
        <button className="secondary-button">♡ Wishlist</button>
        <button className="secondary-button">↗ Share</button>
      </div>
    </div>
  );
}

// src/components/Storefront/ProductCard.tsx
interface Product {
  id: number;
  title: string;
  price: string;
  oldPrice: string;
  image: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="item">
      <div className="media">
        <div className="thumbnail object-cover">
          <img src={product.image} alt={product.title} />
        </div>
      </div>
      <div className="content">
        <h3>{product.title}</h3>
        <div className="price">
          <span className="current">{product.price}</span>
          <span className="normal">{product.oldPrice}</span>
        </div>
      </div>
    </div>
  );
}

import { products } from "../../../data/products";

import { Link } from "react-router-dom";

interface Props {
  category: string;
}
export default function RelatedProducts({ category }: Props) {
  const related = products.filter((p) => p.category === category).slice(0, 4);

  return (
    <section className="related-products">
      <h2>Related Products</h2>
      <div className="flexwrap">
        {related.map((p) => (
          <div className="item" key={p.id}>
            <Link to={`/product/${p.id}`}>
              <img src={p.images[0]} alt={p.name} />
              <h3>{p.name}</h3>
              <p>₹ {p.price}</p>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

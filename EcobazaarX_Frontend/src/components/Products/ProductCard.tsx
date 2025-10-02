import React from "react";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Leaf, Wind } from "lucide-react";
import { Product } from "@/types/Product";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  // --- KEY CHANGE IS HERE ---
  // The logic is now simpler and more robust because `imagePath` is just the filename.
  const imageUrl = product.imagePath
    ? `http://localhost:8081/uploads/${product.imagePath}`
    : `https://placehold.co/400x600/e0e0e0/ffffff?text=${product.name
        .split(" ")
        .join("+")}`;

  return (
    <div className="group relative flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md transition-shadow duration-300 hover:shadow-xl">
      {/* The rest of your component code remains the same... */}
      <div className="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl">
        <img
          className="h-full w-full object-cover"
          src={imageUrl}
          alt={product.name}
          onError={(e) => {
            (
              e.target as HTMLImageElement
            ).src = `https://placehold.co/400x600/FBBF24/333333?text=Image+Error`;
          }}
        />
        {product.isZeroWasteProduct && (
          <div className="absolute top-2 left-2 bg-cyan-100 text-cyan-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center">
            <Leaf size={14} className="mr-1" />
            Zero Waste
          </div>
        )}
      </div>
      <div className="mt-4 px-5 pb-5">
        <a href="#">
          <h5
            className="text-lg tracking-tight text-slate-900 truncate"
            title={product.name}
          >
            {product.name}
          </h5>
        </a>
        <p className="text-sm text-gray-500 mt-1">
          Sold by: {product.seller.businessName}
        </p>
        <div className="mt-2 flex items-center text-xs text-gray-500">
          <Wind size={14} className="mr-1 text-green-600" />
          <span>Eco Impact: {product.carbonEmission} kg CO₂</span>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-3xl font-bold text-slate-900">
              ₹{product.price.toFixed(2)}
            </span>
          </p>
        </div>
        <button
          onClick={() => addToCart(product)}
          className="flex w-full items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-colors"
        >
          <ShoppingCart className="mr-2 h-6 w-6" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

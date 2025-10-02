import React from "react";
import { useCart } from "@/context/CartContext";

const OrderSummary: React.FC = () => {
  const { cartItems, cartTotal } = useCart();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
      <ul className="divide-y divide-gray-200">
        {cartItems.map((item) => (
          <li key={item.productId} className="flex items-center py-4">
            <img
              src={`http://localhost:8081/uploads/${item.imagePath
                ?.split(/[\\/]/)
                .pop()}`}
              alt={item.name}
              className="h-16 w-16 object-cover rounded-md mr-4"
            />
            <div className="flex-grow">
              <p className="font-medium text-gray-800">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium text-gray-900">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 border-t pt-6">
        <div className="flex justify-between text-gray-600">
          <p>Subtotal</p>
          <p>${cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between text-gray-600 mt-2">
          <p>Shipping</p>
          <p>Free</p>
        </div>
        <div className="flex justify-between text-lg font-bold text-gray-900 mt-4">
          <p>Total</p>
          <p>${cartTotal.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;

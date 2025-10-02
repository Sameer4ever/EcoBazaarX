import React from "react";
import { useCart } from "@/context/CartContext";
import Header from "../../components/HomePage/Header";
import Footer from "../../components/HomePage/Footer";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus } from "lucide-react";

const CartPage: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    cartTotal,
    cartCount,
    clearCart,
  } = useCart();

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-gray-900 tracking-tight">
            Shopping Cart
          </h1>
          <p className="mt-4 text-base text-gray-600 max-w-2xl mx-auto">
            Review your items and proceed to checkout.
          </p>
        </header>

        {cartCount > 0 ? (
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Cart Items List */}
            <div className="lg:w-2/3">
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {cartItems.map((item) => {
                    const imageUrl = item.imagePath
                      ? `http://localhost:8081/uploads/${item.imagePath
                          .split(/[\\/]/)
                          .pop()}`
                      : `https://placehold.co/400x400/e0e0e0/ffffff?text=${item.name
                          .split(" ")
                          .join("+")}`;

                    return (
                      <li key={item.productId} className="flex py-6">
                        <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img
                            src={imageUrl}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                            onError={(e) => {
                              (
                                e.target as HTMLImageElement
                              ).src = `https://placehold.co/400x400/FBBF24/333333?text=Image+Error`;
                            }}
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col">
                          <div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <h3>{item.name}</h3>
                              <p className="ml-4">
                                ₹{(item.price * item.quantity).toFixed(2)}
                              </p>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                              {item.seller.businessName}
                            </p>
                          </div>
                          <div className="flex flex-1 items-end justify-between text-sm">
                            <div className="flex items-center border border-gray-200 rounded">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity - 1
                                  )
                                }
                                className="px-2 py-1 text-gray-500 hover:text-gray-700 disabled:opacity-50"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <p className="px-3">{item.quantity}</p>
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId,
                                    item.quantity + 1
                                  )
                                }
                                className="px-2 py-1 text-gray-500 hover:text-gray-700"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            <div className="flex">
                              <button
                                onClick={() => removeFromCart(item.productId)}
                                type="button"
                                className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center gap-1"
                              >
                                <Trash2 size={16} /> Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <button
                  onClick={clearCart}
                  className="text-sm font-medium text-red-600 hover:text-red-500 mt-6"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="border border-gray-200 rounded-lg p-6 bg-gray-50">
                <h2 className="text-lg font-medium text-gray-900">
                  Order summary
                </h2>
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600">Subtotal</p>
                    <p className="text-sm font-medium text-gray-900">
                      ₹{cartTotal.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                    <p className="text-base font-medium text-gray-900">
                      Order total
                    </p>
                    <p className="text-base font-medium text-gray-900">
                      ₹{cartTotal.toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="mt-6">
                  <Link
                    to="/checkout"
                    className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                  >
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-700">
              Your cart is empty
            </h2>
            <p className="mt-2 text-gray-500">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link
              to="/AllProductsPage"
              className="mt-6 inline-block rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Start Shopping
            </Link>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;

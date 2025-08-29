// src/pages/SingleProduct.tsx
import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";

import Header from "../components/SingleProduct/Header";
import ProductGallery from "../components/SingleProduct/ProductGallery";
import ProductDetails from "../components/SingleProduct/ProductDetails";
import RelatedProducts from "../components/SingleProduct/RelatedProducts";
import Footer from "../components/SingleProduct/Footer";

export default function SingleProduct() {
  const { id } = useParams();
  const product = products.find((p) => p.id === Number(id));

  if (!product) {
    return <h2 className="container">Product not found</h2>;
  }

  return (
    <div id="page" className="site page-single">
      <Header />
      <main>
        <section className="single-product">
          <div className="container">
            <div className="wrapper">
              <div className="column">
                <div className="products one flexwrap">
                  <ProductGallery
                    images={product.images}
                    discount={product.discount}
                  />
                  <ProductDetails product={product} />
                </div>
              </div>
            </div>
          </div>
        </section>
        <RelatedProducts
          category={product.category}
          currentProductId={product.id}
        />
      </main>
      <Footer />
    </div>
  );
}

import { useParams } from "react-router-dom";
import { products } from "../data/products";
import Header from "../components/Home/Header"; // ✅ use common Header
import Footer from "../components/Home/Footer";
import ProductGallery from "../components/Home/ProductsPage/ProductGallery";
import ProductInfo from "../components/Home/ProductsPage/ProductInfo";
import ProductTabs from "../components/Home/ProductsPage/ProductTabs";
import Trending from "../components/Home/Trending";
import { useState } from "react";

export default function SingleProduct() {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === Number(id));

  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showDpt, setShowDpt] = useState(false);

  if (!product) {
    return (
      <>
        <Header
          onToggleMenu={() => setShowMenu((s) => !s)}
          onToggleSearch={() => setShowSearch((s) => !s)}
          onToggleDpt={() => setShowDpt((s) => !s)}
        />
        <main className="container">
          <h2>Product not found</h2>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      {/* ✅ Common Header with dropdown departments */}
      <Header
        onToggleMenu={() => setShowMenu((s) => !s)}
        onToggleSearch={() => setShowSearch((s) => !s)}
        onToggleDpt={() => setShowDpt((s) => !s)}
      />

      <main className="single-product">
        <div className="container">
          <div className="wrapper flexwrap">
            {/* LEFT: Gallery (slider) */}
            <div className="col-6">
              <ProductGallery
                images={product.images}
                discount={product.discount}
              />
            </div>

            {/* RIGHT: Info */}
            <div className="col-6">
              <ProductInfo product={product} />
            </div>
          </div>

          {/* Tabs below */}
          <ProductTabs description={product.description} />

          {/* Show trending instead of related */}
          <Trending />
        </div>
      </main>

      <Footer />
    </>
  );
}

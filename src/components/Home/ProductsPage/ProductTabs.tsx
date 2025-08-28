// src/components/ProductsPage/ProductTabs.tsx
import { useState } from "react";

interface ProductTabsProps {
  description: string;
  details?: string;
  sizeInfo?: string;
  reviews?: string[];
}

export default function ProductTabs({
  description,
  details = "No extra details provided.",
  sizeInfo = "Sizes available vary by product.",
  reviews = [],
}: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState("info");

  return (
    <div className="product-tabs">
      <ul className="tab-list flexwrap">
        <li
          className={activeTab === "info" ? "active" : ""}
          onClick={() => setActiveTab("info")}
        >
          Product Information
        </li>
        <li
          className={activeTab === "details" ? "active" : ""}
          onClick={() => setActiveTab("details")}
        >
          Details
        </li>
        <li
          className={activeTab === "size" ? "active" : ""}
          onClick={() => setActiveTab("size")}
        >
          Size
        </li>
        <li
          className={activeTab === "reviews" ? "active" : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </li>
      </ul>

      <div className="tab-content">
        {activeTab === "info" && <p>{description}</p>}
        {activeTab === "details" && <p>{details}</p>}
        {activeTab === "size" && <p>{sizeInfo}</p>}
        {activeTab === "reviews" && (
          <div>
            {reviews.length > 0 ? (
              reviews.map((r, idx) => <p key={idx}>⭐ {r}</p>)
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

import React from "react";
import ProductHero from "../../components/sections/Products/ProductHero";
import ProductSection from "../../components/sections/Products/ProductSection";

const ProductPage = () => {
  return (
    <div>
      {/* Product Hero */}
      <ProductHero />

      {/* Product Content */}
      <ProductSection id="products" />
    </div>
  );
};

export default ProductPage;
import React, { useMemo, useCallback } from "react";
import { products } from "../data/product";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const filteredProducts = useMemo(
    () => products.filter((p) => p.price < 50),
    []
  );

  const renderProduct = useCallback(
    (product) => <ProductItem key={product.id} product={product} />,
    []
  );

  return (
    <div>
      {filteredProducts.map(renderProduct)}
    </div>
  );
};

export default React.memo(ProductList);

import React from "react";

const ProductItem = ({ product }) => {
  console.log(`Rendering: ${product.name}`);
  return (
    <div style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <h3>{product.name}</h3>
      <p>${product.price}</p>
    </div>
  );
};

export default React.memo(ProductItem);

import React from "react";

const Header = () => {
  console.log("Header rendered");
  return <h1>🛍️ My Product Store</h1>;
};

export default React.memo(Header);

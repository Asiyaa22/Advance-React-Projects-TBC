import React, { Suspense, lazy } from "react";
import "./App.css";

const Header = lazy(() => import("./components/Header"));
const ProductList = lazy(() => import("./components/ProductList"));
const Footer = lazy(() => import("./components/Footer"));



function App() {
  return (
    <div style={{ width: "80%", margin: "0 auto", textAlign: "center" }}>
      <Suspense fallback={<p>Loading Header...</p>}>
        <Header />
      </Suspense>

      <Suspense fallback={<p>Loading Products...</p>}>
        <ProductList />
      </Suspense>

      <Suspense fallback={<p>Loading Footer...</p>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default App;

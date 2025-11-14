"use client";

import { useEffect, useState } from "react";
import ProductListClient from "@/components/ProductListClient";

export default function CSRPage() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    (async () => {
      const base_url = process.env.URL
      try {
        const res = await fetch(`${base_url}/api/products`);
        const data = await res.json();
        if (active) setProducts(data);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => (active = false);
  }, []);

  return (
    <section>
      <h1>CSR Products</h1>
      <p className="muted">
        This page loads instantly with shell HTML, then fetches data in the{" "}
        <strong>browser</strong>.
      </p>

      <div className="info">
        <span>Client Time:</span>{" "}
        <code>{new Date().toLocaleString()}</code>
      </div>

      {loading ? (
        <div className="loader">Loading products…</div>
      ) : (
        <ProductListClient products={products} />
      )}
    </section>
  );
}

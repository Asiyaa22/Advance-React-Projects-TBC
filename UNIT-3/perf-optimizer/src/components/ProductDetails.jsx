import React, { Suspense } from 'react';
const HeavyChart = React.lazy(() => import('./HeavyChart'));

export default function ProductDetails({ product, onClose }) {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ×
        </button>

        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <p>
          <strong>Price:</strong> ₹{product.price}
        </p>
        <p>
          <strong>Rating:</strong> {product.rating} ★
        </p>

        <hr />

        <h4>Price trends (simulated heavy chart)</h4>
        <Suspense fallback={<div className="spinner">Loading chart...</div>}>
          <HeavyChart product={product} />
        </Suspense>
      </div>
    </div>
  );
}

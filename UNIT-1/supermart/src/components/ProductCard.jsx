// src/components/ProductCard.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import placeholder from '../assets/react.svg';
import headphones from '../assets/headphones.jpg';

// small helper to detect http(s) / data-URL
const isValidUrl = (value) => {
  if (!value || typeof value !== 'string') return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:' || value.startsWith('data:');
  } catch {
    return false;
  }
};

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const imageSrc = isValidUrl(product?.image) ? product.image : placeholder;

  const onAdd = () => dispatch({ type: 'ADD_TO_CART', payload: product });

  return (
    <article className="product-card" aria-labelledby={`p-${product.id}`}>
      <div className="product-media">
        <img
          src={headphones}
          alt={product.title || 'Product image'}
          style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', display: 'block' }}
        />
      </div>

      <div>
        <h3 id={`p-${product.id}`} className="product-title">{product.title}</h3>
        <p className="product-desc">{product.description || ''}</p>
      </div>

      <div className="product-row">
        <div className="price">₹{Number(product.price || 0).toFixed(2)}</div>
        <button className="btn" onClick={onAdd}>Add to cart</button>
      </div>
    </article>
  );
}

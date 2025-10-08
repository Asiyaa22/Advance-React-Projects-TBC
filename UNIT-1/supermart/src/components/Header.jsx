// src/components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header(){
  const cartCount = useSelector(s => s.cart.items.reduce((acc,i) => acc + (i.qty || 1), 0));
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="SuperMart Home">
          <div className="brand-badge">SM</div>
          <div>
            <div className="brand-title">SuperMart</div>
            <div className="text-muted">Shop smart • Ship fast</div>
          </div>
        </Link>

        <nav className="header-nav" aria-label="Main navigation">
          <Link to="/" className="text-muted">Products</Link>
          <Link to="/checkout" className="text-muted">Checkout</Link>

          <Link to="/cart" aria-label="View cart" className="cart-icon" style={{marginLeft:8}}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 6h15l-1.5 9h-11z"></path>
              <circle cx="9" cy="20" r="1"></circle>
              <circle cx="19" cy="20" r="1"></circle>
            </svg>
            {cartCount > 0 && <span className="cart-count" aria-hidden>{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}

// src/components/Footer.jsx
import React from 'react';

export default function Footer(){
  return (
    <footer className="footer">
      <div className="container">
        <div>© {new Date().getFullYear()} SuperMart • Built with ❤️</div>
      </div>
    </footer>
  );
}

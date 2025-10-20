import React from 'react';

// ProductItem is memoized to avoid re-rendering when its props haven't changed.
// The second argument does a shallow check of object identity.
const ProductItem = React.memo(
  function ProductItem({ product, onOpen }) {
    // debug: open your console to watch which items re-render
    // Useful to verify memoization + virtualization effectiveness
    // console.log('render item', product.id);

    return (
      <div className="product-card">
        <div className="product-left">
          <div className="thumb">{product.name.split(' ')[1]}</div>
        </div>

        <div className="product-center">
          <h3 className="product-title">{product.name}</h3>
          <p className="product-desc">{product.description}</p>
        </div>

        <div className="product-right">
          <div className="price">₹{product.price}</div>
          <div className="rating">{product.rating} ★</div>
          <button onClick={() => onOpen(product)} className="btn small">
            View
          </button>
        </div>
      </div>
    );
  },
  // compare prev/next props: product kept referentially equal unless updated
  (prev, next) => prev.product === next.product && prev.onOpen === next.onOpen
);

export default ProductItem;

// src/components/ProductList.jsx
import React from 'react';
import { Virtuoso } from 'react-virtuoso';
import ProductItem from './ProductItem';

/**
 * ProductList using react-virtuoso.
 * - Works well with modern React versions (18/19).
 * - No tricky ESM/CJS interop.
 * - Supports variable heights, auto-sizing, and smooth scrolling.
 */

export default function ProductList({ items, onOpen }) {
  // itemContent receives (index, item) and returns node
  return (
    <div className="product-list" style={{ height: 600 }}>
      <Virtuoso
        data={items}
        // use itemContent for rendering each row
        itemContent={(index, product) => {
          // Wrap ProductItem so it receives the same props as before
          return (
            <div className="list-row" style={{ padding: 8 }}>
              <ProductItem product={product} onOpen={onOpen} />
            </div>
          );
        }}
        // Increase overscan for smoother scroll if desired
        overscan={200}
        // Use a stable key selector
        components={{
          // optional: emptyList placeholder when no items
          EmptyPlaceholder: () => <div style={{ padding: 20 }}>No products found</div>,
        }}
        style={{ width: '100%' }}
      />
    </div>
  );
}

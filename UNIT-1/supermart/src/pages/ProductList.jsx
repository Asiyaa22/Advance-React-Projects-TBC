// src/pages/ProductList.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../redux/actions/productActions';

export default function ProductList(){
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(s => s.products);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div className="container">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:18}}>
        <div>
          <h1 style={{margin:0}}>Products</h1>
          <div className="text-muted" style={{marginTop:6}}>Explore our curated selection</div>
        </div>
        <div className="text-muted">Free shipping over ₹1000</div>
      </div>

      {loading && <div className="empty">Loading products…</div>}
      {error && <div className="empty" style={{color:'#ef4444'}}>Error: {error}</div>}

      <div className="products-grid" style={{marginTop:12}}>
        {items.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  );
}

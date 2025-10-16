// src/components/CartSidebar.jsx
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import placeholder from '../assets/react.svg';
import headphones from '../assets/headphones.jpg';


const toNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const formatCurrency = (n) => `₹${n.toFixed(2)}`;

const isValidUrl = (value) => {
  if (!value || typeof value !== 'string') return false;
  try {
    const u = new URL(value);
    return u.protocol === 'http:' || u.protocol === 'https:' || value.startsWith('data:');
  } catch {
    return false;
  }
};

export default function CartSidebar(){
  const items = useSelector(s => s.cart.items || []);
  const dispatch = useDispatch();

  const total = items.reduce((sum, it) => {
    const price = toNumber(it.price, 0);
    const qty = Math.max(0, Math.floor(toNumber(it.qty, 1)));
    return sum + price * qty;
  }, 0);

  const changeQty = (id, newQty) => {
    const qty = Math.max(0, Math.floor(toNumber(newQty, 0)));
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, qty } });
  };

  const removeItem = (id) => dispatch({ type: 'REMOVE_FROM_CART', payload: id });

  return (
    <aside className="sidebar">
      <h2 style={{marginTop:0}}>Your Cart</h2>

      {items.length === 0 ? (
        <div className="empty">Cart is empty. <Link to="/" style={{color:'var(--brand)'}}>Shop now</Link></div>
      ) : (
        <>
          <div>
            {items.map(item => {
              const price = toNumber(item.price, 0);
              const qty = Math.max(0, Math.floor(toNumber(item.qty, 1)));
              const lineTotal = price * qty;
              const src = isValidUrl(item.image) ? item.image : placeholder;

              return (
                <div className="cart-item" key={item.id} style={{alignItems:'center'}}>
                  <div className="cart-thumb" style={{width:64, height:64, overflow:'hidden', borderRadius:8, background:'#fff'}}>
                    <img src={headphones} alt={item.title || 'Product image'} style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}} />
                  </div>

                  <div style={{flex:1, minWidth:0, marginLeft:12}}>
                    <div className="cart-item-title" style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{item.title}</div>
                    <div className="cart-item-meta" style={{marginTop:6, display:'flex', gap:8, alignItems:'center'}}>
                      <div style={{display:'flex', alignItems:'center', gap:6}}>
                        <button
                          aria-label={`Decrease quantity of ${item.title}`}
                          onClick={() => changeQty(item.id, Math.max(0, qty - 1))}
                          style={{padding:'6px 8px', borderRadius:6, border:'1px solid #e6eef8', background:'white', cursor:'pointer'}}
                        >−</button>

                        <input
                          aria-label={`Quantity for ${item.title}`}
                          value={qty}
                          onChange={(e) => {
                            const v = e.target.value.replace(/[^\d]/g, '');
                            changeQty(item.id, v === '' ? 0 : Number(v));
                          }}
                          onBlur={(e) => {
                            if (e.target.value === '' || Number(e.target.value) <= 0) {
                              changeQty(item.id, 0);
                            }
                          }}
                          style={{width:56, textAlign:'center', padding:6, borderRadius:6, border:'1px solid #e6eef8'}}
                        />

                        <button
                          aria-label={`Increase quantity of ${item.title}`}
                          onClick={() => changeQty(item.id, qty + 1)}
                          style={{padding:'6px 8px', borderRadius:6, border:'1px solid #e6eef8', background:'white', cursor:'pointer'}}
                        >+</button>
                      </div>

                      <div style={{color:'var(--muted)', fontSize:13}}>Price: {formatCurrency(price)}</div>
                    </div>
                  </div>

                  <div style={{textAlign:'right', marginLeft:12}}>
                    <div style={{fontWeight:700}}>{formatCurrency(lineTotal)}</div>
                    <button
                      onClick={() => removeItem(item.id)}
                      style={{marginTop:6, background:'transparent', border:'none', color:'#ef4444', cursor:'pointer'}}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="summary" style={{marginTop:12}}>
            <div className="summary-row"><span>Subtotal</span><span>{formatCurrency(total)}</span></div>
            <div className="summary-row"><span>Delivery</span><span>₹0</span></div>
            <div className="summary-row" style={{fontWeight:700}}><span>Total</span><span>{formatCurrency(total)}</span></div>
            <Link to="/checkout" className="text-white">
            <button
              className="checkout-btn"
              style={{marginTop:12}}
            >
            Checkout
            </button></Link>
          </div>
        </>
      )}
    </aside>
  );
}

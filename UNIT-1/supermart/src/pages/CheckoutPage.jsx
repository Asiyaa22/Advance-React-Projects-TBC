// src/pages/CheckoutPage.jsx
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function CheckoutPage(){
  const { items, processing, receipt } = useSelector(s => s.cart);
  const dispatch = useDispatch();
  const [coupon, setCoupon] = useState('');
  const total = items.reduce((s,i) => s + (i.price * (i.qty||1)), 0);

  const onPlace = () => dispatch({ type: 'CHECKOUT_REQUEST', payload: { cart: items, coupon }});

  return (
    <div className="container" style={{paddingTop:18}}>
      <div style={{display:'grid',gridTemplateColumns:'1fr',gap:16}}>
        <div className="product-card bill">
          <h2 style={{margin:0}}>Billing & Order</h2>
          {items.length === 0 ? <div className="empty">Your cart is empty</div> : (
            <>
              <div style={{marginTop:12}}>
                {items.map(i => (
                  <div key={i.id} style={{display:'flex',justifyContent:'space-between',padding:'8px 0',borderBottom:'1px solid #f3f6fa'}}>
                    <div>{i.title} <div className="text-muted" style={{fontSize:12}}>Qty: {i.qty||1}</div></div>
                    <div style={{fontWeight:700}}>₹{(i.price * (i.qty||1)).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              <div style={{marginTop:12,display:'flex',gap:8}}>
                <input type="text" placeholder="Coupon code" value={coupon} onChange={e=>setCoupon(e.target.value)} style={{flex:1,padding:10,borderRadius:8,border:'1px solid #e6eef8'}} />
                <button className="btn" onClick={()=>dispatch({ type: 'APPLY_COUPON', payload: coupon })}>Apply</button>
              </div>
            </>
          )}
        </div>

        <div className="sidebar">
          <h3 style={{marginTop:0}}>Order Summary</h3>
          <div className="summary-row"><span>Subtotal</span><span>₹{total.toFixed(2)}</span></div>
          <div className="summary-row"><span>Total</span><span style={{fontWeight:700}}>₹{total.toFixed(2)}</span></div>
          <button className="checkout-btn" onClick={onPlace} disabled={processing || items.length === 0}>{processing ? 'Processing...' : 'Place Order'}</button>
          {receipt && <pre style={{marginTop:12,background:'#fbfbfb',padding:8,borderRadius:8}}>{JSON.stringify(receipt,null,2)}</pre>}
        </div>
      </div>
    </div>
  );
}

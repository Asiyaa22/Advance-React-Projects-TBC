import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/actions/cartActions';
import { Link } from 'react-router-dom';

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector(state => state.cart);
  const total = items.reduce((sum, i) => sum + (i.product.price * i.qty), 0);

  return (
    <div>
      <h2>Your Cart</h2>
      {items.length === 0 ? <div>Your cart is empty. <Link to="/">Shop now</Link></div> : (
        <>
          {items.map(i => (
            <div key={i.product.id} style={{ display: 'flex', gap: 12, marginBottom: 12 }}>
              <img src={i.product.image} alt="" style={{ width: 60 }} />
              <div style={{ flex: 1 }}>
                <div>{i.product.title}</div>
                <div>₹{i.product.price} x {i.qty}</div>
              </div>
              <div>
                <button onClick={() => dispatch(updateQuantity(i.product.id, Math.max(1, i.qty - 1)))}>-</button>
                <button onClick={() => dispatch(updateQuantity(i.product.id, i.qty + 1))}>+</button>
                <button onClick={() => dispatch(removeFromCart(i.product.id))}>Remove</button>
              </div>
            </div>
          ))}
          <div>Total: ₹{total.toFixed(2)}</div>
          <div style={{ marginTop: 12 }}>
            <Link to="/checkout"><button>Checkout</button></Link>
          </div>
        </>
      )}
    </div>
  );
}

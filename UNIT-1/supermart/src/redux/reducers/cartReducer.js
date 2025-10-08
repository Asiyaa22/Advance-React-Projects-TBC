// src/redux/reducers/cartReducer.js

const initialState = {
  items: [],
  processing: false,
  receipt: null,
  coupon: null
};

// Helper to coerce numbers safely
const toNumber = (v, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    // 🛒 Add a product to cart
    case 'ADD_TO_CART': {
      const product = action.payload;
      const price = toNumber(product.price, 0);
      const existing = state.items.find(i => i.id === product.id);

      // If item already exists, increment qty
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === product.id ? { ...i, qty: (toNumber(i.qty, 1) + 1) } : i
          )
        };
      }

      // Otherwise add new product with qty = 1
      return {
        ...state,
        items: [
          ...state.items,
          { ...product, price, qty: 1 }
        ]
      };
    }

    // 🗑 Remove an item completely
    case 'REMOVE_FROM_CART': {
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload)
      };
    }

    // 🔢 Update quantity for a specific item
    case 'UPDATE_QUANTITY': {
      const { id, qty } = action.payload;
      const cleanQty = Math.max(0, Math.floor(toNumber(qty, 0)));

      // If you want to remove when qty <= 0
      if (cleanQty <= 0) {
        return {
          ...state,
          items: state.items.filter(i => i.id !== id)
        };
      }

      return {
        ...state,
        items: state.items.map(i =>
          i.id === id ? { ...i, qty: cleanQty } : i
        )
      };
    }

    // 💸 Apply coupon (you can extend logic later)
    case 'APPLY_COUPON': {
      return { ...state, coupon: action.payload };
    }

    // 💳 Start checkout process
    case 'CHECKOUT_REQUEST': {
      return { ...state, processing: true, receipt: null };
    }

    // 🧾 Checkout success (simulate receipt)
    case 'CHECKOUT_SUCCESS': {
      return {
        ...state,
        processing: false,
        items: [],
        receipt: action.payload || { message: 'Order placed successfully!' }
      };
    }

    // ❌ Checkout failure
    case 'CHECKOUT_FAILURE': {
      return { ...state, processing: false };
    }

    // 🧼 Default
    default:
      return state;
  }
}

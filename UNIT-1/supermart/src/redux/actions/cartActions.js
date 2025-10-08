export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const UPDATE_QUANTITY = 'UPDATE_QUANTITY';
export const CLEAR_CART = 'CLEAR_CART';
export const APPLY_COUPON = 'APPLY_COUPON';

export const CHECKOUT_REQUEST = 'CHECKOUT_REQUEST';
export const CHECKOUT_SUCCESS = 'CHECKOUT_SUCCESS';
export const CHECKOUT_FAILURE = 'CHECKOUT_FAILURE';

// action creators
export const addToCart = (product) => ({ type: ADD_TO_CART, payload: product });
export const removeFromCart = (id) => ({ type: REMOVE_FROM_CART, payload: id });
export const updateQuantity = (id, qty) => ({ type: UPDATE_QUANTITY, payload: { id, qty } });
export const clearCart = () => ({ type: CLEAR_CART });
export const applyCoupon = (code) => ({ type: APPLY_COUPON, payload: code });

export const checkoutRequest = (cart, coupon = null) => ({ type: CHECKOUT_REQUEST, payload: { cart, coupon } });
export const checkoutSuccess = (receipt) => ({ type: CHECKOUT_SUCCESS, payload: receipt });
export const checkoutFailure = (error) => ({ type: CHECKOUT_FAILURE, payload: error });

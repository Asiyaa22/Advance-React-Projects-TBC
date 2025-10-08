import { takeLatest, put, call, delay } from 'redux-saga/effects';
import api from '../../api';
import { CHECKOUT_REQUEST, checkoutSuccess, checkoutFailure } from '../actions/cartActions';

// helper that posts to /checkout
function postCheckout(payload) {
  return api.post('/checkout', payload);
}

// export for potential unit testing
export function* handleCheckout(action) {
  const { cart, coupon } = action.payload;
  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      // small artificial delay for UX demo
      yield delay(500);
      const response = yield call(postCheckout, { cart, coupon });
      yield put(checkoutSuccess(response.data));
      return;
    } catch (err) {
      attempt++;
      if (attempt > maxRetries) {
        yield put(checkoutFailure(err.message || 'Checkout failed after retries'));
        return;
      }
      // backoff before retrying
      yield delay(1000 * attempt);
    }
  }
}

export default function* watchCheckout() {
  yield takeLatest(CHECKOUT_REQUEST, handleCheckout);
}

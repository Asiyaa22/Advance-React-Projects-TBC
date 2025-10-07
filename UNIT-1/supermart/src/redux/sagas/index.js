import { all } from 'redux-saga/effects';
import watchCheckout from './checkoutSaga';

export default function* rootSaga() {
  yield all([
    watchCheckout()
  ]);
}

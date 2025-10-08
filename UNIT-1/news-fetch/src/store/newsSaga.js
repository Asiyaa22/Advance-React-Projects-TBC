import { call, put, takeLatest } from "redux-saga/effects";
import { fetchNewsSuccess, fetchNewsFailure } from "../actions/newsAction";


// Get today's date
const today = new Date();
const formattedToday = today.toISOString().split('T')[0];

// Get yesterday's date (or past 7 days)
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);
const formattedYesterday = yesterday.toISOString().split('T')[0];

// Use in API request
const url = `https://newsapi.org/v2/everything?q=tesla&from=${formattedYesterday}&to=${formattedToday}&sortBy=publishedAt&apiKey=41ae7393fe324e99b7929ecc83c23365`;





function fetchNewsApi() {
  return fetch(
    url
    // `https://newsapi.org/v2/everything?q=tesla&from=${date}&sortBy=publishedAt&apiKey=41ae7393fe324e99b7929ecc83c23365`
  ).then((res) => res.json());
}

function* fetchNewsWorker() {
  try {
    const data = yield call(fetchNewsApi);
    if (data.status === "ok") {
      yield put(fetchNewsSuccess(data.articles));
    } else {
      yield put(fetchNewsFailure(data.message));
    }
  } catch (err) {
    yield put(fetchNewsFailure(err.message));
  }
}

export default function* newsSaga() {
  yield takeLatest("FETCH_NEWS_REQUEST", fetchNewsWorker);
}

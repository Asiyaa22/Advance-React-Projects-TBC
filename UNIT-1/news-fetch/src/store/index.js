import { createStore, applyMiddleware, combineReducers } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "@redux-devtools/extension";
import newsReducer from "./newsReducer";
import newsSaga from "./newsSaga";

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  news: newsReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(newsSaga);

export default store;

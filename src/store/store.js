import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

const middlewares = [logger];

const composedEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
  rootReducer,
  composedEnhancers(applyMiddleware(...middlewares))
);

export default store;

import { compose, createStore, applyMiddleware, combineReducers } from "redux";
import logger from "redux-logger";
import { rootReducer } from "./root-reducer";

// const loggerMiddleware = (store) => (next) => (action) => {
//   if (!action.type) return next(action);

//   console.log("type: ", action.type);
//   console.log("payload: ", action.payload);
//   console.log("currentState: ", store.getState());

//   next(action);

//   console.log("next state: ", store.getState());
// };

const middlewares = [logger /*loggerMiddleware*/];

const composedEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

const store = createStore(
  rootReducer,
  composedEnhancers(applyMiddleware(...middlewares))
);

export default store;

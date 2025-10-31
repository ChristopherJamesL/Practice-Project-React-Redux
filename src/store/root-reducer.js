import { combineReducers } from "redux";
import { userReducer } from "./user/user.reducer";

export const rootReducer = combineReducers({
  // cartReducer,
  user: userReducer,
});

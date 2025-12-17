import { AnyAction } from "redux";
import { UserState } from "./user.types";
import {
  clearUserError,
  emailSignUpFailed,
  signInFailed,
  signInSuccess,
  signOutFailed,
  signOutSuccess,
} from "./user.action";

const INITIAL_STATE: UserState = {
  currentUser: null,
  isLoading: false,
  error: null,
};

export const userReducer = (
  state = INITIAL_STATE,
  action: AnyAction
): UserState => {
  if (signInSuccess.match(action))
    return { ...state, currentUser: action.payload };

  if (signOutSuccess.match(action))
    return { ...state, currentUser: null, error: null };

  if (emailSignUpFailed.match(action))
    return { ...state, error: action.payload };

  if (signInFailed.match(action)) return { ...state, error: action.payload };

  if (signOutFailed.match(action)) return { ...state, error: action.payload };

  if (clearUserError.match(action)) return { ...state, error: null };

  return state;
};

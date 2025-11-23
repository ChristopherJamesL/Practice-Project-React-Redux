import {
  createAction,
  Action,
  ActionWithPayload,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import {
  USER_ACTION_TYPES,
  EmailSignUpStartPayload,
  EmailSignInStartPayload,
  User,
  SignInFailedError,
  SignOutFailedError,
} from "./user.types";

// ====================
// Action Types
// ====================

export type CheckUserSession = Action<
  typeof USER_ACTION_TYPES.CHECK_USER_SESSION
>;

export type EmailSignUpStart = ActionWithPayload<
  typeof USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
  EmailSignUpStartPayload
>;

export type GoogleSignInStart = Action<
  typeof USER_ACTION_TYPES.GOOGLE_SIGN_IN_START
>;

export type EmailSignInStart = ActionWithPayload<
  typeof USER_ACTION_TYPES.EMAIL_SIGN_IN_START,
  EmailSignInStartPayload
>;

export type SignInSuccess = ActionWithPayload<
  typeof USER_ACTION_TYPES.SIGN_IN_SUCCESS,
  User
>;

export type SignInFailed = ActionWithPayload<
  typeof USER_ACTION_TYPES.SIGN_IN_FAILED,
  SignInFailedError
>;

export type SignOutStart = Action<typeof USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutSuccess = Action<typeof USER_ACTION_TYPES.SIGN_OUT_SUCCESS>;

export type SignOutFailed = ActionWithPayload<
  typeof USER_ACTION_TYPES.SIGN_OUT_FAILED,
  SignOutFailedError
>;

// ====================
// Action Functions
// ====================

export const checkUserSession = withMatcher(
  (): CheckUserSession => createAction(USER_ACTION_TYPES.CHECK_USER_SESSION)
);

export const emailSignUpStart = withMatcher(
  (payload: EmailSignUpStartPayload): EmailSignUpStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_UP_START, payload)
);

export const googleSignInStart = withMatcher(
  (): GoogleSignInStart => createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START)
);

export const emailSignInStart = withMatcher(
  (payload: EmailSignInStartPayload): EmailSignInStart =>
    createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, payload)
);

export const signInSuccess = withMatcher(
  (user: User): SignInSuccess =>
    createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user)
);

export const signInFailed = withMatcher(
  (error: SignInFailedError): SignInFailed =>
    createAction(USER_ACTION_TYPES.SIGN_IN_FAILED, error)
);

export const signOutStart = withMatcher(
  (): SignOutStart => createAction(USER_ACTION_TYPES.SIGN_OUT_START)
);

export const signOutSuccess = withMatcher(
  (): SignOutSuccess => createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS)
);

export const signOutFailed = withMatcher(
  (error: SignOutFailedError): SignOutFailed =>
    createAction(USER_ACTION_TYPES.SIGN_OUT_FAILED, error)
);

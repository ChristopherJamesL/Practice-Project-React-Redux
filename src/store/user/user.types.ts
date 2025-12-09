// ===========================
// ACTION TYPES
// ===========================

export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  EMAIL_SIGN_UP_START: "EMAIL_SIGN_UP_START",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  EMAIL_SIGN_UP_FAILED: "EMAIL_SIGN_UP_FAILED",
  SIGN_IN_FAILED: "SIGN_IN_FAILED",
  SIGN_OUT_START: "SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED: "SIGN_OUT_FAILED",
} as const;

// ===========================
// STATE TYPES
// ===========================

export type UserState = {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: SignInFailedError | SignOutFailedError | null;
};

// ===========================
// PAYLOAD TYPES
// ===========================

export type EmailSignUpStartPayload = {
  email: string;
  password: string;
  displayName: string;
};

export type EmailSignInStartPayload = {
  email: string;
  password: string;
};

// ===========================
// USER TYPE
// ===========================

export type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

// ===========================
// ERROR TYPES
// ===========================

export type SignInFailedError = Error | null;

export type SignOutFailedError = Error | null;

// ===========================
// ACTION INTERFACES
// ===========================

export interface EmailSignUpStartAction {
  type: typeof USER_ACTION_TYPES.EMAIL_SIGN_UP_START;
  payload: EmailSignUpStartPayload;
}

export interface SignInWithEmailAction {
  type: typeof USER_ACTION_TYPES.EMAIL_SIGN_IN_START;
  payload: EmailSignInStartPayload;
}

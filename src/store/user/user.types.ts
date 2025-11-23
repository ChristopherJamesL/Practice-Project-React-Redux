export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  EMAIL_SIGN_UP_START: "EMAIL_SIGN_UP_START",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_IN_FAILED: "SIGN_IN_FAILED",
  SIGN_OUT_START: "SIGN_OUT_START",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_OUT_FAILED: "SIGN_OUT_FAILED",
} as const;

export type UserState = {
  readonly currentUser: User | null;
  readonly isLoading: boolean;
  readonly error: SignInFailedError | SignOutFailedError | null;
};

export type EmailSignUpStartPayload = {
  email: string;
  password: string;
  displayName: string;
};

export type EmailSignInStartPayload = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  displayName: string;
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
};

export type SignInFailedError = Error | null;

export type SignOutFailedError = Error | null;

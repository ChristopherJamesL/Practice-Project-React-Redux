import { call, all, takeLatest, put } from "redux-saga/effects";
import { USER_ACTION_TYPES } from "./user.types";
import {
  signInSuccess,
  signInFailed,
  signOutSuccess,
  signOutFailed,
  emailSignUpFailed,
} from "./user.action";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
  getCurrentUser,
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
  signOutUser,
} from "../../utils/firebase/firebase.utils";

// ===========================
// SAGA TYPE IMPORTS
// ===========================

import { User, UserCredential } from "firebase/auth";
import { QueryDocumentSnapshot } from "firebase/firestore";
import {
  User as UserData,
  EmailSignUpStartAction,
  SignInWithEmailAction,
} from "./user.types";

// ===========================
// WORKER SAGAS
// ===========================

export function* getSnapshotFromUserAuth(userAuth: User) {
  try {
    const userSnapshot: QueryDocumentSnapshot<UserData> | void = yield call(
      createUserDocumentFromAuth,
      userAuth
    );
    if (userSnapshot) {
      const userDataWithoutId = userSnapshot.data();
      const userId = userSnapshot.id;
      yield put(signInSuccess({ ...userDataWithoutId, id: userId }));
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth: User | null = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signUpUserWithEmailAndPassword({
  payload: { email, password, displayName },
}: EmailSignUpStartAction) {
  try {
    const userCredential: UserCredential | undefined = yield call(
      createAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      const userToCreate = { ...user, displayName };
      const userSnapshot: QueryDocumentSnapshot<UserData> = yield call(
        createUserDocumentFromAuth,
        userToCreate
      );
      yield put(signInSuccess({ ...userSnapshot.data(), id: userSnapshot.id }));
    }
  } catch (error) {
    yield put(emailSignUpFailed(error as Error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user }: UserCredential = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signInWithEmail({
  payload: { email, password },
}: SignInWithEmailAction) {
  try {
    const userCredential: UserCredential | undefined = yield call(
      signInAuthUserWithEmailAndPassword,
      email,
      password
    );
    if (userCredential) {
      const { user } = userCredential;
      yield call(getSnapshotFromUserAuth, user);
    }
  } catch (error) {
    yield put(signInFailed(error as Error));
  }
}

export function* signUserOut() {
  try {
    yield call(signOutUser);
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailed(error as Error));
  }
}

// ===========================
// WATCHER SAGAS
// ===========================

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onEmailSignUpStart() {
  yield takeLatest(
    USER_ACTION_TYPES.EMAIL_SIGN_UP_START,
    signUpUserWithEmailAndPassword
  );
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onSignOutStart() {
  yield takeLatest(USER_ACTION_TYPES.SIGN_OUT_START, signUserOut);
}

// ===========================
// ROOT USER SAGA
// ===========================

export function* userSaga() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onEmailSignUpStart),
    call(onSignOutStart),
  ]);
}

import { createSelector } from "reselect";
import { UserState } from "./user.types";

// export const selectCurrentUser = (state): User => state.user.currentUser;

export const selectUserReducer = (state): UserState => state.user;

export const selectCurrentUser = createSelector(
  selectUserReducer,
  (user) => user.currentUser
);

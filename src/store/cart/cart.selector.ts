import { createSelector } from "reselect";
import { CartState } from "./cart.types";

// ====================
// Cart Slice Selector
// ====================

const selectCartReducer = (state): CartState => state.cart;

// ====================
// Base Selectors
// ====================

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cartSlice) => cartSlice.isCartOpen
);

// ====================
// Derived Selectors
// ====================

export const selectCartCount = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.quantity * cartItem.price,
    0
  )
);

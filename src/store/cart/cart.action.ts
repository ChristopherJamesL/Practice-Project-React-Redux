import {
  ActionWithPayload,
  createAction,
  withMatcher,
} from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES, CartItem, Product } from "./cart.types";

// ====================
// Action Types
// ====================

export type SetCartItems = ActionWithPayload<
  typeof CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export type SetIsCartOpen = ActionWithPayload<
  typeof CART_ACTION_TYPES.SET_IS_CART_OPEN,
  boolean
>;

// ====================
// Cart Helper Functions
// ====================

const addCartItem = (cartItems: CartItem[], productToAdd: Product) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem)
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems: CartItem[], productToRemove: Product) => {
  return cartItems.reduce<CartItem[]>((acc, cartItem) => {
    if (cartItem.id === productToRemove.id) {
      if (cartItem.quantity === 1) return acc;

      return [...acc, { ...cartItem, quantity: cartItem.quantity - 1 }];
    }
    return [...acc, cartItem];
  }, []);
};

const clearCartItem = (cartItems: CartItem[], productToClear: Product) => {
  return cartItems.filter((cartItem) => cartItem.id !== productToClear.id);
};

// ====================
// Cart Action Creators
// ====================

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems)
);

export const setIsCartOpen = withMatcher(
  (boolean: boolean): SetIsCartOpen =>
    createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)
);

// ====================
// Cart Operations
// ====================

export const addItemToCart = (cartItems: CartItem[], productToAdd: Product) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  productToRemove: Product
) => {
  const newCartItems = removeCartItem(cartItems, productToRemove);
  return setCartItems(newCartItems);
};

export const clearItemFromCart = (
  cartItems: CartItem[],
  productToClear: Product
) => {
  const newCartItems = clearCartItem(cartItems, productToClear);
  return setCartItems(newCartItems);
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
} as const;

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: readonly CartItem[];
};

export type CartItem = Product & {
  quantity: number;
};

export type Product = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
};

export type CartItemProps = {
  cartItem: CartItem;
};

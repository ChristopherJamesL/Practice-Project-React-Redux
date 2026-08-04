import { useCallback } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { setIsCartOpen } from "../../store/cart/cart.action";
import CartItem from "../cart-item/cart-item.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles";

export default function CartDropdown() {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const cartItems = useSelector(selectCartItems);

  const handleNavigate = useCallback(() => {
    navigate("/checkout");
    dispatch(setIsCartOpen(false));
  }, [navigate, dispatch]);

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <EmptyMessage>Your Cart Is Empty</EmptyMessage>
        )}
      </CartItems>
      <Button buttonType={BUTTON_TYPE_CLASSES.base} onClick={handleNavigate}>
        CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
}

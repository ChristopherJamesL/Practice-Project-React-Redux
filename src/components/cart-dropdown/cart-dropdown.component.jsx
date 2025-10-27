import { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  CartDropdownContainer,
  EmptyMessage,
  CartItems,
} from "./cart-dropdown.styles.jsx";

export default function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <CartDropdownContainer>
      <CartItems>
        {cartItems.length ? (
          cartItems.map((item, index) => {
            return <CartItem key={index} cartItem={item} />;
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

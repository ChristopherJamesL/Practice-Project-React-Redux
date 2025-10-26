import { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

import {
  CartDropdownContainer,
  CartItems,
  CartButton,
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
        {cartItems.map((item, index) => {
          return <CartItem key={index} cartItem={item} />;
        })}
      </CartItems>
      <Button style={{ marginTop: "auto" }} onClick={handleNavigate}>
        CHECKOUT
      </Button>
    </CartDropdownContainer>
  );
}

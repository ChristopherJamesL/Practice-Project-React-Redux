import { useContext } from "react";
import { useNavigate } from "react-router";
import { CartContext } from "../../contexts/cart.context";
import CartItem from "../cart-item/cart-item.component";
import Button from "../button/button.component";

import "./cart-dropdown.styles.scss";

export default function CartDropdown() {
  const { cartItems, setIsCartOpen } = useContext(CartContext);
  let navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/checkout");
    setIsCartOpen(false);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">
        {cartItems.map((item, index) => {
          return <CartItem key={index} cartItem={item} />;
        })}
      </div>
      <Button onClick={handleNavigate}>CHECKOUT</Button>
    </div>
  );
}

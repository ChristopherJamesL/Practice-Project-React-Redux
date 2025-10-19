import { useContext } from "react";
import { ReactComponent as ShoppingBagIcon } from "../../assets/shopping-bag.svg";
import { CartContext } from "../../contexts/cart.context";
import "./cart-icon.styles.scss";

export default function CartIcon() {
  const { isCartOpen, setIsCartOpen } = useContext(CartContext);

  const toggleDropdown = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="cart-icon-container" onClick={toggleDropdown}>
      <ShoppingBagIcon className="shopping-icon" />
      <span className="item-count">0</span>
    </div>
  );
}

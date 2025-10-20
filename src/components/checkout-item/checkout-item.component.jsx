import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import "./checkout-item.styles.scss";

export default function CheckoutItem({ cartItem }) {
  const { imageUrl, name, quantity, price } = cartItem;
  const { addItemToCart, removeItemFromCart, clearItemFromCart } =
    useContext(CartContext);

  const handleIncrement = (cartItem) => {
    addItemToCart(cartItem);
  };

  const handleDecrement = (cartItem) => {
    removeItemFromCart(cartItem);
  };

  const handleRemove = (cartItem) => {
    clearItemFromCart(cartItem);
  };

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={`${name}`} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => handleDecrement(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => handleIncrement(cartItem)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => handleRemove(cartItem)}>
        &#10005;
      </div>
    </div>
  );
}

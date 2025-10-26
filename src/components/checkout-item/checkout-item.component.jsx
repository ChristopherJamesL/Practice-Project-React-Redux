import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import {
  CheckoutItemContainer,
  ImageContainer,
  ProductImage,
  BaseSpan,
  Quantity,
  RemoveButton,
} from "./checkout-item.styles";

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
    <CheckoutItemContainer>
      <ImageContainer>
        <ProductImage src={imageUrl} alt={`${name}`} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <div className="arrow" onClick={() => handleDecrement(cartItem)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => handleIncrement(cartItem)}>
          &#10095;
        </div>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={() => handleRemove(cartItem)}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
}

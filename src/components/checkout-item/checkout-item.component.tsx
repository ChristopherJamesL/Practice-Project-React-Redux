import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

import type { CartItemProps } from "../../store/cart/cart.types";

import {
  CheckoutItemContainer,
  ImageContainer,
  ProductImage,
  BaseSpan,
  Quantity,
  RemoveButton,
} from "./checkout-item.styles";

export default function CheckoutItem({ cartItem }: CartItemProps) {
  const { imageUrl, name, quantity, price } = cartItem;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleIncrement = () => {
    dispatch(addItemToCart(cartItems, cartItem));
  };

  const handleDecrement = () => {
    dispatch(removeItemFromCart(cartItems, cartItem));
  };

  const handleRemove = () => {
    dispatch(clearItemFromCart(cartItems, cartItem));
  };

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <ProductImage src={imageUrl} alt={name} />
      </ImageContainer>
      <BaseSpan>{name}</BaseSpan>
      <Quantity>
        <div className="arrow" onClick={() => handleDecrement()}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => handleIncrement()}>
          &#10095;
        </div>
      </Quantity>
      <BaseSpan>{price}</BaseSpan>
      <RemoveButton onClick={() => handleRemove()}>&#10005;</RemoveButton>
    </CheckoutItemContainer>
  );
}

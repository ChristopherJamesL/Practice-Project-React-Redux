import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import {
  addItemToCart,
  removeItemFromCart,
  clearItemFromCart,
} from "../../store/cart/cart.action";

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

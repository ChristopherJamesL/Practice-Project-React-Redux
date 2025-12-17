import type { CartItemProps } from "../../store/cart/cart.types";
import {
  CartItemContainer,
  ItemDetails,
  Image,
  Name,
} from "./cart-item.styles";

export default function CartItem({ cartItem }: CartItemProps) {
  const { name, quantity, price, imageUrl } = cartItem;

  return (
    <CartItemContainer>
      <Image src={imageUrl} alt={name} />
      <ItemDetails>
        <Name>{name}</Name>
        <span>
          {quantity} x ${price}
        </span>
      </ItemDetails>
    </CartItemContainer>
  );
}

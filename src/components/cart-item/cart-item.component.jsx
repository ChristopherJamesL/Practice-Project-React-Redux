import {
  CartItemContainer,
  ItemDetails,
  Image,
  Name,
} from "./cart-item.styles";
// import "./cart-item.styles";

export default function CartItem({ cartItem }) {
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

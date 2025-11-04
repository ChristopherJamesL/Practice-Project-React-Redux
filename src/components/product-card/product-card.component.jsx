import { useSelector, useDispatch } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector";
import { addItemToCart } from "../../store/cart/cart.action";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import {
  ProductCartContainer,
  ProductImage,
  Footer,
  Name,
  Price,
} from "./product-card.styles";

export default function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const handleAddProductToCart = () =>
    dispatch(addItemToCart(cartItems, product));

  return (
    <ProductCartContainer>
      <ProductImage src={imageUrl} alt={name} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button
        buttonType={BUTTON_TYPE_CLASSES.inverted}
        onClick={handleAddProductToCart}
      >
        Add to cart
      </Button>
    </ProductCartContainer>
  );
}

import { useContext, useEffect } from "react";
import { CartContext } from "../../contexts/cart.context";
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
  const { addItemToCart } = useContext(CartContext);

  const handleAddProductToCart = () => addItemToCart(product);

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

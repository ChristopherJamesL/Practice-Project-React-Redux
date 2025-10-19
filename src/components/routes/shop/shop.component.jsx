import { useContext } from "react";
import { ProductsContext } from "../../../contexts/products.context";
import ProductCard from "../../product-card/product-card.component";

import "./shop.styles.scss";

export default function Shop() {
  const { products } = useContext(ProductsContext);

  return (
    <div className="products-container">
      {products.map((product) => {
        const { id } = product;

        return <ProductCard key={id} product={product} />;
      })}
    </div>
  );
}

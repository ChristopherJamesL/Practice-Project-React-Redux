import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import ProductCard from "../../product-card/product-card.component";

import "./category.styles.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";

export default function Category() {
  const [products, setProducts] = useState([]);
  const { categoriesMap } = useContext(CategoriesContext);
  let { category } = useParams();

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </CategoryContainer>
    </>
  );
}

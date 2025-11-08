import { useParams } from "react-router";
import { useState, useEffect } from "react";
import ProductCard from "../../product-card/product-card.component";

import "./category.styles.jsx";
import { CategoryContainer, CategoryTitle } from "./category.styles.jsx";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../../store/categories/categories.selector.js";
import Spinner from "../../spinner/spinner.component.jsx";

export default function Category() {
  let { category } = useParams();
  console.log("render/re-rendering category component");
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState([]);
  const isLoading = useSelector(selectCategoriesIsLoading);

  useEffect(() => {
    console.log("effect fired calling setProducts");

    setProducts(categoriesMap[category.toLowerCase()]);
  }, [category, categoriesMap]);

  return (
    <>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner />
      ) : (
        <CategoryContainer>
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </CategoryContainer>
      )}
    </>
  );
}

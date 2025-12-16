import { useParams } from "react-router";
import ProductCard from "../../product-card/product-card.component";

import "./category.styles";
import { CategoryContainer, CategoryTitle } from "./category.styles";
import { useSelector } from "react-redux";
import {
  selectCategoriesIsLoading,
  selectCategoriesMap,
} from "../../../store/categories/categories.selector";
import Spinner from "../../spinner/spinner.component";

type CategoryRouteParams = {
  category: string;
}

export default function Category() {
  let { category } = useParams<CategoryRouteParams>();
  console.log("render/re-rendering category component");
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);
  const products = category ? categoriesMap[category.toLowerCase()] : undefined;

  return (
    <>
      <CategoryTitle>{category?.toUpperCase()}</CategoryTitle>
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

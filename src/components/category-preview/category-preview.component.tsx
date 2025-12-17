import { useSelector } from "react-redux";
import { selectCategoriesIsLoading } from "../../store/categories/categories.selector";
import ProductCard from "../product-card/product-card.component";
import Spinner from "../spinner/spinner.component";

import type { CategoryItem } from "../../store/categories/categories.types";

import {
  CategoryPreviewContainer,
  Title,
  Preview,
} from "./category-preview.styles";

type CategoryPreviewProps = {
  title: string;
  products: CategoryItem[];
};

export default function CategoryPreview({
  title,
  products,
}: CategoryPreviewProps) {
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <CategoryPreviewContainer>
      <h2>
        <Title to={title}>{title.toUpperCase()}</Title>
      </h2>
      {isLoading || !products ? (
        <Spinner />
      ) : (
        <Preview>
          {products
            .filter((_, index) => index < 4)
            .map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </Preview>
      )}
    </CategoryPreviewContainer>
  );
}

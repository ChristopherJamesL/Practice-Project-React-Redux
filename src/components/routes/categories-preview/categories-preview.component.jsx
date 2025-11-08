import { useSelector } from "react-redux";
import SHOP_DATA from "../../../shop-data";
import {
  selectCategoriesMap,
  selectCategoriesIsLoading,
} from "../../../store/categories/categories.selector";
import CategoryPreview from "../../category-preview/category-preview.component";
import Spinner from "../../spinner/spinner.component";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectCategoriesIsLoading);

  return (
    <>
      {SHOP_DATA.map((categoryIndex) => {
        const { title } = categoryIndex;
        return (
          <CategoryPreview
            key={title.toLowerCase()}
            title={title}
            products={categoriesMap[title.toLowerCase()]}
          />
        );
      })}
      {/* {isLoading ? (
        <Spinner />
      ) : (
        Object.entries(categoriesMap).map(([category, items]) => {
          return (
            <CategoryPreview key={category} title={category} products={items} />
          );
        })
      )} */}
    </>
  );
}

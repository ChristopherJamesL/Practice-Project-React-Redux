import CategoryPreview from "../../category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesMap } from "../../../store/categories/categories.selector";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);

  return (
    <>
      {Object.entries(categoriesMap).map(([category, items]) => {
        return (
          <CategoryPreview key={category} title={category} products={items} />
        );
      })}
    </>
  );
}

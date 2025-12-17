import { useSelector } from "react-redux";
import SHOP_DATA from "../../../shop-data";
import { selectCategoriesMap } from "../../../store/categories/categories.selector";
import CategoryPreview from "../../category-preview/category-preview.component";

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap);

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
    </>
  );
}

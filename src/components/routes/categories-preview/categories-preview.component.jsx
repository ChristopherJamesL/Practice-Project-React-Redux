import { useContext } from "react";
import { useNavigate } from "react-router";
import { CategoriesContext } from "../../../contexts/categories.context";
import CategoryPreview from "../../category-preview/category-preview.component";

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);

  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/shop/${category}`);
  };

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

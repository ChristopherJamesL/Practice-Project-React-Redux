import { Routes, Route, useNavigate } from "react-router";

import "./shop.styles.scss";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import CategoryItem from "../../category-item/category-item.component";

export default function Shop() {
  const navigate = useNavigate();

  const handleNavigate = (category) => {
    navigate(`/shop/${category}`);
  };

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<CategoryItem />} />
    </Routes>
  );
}

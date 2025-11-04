import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router";
import { getCategoriesAndDocuments } from "../../../utils/firebase/firebase.utils";
import { setCategories } from "../../../store/categories/categories.action";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../Category/category.component";

export default function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const callGetCategoriesAndDocuments = async () => {
      const categoriesArray = await getCategoriesAndDocuments();
      console.log("categories array: ", categoriesArray);

      dispatch(setCategories(categoriesArray));
    };
    callGetCategoriesAndDocuments();
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

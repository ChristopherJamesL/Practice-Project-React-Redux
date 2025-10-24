import { useParams } from "react-router";
import { useContext, useState, useEffect } from "react";
import { CategoriesContext } from "../../../contexts/categories.context";
import ProductCard from "../../product-card/product-card.component";

import "./category.styles.scss";

export default function Category() {
  const [products, setProducts] = useState([]);
  const { categoriesMap } = useContext(CategoriesContext);
  let { category } = useParams();

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <div>
      <div>
        <h2>
          <span className="category-title">{category.toUpperCase()}</span>
        </h2>
      </div>
      <div className="category-container">
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </div>
    </div>
  );
}

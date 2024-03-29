import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import ProductCard from "../../components/product-card/product-card.component";

import { selectCategoriesMap } from "../../store/categories/category.selector";

import { CategoryContainer, Title } from "./category.styles";
import { ProductType } from "../../types/store.types";

type CategoryParams = {
  category: string;
};

const Category = () => {
  const { category } = useParams<CategoryParams>();
  const categoriesMap = useSelector(selectCategoriesMap);
  const [products, setProducts] = useState<ProductType[]>(
    category ? categoriesMap[category] : []
  );

  useEffect(() => {
    if (category) {
      setProducts(categoriesMap[category]);
    }
  }, [category, categoriesMap]);

  return (
    <>
      <Title>{category?.toUpperCase()}</Title>
      <CategoryContainer>
        {products &&
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
      </CategoryContainer>
    </>
  );
};

export default Category;

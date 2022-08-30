import { useEffect, useState } from "react";

import Card from "@components/Card";
import { Option } from "@components/Filter/Filter";
import styles from "@components/ProductList/ProductList.module.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import ProductType from "../../../customTypes/productType";

/** Пропсы, который принимает компонент Button */
export type ProductListProps = React.PropsWithChildren<{
  /** Категории товаров, которые нужно вывести*/
  filter: Array<Option>;
  /** Ограничение на количество товаров*/
  limit?: number;
}>;

//возвращает массив карточек, отфильтрованных по выбранным категориям, с заданным лимитом
const ProductList: React.FC<ProductListProps> = ({ filter, limit }) => {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    getData();
  }, [limit, filter]);

  const fetch = async (address: string) => {
    const result = await axios({
      method: "get",
      url: address,
    });

    setProducts(
      //добавить проверку на то, есть ли в резалт какое-то значение
      result.data.map((raw: ProductType) => ({
        id: raw.id,
        title: raw.title,
        category: raw.category,
        description: raw.description,
        image: raw.image,
        price: raw.price,
        rating: raw.rating,
      }))
    );
  };

  const getData = () => {
    if (filter.length !== 0) {
      setProducts([]);
      filter.map((category: Option) => {
        fetch("https://fakestoreapi.com/products/category/" + category.value +"?limit=" + limit);
      });
      setProducts(products.splice(0, limit));
    } else {
      fetch("https://fakestoreapi.com/products?limit=" + limit);
    }
  };

  let navigate = useNavigate();

  return (
    <div className={styles.product_list}>
      {products?.map(
        (product) =>
          product && (
            <Card
              image={product.image}
              title={product.title}
              subtitle={product.category}
              onClick={() => {
                navigate(`/product/${product.id}`, { replace: true });
              }}
            />
          )
      )}
    </div>
  );
};

export default ProductList;

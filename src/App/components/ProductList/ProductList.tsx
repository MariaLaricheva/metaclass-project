import {useEffect, useState} from 'react';
import axios from "axios";
import {Option} from "../Filter/Filter";
import Product from "../../../@custom-types/product";
import Card from "../Card";
import "./ProductList.scss"
import {useNavigate} from "react-router-dom";


/** Пропсы, который принимает компонент Button */
export type ProductListProps = React.PropsWithChildren<{
    /** Категории товаров, которые нужно вывести*/
    filter: Array<Option>;
    /** Ограничение на количество товаров*/
    limit?: number;
}>;

//возвращает массив карточек, отфильтрованных по выбранным категориям, с заданным лимитом
const ProductList: React.FC<ProductListProps> = ({filter, limit}) => {

    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => { getData() },[limit, filter])

    const fetch = async (address: string) => {
        const result = await axios({
            method: 'get',
            url: address
        });

        //с методом set можно будет убрать дубликаты
        // setProducts([...new Set(   всё что ниже закомментированно   )])

        /*
                setProducts(products.concat(result.data.map((raw: Product) =>
                    ({
                        id: raw.id,
                        title: raw.title,
                        category: raw.category,
                        description: raw.description,
                        image: raw.image,
                        price: raw.price,
                        rating: raw.rating
                  }))));

        */
                setProducts(result.data.map((raw: Product) =>
                    ({
                        id: raw.id,
                        title: raw.title,
                        category: raw.category,
                        description: raw.description,
                        image: raw.image,
                        price: raw.price,
                        rating: raw.rating
                    })));

    };

    const getData = () => {
        if (filter.length !== 0){
            setProducts([]);
            filter.map((category: Option) => {
                fetch('https://fakestoreapi.com/products/category/'+category.value);
            })
            setProducts(products.splice(0, limit))
        }
        else {
            fetch('https://fakestoreapi.com/products?limit='+limit);
        }
        console.log(products);
    }

    const getProductCount = () => {
        if (filter.length !== 0){
            filter.map((category: Option) => {
                fetch('https://fakestoreapi.com/products/category/'+category.value);
            })
        }
        else {
            fetch('https://fakestoreapi.com/products');
        }
        return
    }

    let navigate = useNavigate();

    return (
            <div className={'product-list'}>
                {products?.map(product => (
                        product &&
                        <Card image={product.image}
                              title={product.title}
                              subtitle={product.category}
                              onClick={() => {navigate(`/product/${product.id}`, { replace: true })}}
                        />
                    ))}
            </div>
    );
};

export default ProductList;
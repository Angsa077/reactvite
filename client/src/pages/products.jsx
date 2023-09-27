import { Fragment, useEffect, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct';
import { getProducts } from '../services/ProductService.js';
import stables from '../constants/stables';
import { useLogin } from '../hooks/useLogin';
import TableCart from '../components/Fragments/TableCart';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    useLogin();

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, [])

    return (
        <Fragment>
            <div className='flex justify-center py-5'>
                <div className='w-4/6 flex flex-wrap'>
                    {products.length > 0 &&
                        products.map((product) => (
                            <CardProduct key={product.id}>
                                <CardProduct.Header image={stables.UPLOAD_FOLDER_BASE_URL + product.image} id={product.id} />
                                <CardProduct.Body name={product.name}>
                                    {product.description}
                                </CardProduct.Body>
                                <CardProduct.Footer
                                    price={product.price}
                                    id={product.id}
                                />
                            </CardProduct>
                        ))}
                </div>
                <div className='w-2/6'>
                    <h1 className='text-3xl font-bold text-yellow-300 ml-5 mb-2'>Cart</h1>
                    <TableCart products={products} />
                </div>
            </div>
        </Fragment>
    )
}

export default ProductsPage;
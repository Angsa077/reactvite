import { Fragment, useEffect, useRef, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct';
import Button from '../components/Elements/Button/Index';
import { getProducts } from '../services/ProductService.js';
import stables from '../constants/stables';
import { getUsers } from '../services/AuthService';
import { useLogin } from '../hooks/useLogin';

const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [products, setProducts] = useState([]);
    const id = useLogin();

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    useEffect(() => {
        getProducts((data) => {
            setProducts(data);
        });
    }, [])

    useEffect(() => {
        if (products.length > 0 && cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id);
                if (product) {
                    return acc + product.price * item.qty;
                } else {
                    return acc;
                }
            }, 0);
            setTotalPrice(sum);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, products]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
    }

    const handleAddToCart = (id) => {
        if (cart.find((item) => item.id === id)) {
            setCart(
                cart.map((item) =>
                    item.id === id ? { ...item, qty: item.qty + 1 } : item
                )
            );
        } else {
            setCart([...cart, { id, qty: 1 }]);
        }
    };

    const totalPriceRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row";
        } else {
            totalPriceRef.current.style.display = "none";
        }
    }, [cart]);

    return (
        <Fragment>
            <div className='flex justify-end h-20 bg-yellow-300 text-white items-center px-10'>
                {id}
                <Button classname='ml-5 bg-black' onClick={handleLogout}>Logout</Button>
            </div>
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
                                    handleAddToCart={handleAddToCart}
                                />
                            </CardProduct>
                        ))}
                </div>
                <div className='w-2/6'>
                    <h1 className='text-3xl font-bold text-yellow-300 ml-5 mb-2'>Cart</h1>
                    <table className='text-left table-auto border-separate border-spacing-x-5'>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.length > 0 &&
                                cart.map((item) => {
                                    const product = products.find((product) => product.id === item.id);
                                    if (product) {
                                        return (
                                            <tr key={item.id}>
                                                <td>{product.name}</td>
                                                <td>
                                                    Rp. {" "}
                                                    {product.price.toLocaleString("id-ID", {
                                                        styles: "currency",
                                                        currency: "IDR"
                                                    })}
                                                </td>
                                                <td>{item.qty}</td>
                                                <td>
                                                    Rp. {(product.price * item.qty).toLocaleString("id-ID", {
                                                        styles: "currency",
                                                        currency: "IDR"
                                                    })}
                                                </td>
                                            </tr>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            <tr ref={totalPriceRef}>
                                <td colSpan={3}>
                                    <b>Total Price</b>
                                </td>
                                <td>
                                    <b>
                                        Rp{" "}
                                        {totalPrice.toLocaleString("id-ID", {
                                            styles: "currency",
                                            currency: "IDR"
                                        })}
                                    </b>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </Fragment>
    )
}

export default ProductsPage;
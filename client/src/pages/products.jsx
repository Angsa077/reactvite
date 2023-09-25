import { Fragment, useEffect, useRef, useState } from 'react';
import CardProduct from '../components/Fragments/CardProduct';
import Button from '../components/Elements/Button/Index';

const products = [
    {
        id: 1,
        name: "Jersey 1",
        price: 1000000,
        image: "/images/jersey.jpg",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero aut, 
        soluta ea, magnam nesciunt, commodi autem veritatis odit neque consequuntur dolorum!`
    },
    {
        id: 2,
        name: "Jersey 2",
        price: 500000,
        image: "/images/jersey.jpg",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero aut, 
        soluta ea, magnam nesciunt, commodi autem veritatis odit neque consequuntur dolorum!`
    },
    {
        id: 3,
        name: "Jersey 3",
        price: 2000000,
        image: "/images/jersey.jpg",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero aut, 
        soluta ea, magnam nesciunt, commodi autem veritatis odit neque consequuntur dolorum!`
    },
];

const email = localStorage.getItem('email');

const ProductsPage = () => {
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        setCart(JSON.parse(localStorage.getItem("cart")) || []);
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            const sum = cart.reduce((acc, item) => {
                const product = products.find((product) => product.id === item.id);
                return acc + product.price * item.qty;
            }, 0);
            setTotalPrice(sum);
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart]);

    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
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
        if(cart.length > 0) {
            totalPriceRef.current.style.display = "table-row";
        } else {
            totalPriceRef.current.style.display = "none";
        }
    }, [cart]);

    return (
        <Fragment>
            <div className='flex justify-end h-20 bg-yellow-300 text-white items-center px-10'>
                {email}
                <Button classname='ml-5 bg-black' onClick={handleLogout}>Logout</Button>
            </div>
            <div className='flex justify-center py-5'>
                <div className='w-4/6 flex flex-wrap'>
                    {products.map((product) => (
                        <CardProduct key={product.id}>
                            <CardProduct.Header image={product.image} />
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
                            {cart.map((item) => {
                                const product = products.find((product) => product.id === item.id);
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
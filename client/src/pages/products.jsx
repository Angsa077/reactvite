import { Fragment } from 'react';
import CardProduct from '../components/Fragments/CardProduct';
import Button from '../components/Elements/Button/Index';

const products = [
    {
        id: 1,
        name: "Jersey 1",
        price: "Rp. 1.000.000",
        image: "/images/jersey.jpg",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero aut, 
        soluta ea, magnam nesciunt, commodi autem veritatis odit neque consequuntur dolorum!`
    },
    {
        id: 2,
        name: "Jersey 2",
        price: "Rp. 1.000.000",
        image: "/images/jersey.jpg",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero aut, 
        soluta ea, magnam nesciunt, commodi autem veritatis odit neque consequuntur dolorum!`
    },
    {
        id: 3,
        name: "Jersey 3",
        price: "Rp. 1.000.000",
        image: "/images/jersey.jpg",
        description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero aut, 
        soluta ea, magnam nesciunt, commodi autem veritatis odit neque consequuntur dolorum!`
    },
];

const email = localStorage.getItem('email');

const ProductsPage = () => {
    const handleLogout = () => {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
        window.location.href = "/login";
    }
    return (
        <Fragment>
            <div className='flex justify-end h-20 bg-yellow-300 text-white items-center px-10'>
                {email}
                <Button classname='ml-5 bg-black' onClick={handleLogout}>Logout</Button>
            </div>
            <div className='flex justify-center py-5'>
                {products.map((product) => (
                    <CardProduct key={product.id}>
                        <CardProduct.Header image={product.image} />
                        <CardProduct.Body name={product.name}>
                            {product.description}
                        </CardProduct.Body>
                        <CardProduct.Footer price={product.price} />
                    </CardProduct>
                ))}
            </div>
        </Fragment>
    )
}

export default ProductsPage;
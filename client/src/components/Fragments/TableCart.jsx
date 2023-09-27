import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useTotalPrice, useTotalPriceDispatch } from "../../context/TotalPriceContext";

const TableCart = (props) => {
    const { products } = props;
    const cart = useSelector((state) => state.cart.data);
    const dispatch = useTotalPriceDispatch();
    const { total } = useTotalPrice();

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
            dispatch({
                type: "UPDATE",
                payload: {
                    total: sum,
                }
            });
            localStorage.setItem("cart", JSON.stringify(cart));
        }
    }, [cart, products]);

    const totalPriceRef = useRef(null);

    useEffect(() => {
        if (cart.length > 0) {
            totalPriceRef.current.style.display = "table-row";
        } else {
            totalPriceRef.current.style.display = "none";
        }
    }, [cart]);

    return (
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
                            {total.toLocaleString("id-ID", {
                                styles: "currency",
                                currency: "IDR"
                            })}
                        </b>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default TableCart;
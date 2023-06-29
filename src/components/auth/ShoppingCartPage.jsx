import React from "react";
import { Link } from "react-router-dom";

const ShoppingCartPage = ({
    cartItems,
    totalAmount,
    handleRemoveFromCart,
    updateQuantity,
}) => {
    const renderCartItems = () => {
        if (cartItems.length === 0) {
            return (
                <tr>
                    <td colSpan="5">Your cart is empty</td>
                </tr>
            );
        }

        return cartItems.map((item) => (
            <tr key={item.id}>
                <td>{item.title}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                    <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                            updateQuantity(
                                item.id,
                                parseInt(e.target.value, 10)
                            )
                        }
                    />
                </td>
                <td>${(item.price * (item.quantity || 1)).toFixed(2)}</td>
                <td>
                    <button onClick={() => handleRemoveFromCart(item.id)}>
                        Remove
                    </button>
                </td>
            </tr>
        ));
    };

    return (
        <div className="shopping-cart-page">
            <button>
                {" "}
                <Link to="/main">Return to webshop</Link>{" "}
            </button>
            <h1>Shopping Cart</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{renderCartItems()}</tbody>
            </table>
            {cartItems.length > 0 && (
                <h3>Total Amount: ${totalAmount.toFixed(2)}</h3>
            )}
        </div>
    );
};

export default ShoppingCartPage;

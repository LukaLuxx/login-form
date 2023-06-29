import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignIn from "../src/components/auth/SignIn";
import LogIn from "../src/components/auth/LogIn";
import MainPage from "./components/auth/MainPage";
import ShoppingCartPage from "./components/auth/ShoppingCartPage";
import "./App.css";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        const storedCartItems = localStorage.getItem("cartItems");
        const storedTotalAmount = localStorage.getItem("totalAmount");

        if (storedCartItems) {
            setCartItems(JSON.parse(storedCartItems));
        }

        if (storedTotalAmount) {
            setTotalAmount(parseFloat(storedTotalAmount));
        }
    }, []);

    const handleAddToCart = (product) => {
        const existingItem = cartItems.find((item) => item.id === product.id);

        if (existingItem) {
            // If the item already exists, update its quantity
            const updatedCartItems = cartItems.map((item) => {
                if (item.id === product.id) {
                    return { ...item, quantity: (item.quantity || 1) + 1 };
                }
                return item;
            });

            setCartItems(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        } else {
            const updatedCartItems = [
                ...cartItems,
                { ...product, quantity: 1 },
            ];

            setCartItems(updatedCartItems);
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
        }

        setTotalAmount((prevAmount) => prevAmount + product.price);
    };

    const updateQuantity = (productId, quantity) => {
        setCartItems((prevItems) => {
            const updatedCartItems = prevItems.map((item) =>
                item.id === productId ? { ...item, quantity: quantity } : item
            );
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });

        setTotalAmount((prevTotalAmount) => {
            const prevItems = cartItems;
            const updatedAmount = prevItems.reduce((total, item) => {
                if (item.id === productId) {
                    return total + item.price * quantity;
                } else {
                    return total + item.price * item.quantity;
                }
            }, 0);

            return updatedAmount;
        });
    };

    const handleRemoveFromCart = (productId) => {
        setCartItems((prevItems) => {
            const updatedCartItems = prevItems.filter(
                (item) => item.id !== productId
            );
            localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
            return updatedCartItems;
        });
    };

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <SignIn
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LogIn
                                isLoggedIn={isLoggedIn}
                                setIsLoggedIn={setIsLoggedIn}
                            />
                        }
                    />
                    <Route
                        path="/main"
                        element={
                            <MainPage
                                handleAddToCart={handleAddToCart}
                                updateQuantity={updateQuantity}
                            />
                        }
                    />
                    <Route
                        path="/cart"
                        element={
                            <ShoppingCartPage
                                cartItems={cartItems}
                                totalAmount={totalAmount}
                                handleRemoveFromCart={handleRemoveFromCart}
                                updateQuantity={updateQuantity}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MainPage = ({ handleAddToCart }) => {
    const getItemsPerRow = () => {
        if (window.innerWidth <= 768) {
            return 1;
        } else if (window.innerWidth <= 1024) {
            return 2;
        } else {
            return 3;
        }
    };

    const [products, setProducts] = useState([]);
    const [itemsPerRow, setItemsPerRow] = useState(getItemsPerRow());

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((res) => {
                const fetchedProducts = res.data;
                setProducts(fetchedProducts);
            })
            .catch((error) => {
                console.log("Error:", error);
            });

        const handleWindowResize = () => {
            setItemsPerRow(getItemsPerRow());
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    const handleAddItemClick = (product) => {
        handleAddToCart(product);
        toast.success("Item added to cart!", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
        });
    };

    const renderProductRows = () => {
        if (!products || products.length === 0) {
            return <div>No products available.</div>;
        }

        const rows = [];

        for (let i = 0; i < products.length; i += itemsPerRow) {
            const rowProducts = products.slice(i, i + itemsPerRow);
            const row = (
                <div key={i} className="product-row">
                    {rowProducts.map((product) => (
                        <div key={product.id} className="product-item">
                            <h3>{product.title}</h3>
                            <img
                                src={product.image}
                                alt={product.title}
                                className="product-image"
                            />
                            <p>{product.price} $</p>
                            <button onClick={() => handleAddItemClick(product)}>
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            );
            rows.push(row);
        }

        return rows;
    };

    return (
        <div className="main-page">
            <h1>
                <button>
                    <Link to="/cart">Cart</Link>
                </button>
                Welcome to our <span className="web"> web</span>
                <span className="shop">shop</span>!
            </h1>
            <h2>Products:</h2>
            <div className="product-list">{renderProductRows()}</div>
            <button className="logoutBtn">
                <Link to="/">Log Out</Link>
            </button>
            <ToastContainer />
        </div>
    );
};

export default MainPage;

import React from "react";

const QuantityInput = ({ value, onChange }) => {
    const handleIncrement = () => {
        onChange(value + 1);
    };

    const handleDecrement = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    return (
        <div className="quantity-input">
            <button onClick={handleIncrement}>+</button>
            <input type="text" value={value} onChange={onChange} />
            <button onClick={handleDecrement}>-</button>
        </div>
    );
};

export default QuantityInput;

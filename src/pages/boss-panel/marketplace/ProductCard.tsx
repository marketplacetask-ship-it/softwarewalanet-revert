import React from 'react';

const ProductCard = () => {
    return (
        <div className="product-card">
            <h2>Product Title</h2>
            <p>Description of the product goes here.</p>
            <div className="button-group">
                <button className="demo-button">Demo</button>
                <button className="buy-button">Buy Now</button>
            </div>
        </div>
    );
};

export default ProductCard;

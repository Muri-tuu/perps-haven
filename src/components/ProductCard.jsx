import React, { useState, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const ProductCard = ({ product }) => {
    const [currentVariantIndex, setCurrentVariantIndex] = useState(0);
    const { addToCart } = useContext(ShopContext);

    const currentVariant = product.variants[currentVariantIndex];

    const changeVariant = (direction) => {
        let newIndex = currentVariantIndex + direction;
        if (newIndex < 0) newIndex = product.variants.length - 1;
        if (newIndex >= product.variants.length) newIndex = 0;
        setCurrentVariantIndex(newIndex);
    };

    return (
        <div className="product-card" data-category={product.category}>
            <div className="product-img-container">
                <button className="nav-btn prev" onClick={() => changeVariant(-1)}>&#10094;</button>
                <div
                    className="product-img"
                    style={{ backgroundImage: `url('${currentVariant.image}')` }}
                ></div>
                <button className="nav-btn next" onClick={() => changeVariant(1)}>&#10095;</button>
            </div>
            <div className="product-info">
                <h3 className="product-title">{product.name}</h3>
                <p className="variant-name">{currentVariant.name}</p>
                <p className="product-price">KES {product.price}</p>
                <button className="add-btn" onClick={() => addToCart(product, currentVariant)}>Add to Stash</button>
            </div>
        </div>
    );
};

export default ProductCard;

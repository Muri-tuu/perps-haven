import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { X, WhatsappLogo } from '@phosphor-icons/react';

const CartDrawer = () => {
    const {
        cart,
        isCartOpen,
        toggleCart,
        updateQuantity,
        cartTotal,
        toggleCheckout
    } = useContext(ShopContext);

    const handleCheckout = () => {
        if (cart.length === 0) return alert('Your stash is empty!');
        toggleCart(); // Close cart
        toggleCheckout(); // Open checkout
    };

    return (
        <>
            <div className={`cart-drawer ${isCartOpen ? 'open' : ''}`} id="cart-drawer">
                <div className="cart-header">
                    <h3>Your Stash</h3>
                    <button id="close-cart" onClick={toggleCart}>
                        <X size={24} />
                    </button>
                </div>
                <div className="cart-items" id="cart-items">
                    {cart.map(item => (
                        <div className="cart-item" key={item.cartId}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                backgroundImage: `url('${item.image}')`,
                                backgroundSize: 'cover',
                                borderRadius: '5px'
                            }}></div>
                            <div className="cart-item-details">
                                <h4>{item.name}</h4>
                                <p className="cart-variant">{item.variant}</p>
                                <p>KES {item.price}</p>
                                <div className="quantity-controls">
                                    <button onClick={() => updateQuantity(item.cartId, -1)}>-</button>
                                    <span>{item.quantity}</span>
                                    <button onClick={() => updateQuantity(item.cartId, 1)}>+</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-footer">
                    <div className="total">Total: <span id="cart-total">KES {cartTotal}</span></div>
                    <button id="checkout-btn" className="checkout-btn" onClick={handleCheckout}>
                        <WhatsappLogo size={24} style={{ marginRight: '8px' }} /> Order via WhatsApp
                    </button>
                </div>
            </div>
            <div
                className={`overlay ${isCartOpen ? 'active' : ''}`}
                id="overlay"
                onClick={toggleCart}
            ></div>
        </>
    );
};

export default CartDrawer;

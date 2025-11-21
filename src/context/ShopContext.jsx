import React, { createContext, useState, useEffect } from 'react';

export const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    // Product Data
    const products = [
        {
            id: 1,
            name: "Butterfly Hair Claw",
            price: 250,
            category: "hair",
            variants: [
                { name: "Dark Brown", image: "/assets/hair-claw-1.jpg" },
                { name: "Cream", image: "/assets/hair-claw-2.jpg" },
                { name: "Rust", image: "/assets/hair-claw-3.jpg" },
                { name: "Tan", image: "/assets/hair-claw-4.jpg" },
                { name: "Black", image: "/assets/hair-claw-5.jpg" }
            ]
        },
        {
            id: 2,
            name: "Flower Hair Claw",
            price: 200,
            category: "hair",
            variants: [
                { name: "Blue", image: "/assets/flower-claw-1.jpg" },
                { name: "Gold/Black", image: "/assets/flower-claw-2.jpg" },
                { name: "Yellow", image: "/assets/flower-claw-3.jpg" },
                { name: "Assorted", image: "/assets/flower-claw-4.jpg" },
                { name: "Bright Yellow", image: "/assets/flower-claw-5.jpg" }
            ]
        }
    ];

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product, variant) => {
        const cartItemId = `${product.id}-${variant.name}`;
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.cartId === cartItemId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.cartId === cartItemId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, {
                    cartId: cartItemId,
                    id: product.id,
                    name: product.name,
                    variant: variant.name,
                    price: product.price,
                    image: variant.image,
                    quantity: 1
                }];
            }
        });
        setIsCartOpen(true);
    };

    const updateQuantity = (cartItemId, change) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.cartId === cartItemId) {
                    return { ...item, quantity: item.quantity + change };
                }
                return item;
            }).filter(item => item.quantity > 0);
        });
    };

    const removeFromCart = (cartItemId) => {
        setCart(prevCart => prevCart.filter(item => item.cartId !== cartItemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    const toggleCart = () => setIsCartOpen(!isCartOpen);
    const toggleCheckout = () => setIsCheckoutOpen(!isCheckoutOpen);

    const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <ShopContext.Provider value={{
            products,
            cart,
            addToCart,
            updateQuantity,
            removeFromCart,
            clearCart,
            isCartOpen,
            setIsCartOpen,
            toggleCart,
            isCheckoutOpen,
            setIsCheckoutOpen,
            toggleCheckout,
            cartTotal,
            cartCount
        }}>
            {children}
        </ShopContext.Provider>
    );
};

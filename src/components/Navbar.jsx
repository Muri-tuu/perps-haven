import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
    const { cart, toggleCart } = useContext(ShopContext);
    const { theme, toggleTheme } = useTheme();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo">PERPS HAVEN</div>
            <div className="nav-links">
                <a href="#gallery">Collection</a>
                <a href="#reviews">Reviews</a>
                <button onClick={toggleTheme} className="icon-btn" aria-label="Toggle Theme">
                    {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <button className="icon-btn" onClick={toggleCart}>
                    🛒
                    {cartCount > 0 && <span id="cart-count">{cartCount}</span>}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;

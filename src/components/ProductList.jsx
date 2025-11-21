import React, { useState, useContext, useEffect, useRef } from 'react';
import { ShopContext } from '../context/ShopContext';
import ProductCard from './ProductCard';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const ProductList = () => {
    const { products } = useContext(ShopContext);
    const [filter, setFilter] = useState('all');
    const containerRef = useRef(null);

    const filteredProducts = filter === 'all'
        ? products
        : products.filter(p => p.category === filter);

    useGSAP(() => {
        gsap.from('.product-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out'
        });
    }, { scope: containerRef, dependencies: [filter] }); // Re-run animation when filter changes

    return (
        <section id="gallery" className="gallery-section" ref={containerRef}>
            <h2 className="section-title">The Collection</h2>
            <div className="filters">
                <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All</button>
                <button className={`filter-btn ${filter === 'bracelet' ? 'active' : ''}`} onClick={() => setFilter('bracelet')}>Bracelets</button>
                <button className={`filter-btn ${filter === 'necklace' ? 'active' : ''}`} onClick={() => setFilter('necklace')}>Necklaces</button>
                <button className={`filter-btn ${filter === 'bangle' ? 'active' : ''}`} onClick={() => setFilter('bangle')}>Bangles</button>
                <button className={`filter-btn ${filter === 'hair' ? 'active' : ''}`} onClick={() => setFilter('hair')}>Hair</button>
            </div>
            <div className="product-grid" id="product-grid">
                {filteredProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
};

export default ProductList;

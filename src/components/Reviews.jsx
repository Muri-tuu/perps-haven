import React, { useRef, useContext, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ReviewContext } from '../context/ReviewContext';
import ReviewForm from './ReviewForm';

gsap.registerPlugin(ScrollTrigger);

const Reviews = () => {
    const { reviews } = useContext(ReviewContext);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const containerRef = useRef(null);

    useGSAP(() => {
        gsap.from('.review-card', {
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top 80%',
            },
            x: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out'
        });
    }, { scope: containerRef, dependencies: [reviews] });

    return (
        <section id="reviews" className="reviews-section">
            <div className="reviews-header">
                <h2 className="section-title">Campus Vibe Check</h2>
                <button className="add-review-btn" onClick={() => setIsFormOpen(true)}>
                    Write a Review
                </button>
            </div>

            <div className="reviews-container" id="reviews-container" ref={containerRef}>
                {reviews.map((review) => (
                    <div className="review-card" key={review.id}>
                        <div className="review-header">
                            <img src={review.avatar} alt={review.name} className="reviewer-avatar" />
                            <div className="reviewer-info">
                                <strong>{review.name}</strong>
                                <span className="reviewer-role">{review.role}</span>
                                <div className="review-rating">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </div>
                            </div>
                        </div>
                        <p className="review-text">"{review.text}"</p>
                        {review.image && (
                            <div className="review-image">
                                <img src={review.image} alt="Review attachment" />
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {isFormOpen && <ReviewForm onClose={() => setIsFormOpen(false)} />}
        </section>
    );
};

export default Reviews;

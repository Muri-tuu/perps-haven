import React, { createContext, useState, useEffect } from 'react';

export const ReviewContext = createContext();

export const ReviewProvider = ({ children }) => {
    const [reviews, setReviews] = useState(() => {
        const savedReviews = localStorage.getItem('reviews');
        return savedReviews ? JSON.parse(savedReviews) : [
            { id: 1, name: "Stacy K.", text: "The drip is real! Got my necklace in 2 days.", role: "MUT Student", rating: 5, avatar: "https://i.pravatar.cc/150?img=1", image: null },
            { id: 2, name: "Brian M.", text: "Best prices for campus students. Highly recommend.", role: "MUT Student", rating: 4, avatar: "https://i.pravatar.cc/150?img=8", image: null },
            { id: 3, name: "Cynthia W.", text: "Love the packaging and the vibe. Will buy again.", role: "MUT Student", rating: 5, avatar: "https://i.pravatar.cc/150?img=5", image: null },
            { id: 4, name: "Kevin O.", text: "Quality is top notch. The gold chain doesn't fade.", role: "MUT Student", rating: 5, avatar: "https://i.pravatar.cc/150?img=11", image: null }
        ];
    });

    const [userProfile, setUserProfile] = useState(() => {
        const savedProfile = localStorage.getItem('user_profile');
        return savedProfile ? JSON.parse(savedProfile) : null;
    });

    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }, [reviews]);

    useEffect(() => {
        if (userProfile) {
            localStorage.setItem('user_profile', JSON.stringify(userProfile));
        }
    }, [userProfile]);

    const addReview = (reviewData) => {
        const newReview = {
            id: Date.now(),
            ...reviewData,
            date: new Date().toISOString()
        };
        setReviews(prev => [newReview, ...prev]);
    };

    const updateUserProfile = (profileData) => {
        setUserProfile(profileData);
    };

    return (
        <ReviewContext.Provider value={{ reviews, userProfile, addReview, updateUserProfile }}>
            {children}
        </ReviewContext.Provider>
    );
};

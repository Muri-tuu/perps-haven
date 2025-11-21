import React, { useState, useContext, useRef } from 'react';
import { ReviewContext } from '../context/ReviewContext';

const AVATARS = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=5',
    'https://i.pravatar.cc/150?img=8',
    'https://i.pravatar.cc/150?img=11',
    'https://i.pravatar.cc/150?img=32'
];

const ReviewForm = ({ onClose }) => {
    const { userProfile, updateUserProfile, addReview } = useContext(ReviewContext);
    const [step, setStep] = useState(userProfile ? 2 : 1); // 1: Profile, 2: Review

    // Profile State
    const [profileData, setProfileData] = useState({
        username: '',
        avatar: AVATARS[0]
    });

    // Review State
    const [reviewData, setReviewData] = useState({
        rating: 5,
        text: '',
        image: null
    });

    const fileInputRef = useRef(null);

    const handleProfileSubmit = (e) => {
        e.preventDefault();
        if (profileData.username.trim()) {
            updateUserProfile(profileData);
            setStep(2);
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 500000) { // 500KB limit
                alert("Image is too large! Please choose an image under 500KB.");
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                setReviewData(prev => ({ ...prev, image: reader.result }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        addReview({
            name: userProfile ? userProfile.username : profileData.username,
            avatar: userProfile ? userProfile.avatar : profileData.avatar,
            role: "Verified Buyer",
            ...reviewData
        });
        onClose();
    };

    return (
        <div className="modal-overlay active">
            <div className="modal-content review-modal">
                <button className="close-modal" onClick={onClose}>&times;</button>

                {step === 1 && (
                    <div className="profile-step">
                        <h3>Create Your Profile</h3>
                        <form onSubmit={handleProfileSubmit}>
                            <div className="form-group">
                                <label>Choose an Avatar</label>
                                <div className="avatar-selection">
                                    {AVATARS.map((av, idx) => (
                                        <img
                                            key={idx}
                                            src={av}
                                            alt={`Avatar ${idx + 1}`}
                                            className={profileData.avatar === av ? 'selected' : ''}
                                            onClick={() => setProfileData(prev => ({ ...prev, avatar: av }))}
                                        />
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Username</label>
                                <input
                                    type="text"
                                    value={profileData.username}
                                    onChange={(e) => setProfileData(prev => ({ ...prev, username: e.target.value }))}
                                    required
                                    placeholder="e.g. CampusQueen"
                                />
                            </div>
                            <button type="submit" className="checkout-btn">Next</button>
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div className="review-step">
                        <h3>Write a Review</h3>
                        <form onSubmit={handleReviewSubmit}>
                            <div className="form-group">
                                <label>Rating</label>
                                <div className="star-rating">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <span
                                            key={star}
                                            className={star <= reviewData.rating ? 'star filled' : 'star'}
                                            onClick={() => setReviewData(prev => ({ ...prev, rating: star }))}
                                        >★</span>
                                    ))}
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Your Review</label>
                                <textarea
                                    value={reviewData.text}
                                    onChange={(e) => setReviewData(prev => ({ ...prev, text: e.target.value }))}
                                    required
                                    placeholder="Tell us what you think..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Add a Photo (Optional)</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    ref={fileInputRef}
                                    onChange={handleImageUpload}
                                />
                                {reviewData.image && (
                                    <div className="image-preview">
                                        <img src={reviewData.image} alt="Preview" />
                                        <button type="button" onClick={() => setReviewData(prev => ({ ...prev, image: null }))}>Remove</button>
                                    </div>
                                )}
                            </div>
                            <button type="submit" className="checkout-btn">Post Review</button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ReviewForm;

import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { sendOrderEmail } from '../utils/emailService';

const CheckoutModal = () => {
    const { isCheckoutOpen, toggleCheckout, cart, cartTotal, clearCart } = useContext(ShopContext);
    const [step, setStep] = useState(1); // 1: Form, 2: Confirm, 3: Success
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        apartment: '',
        pickup: '',
        payment: 'Pay Now'
    });

    useEffect(() => {
        if (isCheckoutOpen) {
            setStep(1); // Reset to step 1 when opening
            const savedData = localStorage.getItem('user_data');
            if (savedData) {
                setFormData(prev => ({ ...prev, ...JSON.parse(savedData) }));
            }
        }
    }, [isCheckoutOpen]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleBack = () => {
        setStep(1);
    };

    const handleConfirmOrder = async () => {
        setIsSubmitting(true);
        localStorage.setItem('user_data', JSON.stringify(formData));

        try {
            await sendOrderEmail({
                ...formData,
                cart,
                cartTotal
            });
            clearCart();
            setStep(3);
        } catch (error) {
            console.error("Email sending failed", error);
            alert("Failed to place order. Please try again or contact us via WhatsApp.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const openWhatsApp = () => {
        window.open(`https://wa.me/254700000000`, '_blank');
    };

    if (!isCheckoutOpen) return null;

    return (
        <div className={`modal-overlay ${isCheckoutOpen ? 'active' : ''}`} id="checkout-modal">
            <div className="modal-content checkout-container">
                <button className="close-modal" onClick={toggleCheckout}>&times;</button>

                {step === 1 && (
                    <>
                        <h2>Complete Your Order</h2>
                        <form id="checkout-form" onSubmit={handleNext}>
                            <div className="form-group">
                                <label>Full Name</label>
                                <input
                                    type="text"
                                    name="fullName"
                                    value={formData.fullName}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Jane Doe"
                                />
                            </div>

                            <div className="form-group">
                                <label>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. jane@example.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. 0712345678"
                                />
                            </div>
                            <div className="form-group">
                                <label>Apartment Name</label>
                                <input
                                    type="text"
                                    name="apartment"
                                    value={formData.apartment}
                                    onChange={handleChange}
                                    required
                                    placeholder="e.g. Sunrise Apts"
                                />
                            </div>
                            <div className="form-group">
                                <label>Pickup Location</label>
                                <select
                                    name="pickup"
                                    value={formData.pickup}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Location</option>
                                    <option value="VM">VM</option>
                                    <option value="Franc Fort">Franc Fort</option>
                                    <option value="Mwangaza">Mwangaza</option>
                                    <option value="Town">Town</option>
                                    <option value="Catholic">Catholic</option>
                                    <option value="Manyotta">Manyotta</option>
                                    <option value="Small Gate">Small Gate</option>
                                    <option value="Area 4">Area 4</option>
                                    <option value="Main Gate">Main Gate</option>
                                    <option value="TB1">TB1</option>
                                    <option value="TB2">TB2</option>
                                    <option value="Assembly Hall">Assembly Hall</option>
                                    <option value="Milimani Hall 1">Milimani Hall 1</option>
                                    <option value="Milimani Hall 2">Milimani Hall 2</option>
                                    <option value="Mukuyu">Mukuyu</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Payment Method</label>
                                <div className="radio-group">
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="Pay Now"
                                            checked={formData.payment === 'Pay Now'}
                                            onChange={handleChange}
                                        /> Pay Now (M-Pesa)
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="Cash on Delivery"
                                            checked={formData.payment === 'Cash on Delivery'}
                                            onChange={handleChange}
                                        /> Cash on Delivery
                                    </label>
                                </div>
                            </div>
                            <button type="submit" className="checkout-btn">Place Order</button>
                        </form>
                    </>
                )}

                {step === 2 && (
                    <div className="confirmation-step">
                        <h2>Confirm Details</h2>
                        <div className="confirmation-details">
                            <p><strong>Name:</strong> {formData.fullName}</p>
                            <p><strong>Email:</strong> {formData.email}</p>
                            <p><strong>Phone:</strong> {formData.phone}</p>
                            <p><strong>Address:</strong> {formData.apartment}, {formData.pickup}</p>
                            <p><strong>Payment:</strong> {formData.payment}</p>
                            <p><strong>Total:</strong> KES {cartTotal}</p>
                        </div>
                        <div className="confirmation-actions">
                            <button className="back-btn" onClick={handleBack}>Back</button>
                            <button className="checkout-btn" onClick={handleConfirmOrder} disabled={isSubmitting}>
                                {isSubmitting ? 'Processing...' : 'Confirm Order'}
                            </button>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="success-step">
                        <div className="success-icon">🎉</div>
                        <h2>Order Placed!</h2>
                        <p>Thank you! We will get back to you shortly via email.</p>
                        <button className="whatsapp-btn" onClick={openWhatsApp}>
                            Talk to us via WhatsApp
                        </button>
                        <button className="close-btn" onClick={toggleCheckout}>Close</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;

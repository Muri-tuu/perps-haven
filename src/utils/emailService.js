import emailjs from '@emailjs/browser';

// Initialize EmailJS with the public key
// Note: It's better to initialize this in your main app component, but for simplicity we can do it here or just pass the key in send.
// We will pass the key in the send function or use init() if needed.
// For this implementation, we'll use the send() method which takes the key as a parameter or relies on global init.

export const sendOrderEmail = async (orderDetails) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    console.log('EmailJS Config:', {
        serviceId: serviceId ? 'Set' : 'Missing',
        templateId: templateId ? 'Set' : 'Missing',
        publicKey: publicKey ? 'Set' : 'Missing'
    });

    if (!serviceId || !templateId || !publicKey) {
        console.warn('EmailJS environment variables are missing. Email not sent.');
        return;
    }

    const templateParams = {
        to_name: 'Ken Hopkins', // Or the admin's name
        from_name: orderDetails.fullName,
        from_email: orderDetails.email,
        phone: orderDetails.phone,
        apartment: orderDetails.apartment,
        pickup_location: orderDetails.pickup,
        payment_method: orderDetails.payment,
        order_items: orderDetails.cart.map(item =>
            `${item.name} (${item.variant}) x${item.quantity} - KES ${item.price * item.quantity}`
        ).join('\n'),
        total_amount: orderDetails.cartTotal,
        message: `New order received from ${orderDetails.fullName}.`
    };

    try {
        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        console.log('Email sent successfully!', response.status, response.text);
        return response;
    } catch (error) {
        console.error('Failed to send email:', error);
        throw error;
    }
};

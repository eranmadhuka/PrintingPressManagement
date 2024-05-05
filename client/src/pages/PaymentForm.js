import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement)
        });

        if (error) {
            console.error(error);
            setLoading(false);
        } else {
            // Send payment method to server
            const { id } = paymentMethod;
            const response = await fetch('/charge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    amount: 1000, // Amount in cents
                    source: id,
                    receipt_email: 'customer@example.com' // Customer's email
                })
            });

            if (response.ok) {
                console.log('Payment successful');
                // Handle success
            } else {
                console.error('Payment failed');
                // Handle failure
            }

            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Processing...' : 'Pay'}
            </button>
        </form>
    );
};

export default PaymentForm;

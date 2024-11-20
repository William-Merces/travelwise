import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

export const createPaymentIntent = async (amount: number) => {
    try {
        const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount }),
        });

        return await response.json();
    } catch (error) {
        console.error('Error creating payment intent:', error);
        throw error;
    }
};

export const processPayment = async (paymentMethodId: string, amount: number) => {
    try {
        const response = await fetch('/api/process-payment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentMethodId,
                amount,
            }),
        });

        return await response.json();
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};
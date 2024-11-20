'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode } from 'react';

// Certifique-se de que esta chave está no seu .env.local
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY!);

interface StripeWrapperProps {
    children: ReactNode;
    clientSecret: string;
}

const StripeWrapper = ({ children, clientSecret }: StripeWrapperProps) => {
    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe',
            variables: {
                colorPrimary: '#2563eb',
                colorBackground: '#ffffff',
                colorText: '#1f2937',
                colorDanger: '#ef4444',
                fontFamily: 'Inter, system-ui, sans-serif',
                borderRadius: '0.5rem',
            },
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            {children}
        </Elements>
    );
};

export default StripeWrapper;
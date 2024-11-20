'use client';

import { useEffect, useState } from 'react';
import { createPaymentIntent } from '@/services/stripe';
import PaymentForm from '@/components/common/payment/PaymentForm';
import StripeWrapper from '@/components/common/payment/StripeWrapper';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function PaymentPage() {
    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const amount = 1000; // R$ 1000,00 como exemplo

    useEffect(() => {
        const initializePayment = async () => {
            try {
                const { clientSecret } = await createPaymentIntent(amount);
                setClientSecret(clientSecret);
            } catch (error) {
                console.error('Error initializing payment:', error);
            }
        };

        initializePayment();
    }, []);

    if (!clientSecret) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">
                    Finalizar Pagamento
                </h1>

                <StripeWrapper clientSecret={clientSecret}>
                    <PaymentForm
                        amount={amount}
                        onSuccess={() => console.log('Pagamento realizado com sucesso')}
                        onError={(error) => console.error('Erro no pagamento:', error)}
                    />
                </StripeWrapper>
            </div>
        </div>
    );
}
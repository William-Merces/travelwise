'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
    PaymentElement,
    useStripe,
    useElements,
} from '@stripe/react-stripe-js';
import { Loader2 } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';

interface PaymentFormProps {
    amount: number;
    onSuccess?: () => void;
    onError?: (error: string) => void;
}

const PaymentForm = ({ amount, onSuccess, onError }: PaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!stripe) return;

        // Recupera o payment_intent_client_secret da URL
        const clientSecret = new URLSearchParams(window.location.search).get(
            'payment_intent_client_secret'
        );

        if (!clientSecret) return;

        stripe
            .retrievePaymentIntent(clientSecret)
            .then(({ paymentIntent }) => {
                switch (paymentIntent?.status) {
                    case 'succeeded':
                        setMessage('Pagamento realizado com sucesso!');
                        onSuccess?.();
                        break;
                    case 'processing':
                        setMessage('Seu pagamento está sendo processado.');
                        break;
                    case 'requires_payment_method':
                        setMessage('Seu pagamento não foi realizado. Por favor, tente novamente.');
                        break;
                    default:
                        setMessage('Algo deu errado.');
                        break;
                }
            });
    }, [stripe, onSuccess]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        try {
            const { error } = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/payment/confirmation`,
                },
            });

            if (error.type === 'card_error' || error.type === 'validation_error') {
                setMessage(error.message || 'Ocorreu um erro ao processar o pagamento.');
                onError?.(error.message || 'Ocorreu um erro ao processar o pagamento.');
            } else {
                setMessage('Ocorreu um erro inesperado.');
                onError?.('Ocorreu um erro inesperado.');
            }
        } catch (err) {
            setMessage('Ocorreu um erro ao processar o pagamento.');
            onError?.('Ocorreu um erro ao processar o pagamento.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6">
            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-2">Detalhes do Pagamento</h3>
                <p className="text-gray-600 dark:text-gray-300">
                    Valor total: {formatCurrency(amount)}
                </p>
            </div>

            <div className="space-y-4">
                <PaymentElement />

                <div className="flex items-center mt-4">
                    <input
                        type="checkbox"
                        id="savePaymentMethod"
                        className="h-4 w-4 text-primary border-gray-300 rounded"
                    />
                    <label
                        htmlFor="savePaymentMethod"
                        className="ml-2 block text-sm text-gray-900 dark:text-gray-100"
                    >
                        Salvar método de pagamento para futuras compras
                    </label>
                </div>

                {message && (
                    <div className={`p-4 rounded-md ${message.includes('sucesso')
                            ? 'bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-100'
                            : 'bg-red-50 text-red-700 dark:bg-red-900 dark:text-red-100'
                        }`}>
                        {message}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={isLoading || !stripe || !elements}
                    className="w-full btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <div className="flex items-center justify-center">
                            <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                            Processando...
                        </div>
                    ) : (
                        'Pagar agora'
                    )}
                </button>

                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-4">
                    Pagamento processado de forma segura pela Stripe
                </p>
            </div>

            <div className="mt-6 border-t pt-6 border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                    <span>{formatCurrency(amount)}</span>
                </div>
                <div className="flex items-center justify-between mb-4">
                    <span className="text-gray-600 dark:text-gray-300">Taxa de processamento</span>
                    <span>{formatCurrency(0)}</span>
                </div>
                <div className="flex items-center justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(amount)}</span>
                </div>
            </div>
        </form>
    );
};

export default PaymentForm;
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { CheckCircle2, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function PaymentConfirmationPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [status, setStatus] = useState<'success' | 'error' | 'processing'>('processing');

    useEffect(() => {
        const payment_intent = searchParams.get('payment_intent');
        const payment_intent_client_secret = searchParams.get('payment_intent_client_secret');
        const redirect_status = searchParams.get('redirect_status');

        if (redirect_status === 'succeeded') {
            setStatus('success');
        } else if (redirect_status === 'failed') {
            setStatus('error');
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                {status === 'success' && (
                    <div className="text-center">
                        <CheckCircle2 className="w-16 h-16 text-success mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Pagamento Confirmado!</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Sua reserva foi confirmada e você receberá um e-mail com os detalhes.
                        </p>
                    </div>
                )}

                {status === 'error' && (
                    <div className="text-center">
                        <XCircle className="w-16 h-16 text-danger mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Erro no Pagamento</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Houve um problema ao processar seu pagamento. Por favor, tente novamente.
                        </p>
                    </div>
                )}

                {status === 'processing' && (
                    <div className="text-center">
                        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                        <h1 className="text-2xl font-bold mb-2">Processando Pagamento</h1>
                        <p className="text-gray-600 dark:text-gray-300 mb-6">
                            Por favor, aguarde enquanto confirmamos seu pagamento.
                        </p>
                    </div>
                )}

                <div className="flex justify-center space-x-4">
                    <Link
                        href="/"
                        className="btn btn-outline"
                    >
                        Voltar ao início
                    </Link>
                    {status === 'error' && (
                        <Link
                            href="/payment"
                            className="btn btn-primary"
                        >
                            Tentar novamente
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
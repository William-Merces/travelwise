'use client';

import LoginForm from '@/components/common/auth/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Formulário */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <LoginForm />
            </div>

            {/* Imagem Decorativa */}
            <div className="hidden md:block w-1/2 relative">
                <Image
                    src="/api/placeholder/1000/1000"
                    alt="Viagem dos sonhos"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg max-w-md text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Sua jornada começa aqui
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Faça login para acessar ofertas exclusivas,
                            gerenciar suas reservas e muito mais.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
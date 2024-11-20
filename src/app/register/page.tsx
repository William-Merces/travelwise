'use client';

import RegisterForm from '@/components/common/auth/RegisterForm';
import Image from 'next/image';

export default function RegisterPage() {
    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Imagem Decorativa */}
            <div className="hidden md:block w-1/2 relative">
                <Image
                    src="/api/placeholder/1000/1000"
                    alt="Destinos incríveis"
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm" />
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-lg max-w-md text-center">
                        <h2 className="text-2xl font-bold mb-4">
                            Junte-se a nós
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300">
                            Crie sua conta para descobrir os melhores destinos,
                            preços exclusivos e uma experiência personalizada.
                        </p>
                    </div>
                </div>
            </div>

            {/* Formulário */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8">
                <RegisterForm />
            </div>
        </div>
    );
}
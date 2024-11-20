'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import SocialLogin from './SocialLogin';

const LoginForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            // Em um ambiente real, aqui faria a autenticação
            // Por enquanto, apenas simula o login
            if (formData.email && formData.password) {
                router.push('/');
            } else {
                setError('Por favor, preencha todos os campos');
            }
        } catch (err) {
            setError('Erro ao fazer login. Tente novamente.');
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Bem-vindo ao TravelWise
            </h2>

            <SocialLogin />

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="form-input"
                        placeholder="seu@email.com"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="password" className="form-label">
                        Senha
                    </label>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="form-input pr-10"
                            placeholder="••••••••"
                            required
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="remember"
                            className="h-4 w-4 rounded border-gray-300"
                        />
                        <label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                            Lembrar-me
                        </label>
                    </div>
                    <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                        Esqueceu a senha?
                    </Link>
                </div>

                {error && (
                    <p className="text-sm text-danger text-center">{error}</p>
                )}

                <button type="submit" className="w-full btn btn-primary">
                    Entrar
                </button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Não tem uma conta?{' '}
                    <Link href="/register" className="text-primary hover:underline">
                        Registre-se
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginForm;
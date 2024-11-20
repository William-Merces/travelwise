'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';
import { isValidCPF } from '@/utils/helpers';
import SocialLogin from './SocialLogin';

const RegisterForm = () => {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        cpf: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const validateForm = () => {
        if (!formData.name || !formData.email || !formData.cpf || !formData.password || !formData.confirmPassword) {
            setError('Por favor, preencha todos os campos');
            return false;
        }

        if (!isValidCPF(formData.cpf)) {
            setError('CPF inválido');
            return false;
        }

        if (formData.password.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres');
            return false;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('As senhas não coincidem');
            return false;
        }

        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        try {
            // Em um ambiente real, aqui faria o registro
            // Por enquanto, apenas simula o registro
            router.push('/login');
        } catch (err) {
            setError('Erro ao criar conta. Tente novamente.');
        }
    };

    return (
        <div className="w-full max-w-md p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">
                Crie sua conta TravelWise
            </h2>

            <SocialLogin />

            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
                <div>
                    <label htmlFor="name" className="form-label">
                        Nome completo
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="form-input"
                        placeholder="Seu nome completo"
                        required
                    />
                </div>

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
                    <label htmlFor="cpf" className="form-label">
                        CPF
                    </label>
                    <input
                        type="text"
                        id="cpf"
                        value={formData.cpf}
                        onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                        className="form-input"
                        placeholder="000.000.000-00"
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

                <div>
                    <label htmlFor="confirmPassword" className="form-label">
                        Confirme a senha
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="form-input"
                        placeholder="••••••••"
                        required
                    />
                </div>

                {error && (
                    <p className="text-sm text-danger text-center">{error}</p>
                )}

                <button type="submit" className="w-full btn btn-primary">
                    Criar conta
                </button>

                <p className="text-sm text-center text-gray-600 dark:text-gray-300">
                    Já tem uma conta?{' '}
                    <Link href="/login" className="text-primary hover:underline">
                        Faça login
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default RegisterForm;
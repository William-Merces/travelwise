'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useWeather } from '@/hooks/useWeather';

const Header = () => {
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { user, isAuthenticated, logout } = useAuth();
    const { weather } = useWeather();

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    return (
        <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <nav className="container mx-auto px-4 py-3">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src="/images/logo.svg" alt="TravelWise" width={40} height={40} />
                        <span className="text-xl font-bold text-primary">TravelWise</span>
                    </Link>

                    {/* Weather Widget - Desktop */}
                    <div className="hidden md:flex items-center space-x-2">
                        {weather && (
                            <>
                                <Image
                                    src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                    alt={weather.description}
                                    width={40}
                                    height={40}
                                />
                                <div className="text-sm">
                                    <p className="font-medium">{weather.city}</p>
                                    <p>{Math.round(weather.temp)}°C</p>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-6">
                        <Link href="/flights" className="nav-link">Voos</Link>
                        <Link href="/hotels" className="nav-link">Hotéis</Link>
                        <Link href="/packages" className="nav-link">Pacotes</Link>

                        <button
                            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                        >
                            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                        </button>

                        {isAuthenticated ? (
                            <div className="flex items-center space-x-4">
                                <Link href="/profile">
                                    <Image
                                        src={user?.image || '/images/avatar-placeholder.png'}
                                        alt={user?.name || 'Profile'}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </Link>
                                <button
                                    onClick={() => logout()}
                                    className="text-sm text-red-600 hover:text-red-700"
                                >
                                    Sair
                                </button>
                            </div>
                        ) : (
                            <Link
                                href="/login"
                                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark"
                            >
                                Entrar
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <div className="md:hidden pt-4 pb-3">
                        <div className="flex flex-col space-y-4">
                            <Link href="/flights" className="nav-link">Voos</Link>
                            <Link href="/hotels" className="nav-link">Hotéis</Link>
                            <Link href="/packages" className="nav-link">Pacotes</Link>

                            {/* Weather Widget - Mobile */}
                            {weather && (
                                <div className="flex items-center space-x-2 py-2">
                                    <Image
                                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                                        alt={weather.description}
                                        width={40}
                                        height={40}
                                    />
                                    <div className="text-sm">
                                        <p className="font-medium">{weather.city}</p>
                                        <p>{Math.round(weather.temp)}°C</p>
                                    </div>
                                </div>
                            )}

                            {isAuthenticated ? (
                                <>
                                    <Link href="/profile" className="flex items-center space-x-2">
                                        <Image
                                            src={user?.image || '/images/avatar-placeholder.png'}
                                            alt={user?.name || 'Profile'}
                                            width={32}
                                            height={32}
                                            className="rounded-full"
                                        />
                                        <span>{user?.name}</span>
                                    </Link>
                                    <button
                                        onClick={() => logout()}
                                        className="text-sm text-red-600 hover:text-red-700"
                                    >
                                        Sair
                                    </button>
                                </>
                            ) : (
                                <Link
                                    href="/login"
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark text-center"
                                >
                                    Entrar
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Header;
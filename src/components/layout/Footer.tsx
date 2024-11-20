'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Mail, Phone } from 'lucide-react';
import { useContext } from 'react';
import { SidebarContext } from './Sidebar';

const Footer = () => {
    const { isCollapsed } = useContext(SidebarContext);

    return (
        <footer className="bg-gray-900 text-white">
            <div className={`transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-64'}`}>
                <div className="container mx-auto px-4 py-12">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {/* Sobre */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Sobre a TravelWise</h3>
                            <p className="text-gray-400 text-sm">
                                Sua plataforma completa para planejamento de viagens,
                                oferecendo as melhores ofertas em voos, hotéis e pacotes.
                            </p>
                        </div>

                        {/* Links Rápidos */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Links Rápidos</h3>
                            <nav className="space-y-2">
                                <Link href="/flights" className="block text-gray-400 hover:text-white">Voos</Link>
                                <Link href="/hotels" className="block text-gray-400 hover:text-white">Hotéis</Link>
                                <Link href="/packages" className="block text-gray-400 hover:text-white">Pacotes</Link>
                                <Link href="/profile" className="block text-gray-400 hover:text-white">Minha Conta</Link>
                            </nav>
                        </div>

                        {/* Contato */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Contato</h3>
                            <div className="space-y-2">
                                <p className="flex items-center space-x-2 text-gray-400">
                                    <Phone size={16} />
                                    <span>0800 123 4567</span>
                                </p>
                                <p className="flex items-center space-x-2">
                                    <Mail size={16} />
                                    <a href="mailto:contato@travelwise.com" className="text-gray-400 hover:text-white">
                                        contato@travelwise.com
                                    </a>
                                </p>
                            </div>
                        </div>

                        {/* Redes Sociais */}
                        <div>
                            <h3 className="text-xl font-bold mb-4">Redes Sociais</h3>
                            <div className="flex space-x-6">
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Facebook className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Twitter className="w-6 h-6" />
                                </a>
                                <a href="#" className="text-gray-400 hover:text-white">
                                    <Instagram className="w-6 h-6" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Copyright */}
                    <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                        © {new Date().getFullYear()} TravelWise. Todos os direitos reservados.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
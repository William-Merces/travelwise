'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Booking, Flight, Hotel, TravelPackage } from '@/types';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import {
    User,
    Settings,
    Heart,
    Clock,
    LogOut,
    Plane,
    Building2,
    Package,
    Star,
    Calendar
} from 'lucide-react';

export default function ProfilePage() {
    const router = useRouter();
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'info' | 'bookings' | 'favorites'>('info');
    const [isLoading, setIsLoading] = useState(false);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [favorites, setFavorites] = useState({
        flights: [] as Flight[],
        hotels: [] as Hotel[],
        packages: [] as TravelPackage[]
    });

    if (!user) {
        router.push('/login');
        return null;
    }

    const handleLogout = async () => {
        try {
            await logout();
            router.push('/');
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        }
    };

    const removeFavorite = async (id: string, type: 'flights' | 'hotels' | 'packages') => {
        try {
            await fetch(`/api/favorites/${type}/${id}`, {
                method: 'DELETE'
            });
            setFavorites(prev => ({
                ...prev,
                [type]: prev[type].filter(item => item.id !== id)
            }));
        } catch (error) {
            console.error('Erro ao remover dos favoritos:', error);
        }
    };

    const getBookingStatusColor = (status: string) => {
        const colors = {
            pending: 'bg-yellow-100 text-yellow-800',
            confirmed: 'bg-green-100 text-green-800',
            cancelled: 'bg-red-100 text-red-800'
        };
        return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar do Perfil */}
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-6 space-y-6">
                        {/* Informações do Usuário */}
                        <div className="text-center">
                            <div className="relative mx-auto w-24 h-24 mb-4">
                                <Image
                                    src={user.image || '/images/avatar-placeholder.png'}
                                    alt={user.name}
                                    fill
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <h2 className="text-xl font-semibold">{user.name}</h2>
                            <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                        </div>

                        {/* Menu de Navegação */}
                        <nav className="space-y-2">
                            <button
                                onClick={() => setActiveTab('info')}
                                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'info'
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <User size={20} />
                                <span>Informações Pessoais</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('bookings')}
                                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'bookings'
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <Clock size={20} />
                                <span>Minhas Reservas</span>
                            </button>
                            <button
                                onClick={() => setActiveTab('favorites')}
                                className={`w-full flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${activeTab === 'favorites'
                                    ? 'bg-primary text-white'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                                    }`}
                            >
                                <Heart size={20} />
                                <span>Favoritos</span>
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center space-x-2 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-md transition-colors"
                            >
                                <LogOut size={20} />
                                <span>Sair</span>
                            </button>
                        </nav>
                    </div>
                </aside>

                {/* Conteúdo Principal */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow">
                        {/* Informações Pessoais */}
                        {activeTab === 'info' && (
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-6">Informações Pessoais</h3>
                                <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Nome</label>
                                            <input
                                                type="text"
                                                value={user.name}
                                                className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800"
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium mb-1">Email</label>
                                            <input
                                                type="email"
                                                value={user.email}
                                                className="w-full px-3 py-2 border rounded-md bg-gray-50 dark:bg-gray-800"
                                                readOnly
                                            />
                                        </div>
                                    </div>
                                    <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                                        <Settings size={20} />
                                        <span>Editar Perfil</span>
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Reservas */}
                        {activeTab === 'bookings' && (
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-6">Minhas Reservas</h3>
                                {isLoading ? (
                                    <div className="flex justify-center p-8">
                                        <LoadingSpinner />
                                    </div>
                                ) : bookings.length === 0 ? (
                                    <div className="text-center py-8">
                                        <Clock className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Nenhuma reserva encontrada
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Você ainda não fez nenhuma reserva
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {bookings.map((booking) => (
                                            <div
                                                key={booking.id}
                                                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex items-center justify-between mb-4">
                                                    <div className="flex items-center space-x-3">
                                                        {booking.type === 'flight' && <Plane className="h-5 w-5 text-primary" />}
                                                        {booking.type === 'hotel' && <Building2 className="h-5 w-5 text-primary" />}
                                                        {booking.type === 'package' && <Package className="h-5 w-5 text-primary" />}
                                                        <span className="font-medium capitalize">Reserva de {booking.type}</span>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-sm ${getBookingStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div>
                                                        <span className="block text-gray-600 dark:text-gray-400">Data da Reserva</span>
                                                        <span>{new Date(booking.bookingDate).toLocaleDateString()}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-gray-600 dark:text-gray-400">Valor Total</span>
                                                        <span>R$ {booking.totalPrice.toFixed(2)}</span>
                                                    </div>
                                                    <div>
                                                        <span className="block text-gray-600 dark:text-gray-400">Status do Pagamento</span>
                                                        <span className="capitalize">{booking.paymentStatus}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Favoritos */}
                        {activeTab === 'favorites' && (
                            <div className="p-6">
                                <h3 className="text-xl font-semibold mb-6">Meus Favoritos</h3>
                                <div className="space-y-6">
                                    {/* Voos Favoritos */}
                                    <div>
                                        <h4 className="text-lg font-medium mb-4">Voos</h4>
                                        {favorites.flights.length === 0 ? (
                                            <p className="text-gray-600 dark:text-gray-400">Nenhum voo favoritado</p>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-4">
                                                {favorites.flights.map((flight) => (
                                                    <div
                                                        key={flight.id}
                                                        className="border rounded-lg p-4 flex justify-between items-center"
                                                    >
                                                        <div>
                                                            <p className="font-medium">{flight.airline}</p>
                                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                {flight.origin} → {flight.destination}
                                                            </p>
                                                        </div>
                                                        <button
                                                            onClick={() => removeFavorite(flight.id, 'flights')}
                                                            className="text-red-600 hover:text-red-700"
                                                        >
                                                            <Heart className="h-5 w-5 fill-current" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Hotéis Favoritos */}
                                    <div>
                                        <h4 className="text-lg font-medium mb-4">Hotéis</h4>
                                        {favorites.hotels.length === 0 ? (
                                            <p className="text-gray-600 dark:text-gray-400">Nenhum hotel favoritado</p>
                                        ) : (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {favorites.hotels.map((hotel) => (
                                                    <div
                                                        key={hotel.id}
                                                        className="border rounded-lg p-4"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <p className="font-medium">{hotel.name}</p>
                                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                                    {hotel.location}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFavorite(hotel.id, 'hotels')}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Heart className="h-5 w-5 fill-current" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center space-x-2">
                                                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                                                            <span>{hotel.rating}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* Pacotes Favoritos */}
                                    <div>
                                        <h4 className="text-lg font-medium mb-4">Pacotes</h4>
                                        {favorites.packages.length === 0 ? (
                                            <p className="text-gray-600 dark:text-gray-400">Nenhum pacote favoritado</p>
                                        ) : (
                                            <div className="grid grid-cols-1 gap-4">
                                                {favorites.packages.map((pkg) => (
                                                    <div
                                                        key={pkg.id}
                                                        className="border rounded-lg p-4"
                                                    >
                                                        <div className="flex justify-between items-start mb-2">
                                                            <div>
                                                                <p className="font-medium">{pkg.name}</p>
                                                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                                                    <span>{pkg.flight.origin} → {pkg.flight.destination}</span>
                                                                    <span>•</span>
                                                                    <span>{pkg.hotel.name}</span>
                                                                </div>
                                                            </div>
                                                            <button
                                                                onClick={() => removeFavorite(pkg.id, 'packages')}
                                                                className="text-red-600 hover:text-red-700"
                                                            >
                                                                <Heart className="h-5 w-5 fill-current" />
                                                            </button>
                                                        </div>
                                                        <div className="flex items-center justify-between mt-2">
                                                            <span className="text-primary font-medium">
                                                                R$ {pkg.price.toFixed(2)}
                                                            </span>
                                                            <span className="text-green-600 text-sm">
                                                                Economia de R$ {pkg.savings.toFixed(2)}
                                                            </span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {/* Modais de Confirmação */}
            {/* Modal de Logout */}
            <div id="logout-modal" className="hidden">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4">
                        <h4 className="text-xl font-semibold mb-4">Confirmar Saída</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Tem certeza que deseja sair da sua conta?
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => document.getElementById('logout-modal')?.classList.add('hidden')}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Confirmar
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Cancelamento de Reserva */}
            <div id="cancel-booking-modal" className="hidden">
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-sm w-full mx-4">
                        <h4 className="text-xl font-semibold mb-4">Cancelar Reserva</h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Tem certeza que deseja cancelar esta reserva? Esta ação não pode ser desfeita.
                        </p>
                        <div className="flex justify-end space-x-4">
                            <button
                                onClick={() => document.getElementById('cancel-booking-modal')?.classList.add('hidden')}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                            >
                                Voltar
                            </button>
                            <button
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                            >
                                Cancelar Reserva
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
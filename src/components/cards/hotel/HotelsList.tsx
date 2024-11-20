'use client';

import { Hotel } from '@/types';
import HotelCard from './HotelCard';

interface HotelsListProps {
    hotels: Hotel[];
    showFavoriteButton?: boolean;
}

export default function HotelsList({ hotels, showFavoriteButton }: HotelsListProps) {
    if (hotels.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Nenhum hotel encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Tente ajustar seus filtros ou alterar as datas da viagem
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {hotels.length} {hotels.length === 1 ? 'hotel encontrado' : 'hotéis encontrados'}
                </h2>
                <div className="flex items-center space-x-4">
                    <select
                        className="border rounded-md px-3 py-2 bg-white dark:bg-gray-900"
                        defaultValue="price"
                    >
                        <option value="price">Ordenar por preço</option>
                        <option value="rating">Ordenar por avaliação</option>
                        <option value="name">Ordenar por nome</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {hotels.map((hotel) => (
                    <HotelCard
                        key={hotel.id}
                        hotel={hotel}
                        showFavoriteButton={showFavoriteButton}
                    />
                ))}
            </div>

            {hotels.length > 12 && (
                <div className="flex justify-center mt-6">
                    <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                        Carregar mais hotéis
                    </button>
                </div>
            )}
        </div>
    );
}
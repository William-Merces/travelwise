'use client';

import { Flight } from '@/types';
import FlightCard from './FlightCard';

interface FlightsListProps {
    flights: Flight[];
    showFavoriteButton?: boolean;
}

export default function FlightsList({ flights, showFavoriteButton }: FlightsListProps) {
    if (flights.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Nenhum voo encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Tente ajustar seus filtros ou alterar as datas de viagem
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {flights.length} {flights.length === 1 ? 'voo encontrado' : 'voos encontrados'}
                </h2>
                <div className="flex items-center space-x-4">
                    <select
                        className="border rounded-md px-3 py-2 bg-white dark:bg-gray-900"
                        defaultValue="price"
                    >
                        <option value="price">Ordenar por preço</option>
                        <option value="duration">Ordenar por duração</option>
                        <option value="departure">Ordenar por horário de partida</option>
                        <option value="airline">Ordenar por companhia</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {flights.map((flight) => (
                    <FlightCard
                        key={flight.id}
                        flight={flight}
                        showFavoriteButton={showFavoriteButton}
                    />
                ))}
            </div>

            {flights.length > 10 && (
                <div className="flex justify-center mt-6">
                    <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                        Carregar mais voos
                    </button>
                </div>
            )}
        </div>
    );
}
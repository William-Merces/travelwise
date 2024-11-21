// src/app/flights/page.tsx
'use client';

import { useState } from 'react';
import { Flight, SearchFormData, FlightFilters } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import FlightSearchForm from '@/components/forms/flight/FlightSearchForm';
import FlightFilterForm from '@/components/forms/flight/FlightFilterForm';
import FlightsList from '@/components/cards/flight/FlightsList';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function FlightsPage() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [filters, setFilters] = useState<FlightFilters>({
        priceRange: [0, 5000],
        airlines: [],
        stops: 'any'
    });

    const handleSearch = async (searchData: SearchFormData) => {
        try {
            setIsLoading(true);

            const queryParams = new URLSearchParams({
                origin: searchData.origin,
                destination: searchData.destination,
                checkIn: searchData.checkIn.toISOString().split('T')[0],
                passengers: searchData.passengers.toString()
            });

            if (searchData.checkOut) {
                queryParams.append('checkOut', searchData.checkOut.toISOString().split('T')[0]);
            }

            const response = await fetch(`/api/flights?${queryParams}`);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            if (data.error) {
                throw new Error(data.error);
            }

            setFlights(data);
        } catch (error) {
            console.error('Error searching flights:', error);
            alert('Erro ao buscar voos. Por favor, tente novamente.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilters: FlightFilters) => {
        setFilters(newFilters);
        // Implementar lógica de filtro aqui
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Encontre seu Voo</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                        <FlightFilterForm
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                </aside>

                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
                        <FlightSearchForm onSearch={handleSearch} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <LoadingSpinner />
                        </div>
                    ) : flights.length > 0 ? (
                        <FlightsList
                            flights={flights}
                            showFavoriteButton={!!user}
                        />
                    ) : (
                        <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow">
                            <p className="text-gray-600 dark:text-gray-400">
                                Nenhum voo encontrado
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                Tente ajustar seus filtros ou alterar as datas de viagem
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
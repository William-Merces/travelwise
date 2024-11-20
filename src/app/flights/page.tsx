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
            console.log('Search Data:', searchData); // Debug log

            const queryParams = new URLSearchParams({
                origin: searchData.origin || '',
                destination: searchData.destination || '',
                date: searchData.checkIn.toISOString().split('T')[0]
            });

            console.log('API URL:', `/api/flights?${queryParams}`); // Debug log

            const response = await fetch(`/api/flights?${queryParams}`);
            console.log('Response status:', response.status); // Debug log

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log('Response data:', data); // Debug log
            setFlights(data);
        } catch (error) {
            console.error('Error searching flights:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilters: FlightFilters) => {
        setFilters(newFilters);
        // Apply filters to current flight list
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Encontre seu Voo</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                        <FlightFilterForm
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                </aside>

                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
                        <FlightSearchForm onSearch={handleSearch} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <FlightsList
                            flights={flights}
                            showFavoriteButton={!!user}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
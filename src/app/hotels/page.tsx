'use client';

import { useState } from 'react';
import { Hotel, SearchFormData, HotelFilters } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import HotelSearchForm from '@/components/forms/hotel/HotelSearchForm';
import HotelFilterForm from '@/components/forms/hotel/HotelFilterForm';
import HotelsList from '@/components/cards/hotel/HotelsList';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import WeatherWidget from '@/components/common/weather/WeatherWidget';

export default function HotelsPage() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [originalHotels, setOriginalHotels] = useState<Hotel[]>([]);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [selectedLocation, setSelectedLocation] = useState('');
    const [filters, setFilters] = useState<HotelFilters>({
        priceRange: [0, 2000],
        rating: 0,
        amenities: []
    });

    const handleSearch = async (searchData: SearchFormData) => {
        try {
            setIsLoading(true);
            setSelectedLocation(searchData.destination);

            const params = new URLSearchParams({
                destination: searchData.destination,
                checkIn: searchData.checkIn.toISOString().split('T')[0],
                checkOut: (searchData.checkOut || searchData.checkIn).toISOString().split('T')[0]
            });

            console.log('Fazendo busca com parâmetros:', params.toString());

            const response = await fetch(`/api/hotels?${params}`);
            const data = await response.json();

            if (!response.ok) {
                console.error('Erro na API:', data);
                setOriginalHotels([]);
                setFilteredHotels([]);
                return;
            }

            if (Array.isArray(data)) {
                if (data.length === 0) {
                    console.log('Nenhum hotel encontrado para os critérios de busca');
                }
                setOriginalHotels(data);
                setFilteredHotels(data);
            } else {
                console.error('Formato de resposta inesperado:', data);
                setOriginalHotels([]);
                setFilteredHotels([]);
            }
        } catch (error) {
            console.error('Erro ao buscar hotéis:', error);
            setOriginalHotels([]);
            setFilteredHotels([]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilters: HotelFilters) => {
        setFilters(newFilters);
        
        const filtered = originalHotels.filter(hotel => {
            const priceInRange = hotel.price >= newFilters.priceRange[0] && 
                               hotel.price <= newFilters.priceRange[1];
            const meetsRating = hotel.rating >= newFilters.rating;
            const hasAmenities = newFilters.amenities.length === 0 || 
                               newFilters.amenities.every(amenity => 
                                   hotel.amenities.includes(amenity));
            
            return priceInRange && meetsRating && hasAmenities;
        });
        
        setFilteredHotels(filtered);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Encontre sua Hospedagem</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar com filtros */}
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-4">
                        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                        <HotelFilterForm
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>

                    {selectedLocation && (
                        <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                            <WeatherWidget location={selectedLocation} />
                        </div>
                    )}
                </aside>

                {/* Conteúdo principal */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
                        <HotelSearchForm onSearch={handleSearch} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <HotelsList
                            hotels={filteredHotels}
                            showFavoriteButton={!!user}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
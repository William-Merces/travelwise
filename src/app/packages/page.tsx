'use client';

import { useState } from 'react';
import { TravelPackage, SearchFormData, PackageFilters } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import PackageSearchForm from '@/components/forms/package/PackageSearchForm';
import PackageFilterForm from '@/components/forms/package/PackageFilterForm';
import PackagesList from '@/components/cards/package/PackagesList';
import LoadingSpinner from '@/components/common/LoadingSpinner';

export default function PackagesPage() {
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [packages, setPackages] = useState<TravelPackage[]>([]);
    const [filters, setFilters] = useState<PackageFilters>({
        priceRange: [0, 10000],
        duration: 7,
        activities: []
    });

    const handleSearch = async (searchData: SearchFormData) => {
        try {
            setIsLoading(true);
            const response = await fetch('/api/packages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(searchData)
            });

            if (!response.ok) throw new Error('Failed to fetch packages');

            const data = await response.json();
            setPackages(data);
        } catch (error) {
            console.error('Error searching packages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilterChange = (newFilters: PackageFilters) => {
        setFilters(newFilters);
        // Aplicar filtros à lista atual de pacotes
        // A implementação depende da sua lógica de filtragem
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Encontre seu Pacote de Viagem</h1>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Sidebar com filtros */}
                <aside className="lg:col-span-1">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4">
                        <h2 className="text-xl font-semibold mb-4">Filtros</h2>
                        <PackageFilterForm
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                </aside>

                {/* Conteúdo principal */}
                <div className="lg:col-span-3">
                    <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-4 mb-6">
                        <PackageSearchForm onSearch={handleSearch} />
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center p-8">
                            <LoadingSpinner />
                        </div>
                    ) : (
                        <PackagesList
                            packages={packages}
                            showFavoriteButton={!!user}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
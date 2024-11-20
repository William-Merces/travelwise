'use client';

import { useState, useEffect } from 'react';
import { Filter, ArrowUpDown } from 'lucide-react';
import LoadingSpinner from '../LoadingSpinner';
import FlightCard from '@/components/cards/flight/FlightCard';
import HotelCard from '@/components/cards/hotel/HotelCard';
import PackageCard from '@/components/cards/package/PackageCard';

interface SearchResultsProps {
    type: 'flights' | 'hotels' | 'packages';
    results: any[];
    loading?: boolean;
    error?: string;
    onSort?: (sortBy: string) => void;
    onFilter?: (filters: any) => void;
}

const SearchResults = ({
    type,
    results,
    loading = false,
    error = '',
    onSort,
    onFilter
}: SearchResultsProps) => {
    const [sortBy, setSortBy] = useState('price');
    const [showFilters, setShowFilters] = useState(false);
    const [filters, setFilters] = useState({
        minPrice: '',
        maxPrice: '',
        rating: '',
        stops: 'all' // para voos
    });

    useEffect(() => {
        if (onFilter) {
            onFilter(filters);
        }
    }, [filters, onFilter]);

    const handleSort = (newSortBy: string) => {
        setSortBy(newSortBy);
        if (onSort) {
            onSort(newSortBy);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <LoadingSpinner size="large" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8">
                <p className="text-danger">{error}</p>
            </div>
        );
    }

    if (results.length === 0) {
        return (
            <div className="text-center p-8">
                <p className="text-gray-500 dark:text-gray-400">
                    Nenhum resultado encontrado. Tente ajustar seus filtros.
                </p>
            </div>
        );
    }

    return (
        <div>
            {/* Controles */}
            <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="btn btn-outline flex items-center space-x-2"
                    >
                        <Filter size={18} />
                        <span>Filtros</span>
                    </button>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {results.length} {type === 'flights' ? 'voos' : type === 'hotels' ? 'hotéis' : 'pacotes'} encontrados
                    </span>
                </div>

                <div className="flex items-center space-x-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">Ordenar por:</span>
                    <select
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                        className="form-input py-1"
                    >
                        <option value="price">Preço</option>
                        <option value="rating">Avaliação</option>
                        {type === 'flights' && <option value="duration">Duração</option>}
                    </select>
                </div>
            </div>

            {/* Filtros */}
            {showFilters && (
                <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="form-label">Preço mínimo</label>
                            <input
                                type="number"
                                value={filters.minPrice}
                                onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
                                className="form-input"
                                placeholder="R$ Min"
                            />
                        </div>
                        <div>
                            <label className="form-label">Preço máximo</label>
                            <input
                                type="number"
                                value={filters.maxPrice}
                                onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
                                className="form-input"
                                placeholder="R$ Max"
                            />
                        </div>
                        {type !== 'flights' && (
                            <div>
                                <label className="form-label">Avaliação mínima</label>
                                <select
                                    value={filters.rating}
                                    onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
                                    className="form-input"
                                >
                                    <option value="">Qualquer</option>
                                    <option value="3">3+ estrelas</option>
                                    <option value="4">4+ estrelas</option>
                                    <option value="5">5 estrelas</option>
                                </select>
                            </div>
                        )}
                        {type === 'flights' && (
                            <div>
                                <label className="form-label">Paradas</label>
                                <select
                                    value={filters.stops}
                                    onChange={(e) => setFilters({ ...filters, stops: e.target.value })}
                                    className="form-input"
                                >
                                    <option value="all">Todas</option>
                                    <option value="0">Sem paradas</option>
                                    <option value="1">1 parada</option>
                                    <option value="2">2+ paradas</option>
                                </select>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Lista de Resultados */}
            <div className="space-y-4">
                {results.map((result) => {
                    switch (type) {
                        case 'flights':
                            return <FlightCard key={result.id} flight={result} />;
                        case 'hotels':
                            return <HotelCard key={result.id} hotel={result} />;
                        case 'packages':
                            return <PackageCard key={result.id} package={result} />;
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default SearchResults;
'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Calendar, Users, Map } from 'lucide-react';
import { useRouter } from 'next/navigation';
import LocationPicker from '../map/LocationPicker';
import { formatDate } from '@/utils/helpers';

interface SearchBarProps {
    type: 'flights' | 'hotels' | 'packages';
    onSearch?: (searchParams: any) => void;
    className?: string;
}

const SearchBar = ({ type, onSearch, className = '' }: SearchBarProps) => {
    const router = useRouter();
    const [isExpanded, setIsExpanded] = useState(false);
    const [showLocationPicker, setShowLocationPicker] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const [searchParams, setSearchParams] = useState({
        origin: '',
        destination: '',
        checkIn: '',
        checkOut: '',
        passengers: 1,
        rooms: 1,
    });

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setIsExpanded(false);
                setShowLocationPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleLocationSelect = (location: { coordinates: [number, number]; placeName: string }, field: 'origin' | 'destination') => {
        setSearchParams(prev => ({
            ...prev,
            [field]: location.placeName
        }));
        setShowLocationPicker(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        if (onSearch) {
            onSearch(searchParams);
        } else {
            const queryParams = new URLSearchParams();
            Object.entries(searchParams).forEach(([key, value]) => {
                if (value) queryParams.append(key, value.toString());
            });

            router.push(`/${type}?${queryParams.toString()}`);
        }

        setIsExpanded(false);
    };

    return (
        <div ref={searchRef} className={`relative ${className}`}>
            {/* Barra de busca compacta */}
            {!isExpanded && (
                <div
                    onClick={() => setIsExpanded(true)}
                    className="cursor-pointer bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center space-x-4"
                >
                    <Search className="text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-400">
                        {type === 'flights' && 'Para onde você quer voar?'}
                        {type === 'hotels' && 'Onde você quer se hospedar?'}
                        {type === 'packages' && 'Qual será seu próximo destino?'}
                    </span>
                </div>
            )}

            {/* Formulário expandido */}
            {isExpanded && (
                <form
                    onSubmit={handleSearch}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-4"
                >
                    {type === 'flights' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="form-label">Origem</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchParams.origin}
                                        onChange={(e) => setSearchParams({ ...searchParams, origin: e.target.value })}
                                        placeholder="De onde você vai sair?"
                                        className="form-input pl-10"
                                    />
                                    <Map
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                                        onClick={() => setShowLocationPicker(true)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Destino</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchParams.destination}
                                        onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                        placeholder="Para onde você vai?"
                                        className="form-input pl-10"
                                    />
                                    <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    )}

                    {(type === 'hotels' || type === 'packages') && (
                        <div>
                            <label className="form-label">Destino</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchParams.destination}
                                    onChange={(e) => setSearchParams({ ...searchParams, destination: e.target.value })}
                                    placeholder="Para onde você vai?"
                                    className="form-input pl-10"
                                />
                                <Map
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 cursor-pointer"
                                    onClick={() => setShowLocationPicker(true)}
                                />
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Check-in</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={searchParams.checkIn}
                                    onChange={(e) => setSearchParams({ ...searchParams, checkIn: e.target.value })}
                                    className="form-input pl-10"
                                    min={formatDate(new Date())}
                                />
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Check-out</label>
                            <div className="relative">
                                <input
                                    type="date"
                                    value={searchParams.checkOut}
                                    onChange={(e) => setSearchParams({ ...searchParams, checkOut: e.target.value })}
                                    className="form-input pl-10"
                                    min={searchParams.checkIn}
                                />
                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Passageiros</label>
                            <div className="relative">
                                <input
                                    type="number"
                                    value={searchParams.passengers}
                                    onChange={(e) => setSearchParams({ ...searchParams, passengers: Number(e.target.value) })}
                                    min="1"
                                    className="form-input pl-10"
                                />
                                <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                            </div>
                        </div>
                        {(type === 'hotels' || type === 'packages') && (
                            <div>
                                <label className="form-label">Quartos</label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        value={searchParams.rooms}
                                        onChange={(e) => setSearchParams({ ...searchParams, rooms: Number(e.target.value) })}
                                        min="1"
                                        className="form-input pl-10"
                                    />
                                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="btn btn-outline"
                        >
                            Cancelar
                        </button>
                        <button type="submit" className="btn btn-primary">
                            Buscar
                        </button>
                    </div>
                </form>
            )}

            {/* Location Picker Modal */}
            {showLocationPicker && (
                <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">Selecionar localização</h3>
                        <button
                            onClick={() => setShowLocationPicker(false)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <LocationPicker
                        onSelect={(location) => handleLocationSelect(location, type === 'flights' ? 'origin' : 'destination')}
                        placeholder="Digite o nome da cidade"
                    />
                </div>
            )}
        </div>
    );
};

export default SearchBar;
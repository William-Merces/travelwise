'use client';

import { useState, useCallback } from 'react';
import { SearchFormData } from '@/types';
import { Calendar, Users, Map } from 'lucide-react';
import { getLocationSuggestions } from '@/services/flight-api';

interface LocationSuggestion {
    name: string;
    iata: string;
    type: string;
}

export default function FlightSearchForm({ onSearch }: { onSearch: (data: SearchFormData) => void }) {
    const [searchData, setSearchData] = useState<SearchFormData>({
        origin: '',
        destination: '',
        checkIn: new Date(),
        checkOut: undefined,
        passengers: 1
    });

    const [suggestions, setSuggestions] = useState<LocationSuggestion[]>([]);
    const [currentField, setCurrentField] = useState<'origin' | 'destination' | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleLocationSearch = useCallback(async (query: string) => {
        if (!query || query.length < 2) {
            setSuggestions([]);
            return;
        }

        setIsLoading(true);
        try {
            const results = await getLocationSuggestions(query);
            setSuggestions(results);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const handleInputChange = async (value: string, field: 'origin' | 'destination') => {
        setSearchData(prev => ({ ...prev, [field]: value }));
        setCurrentField(field);
        await handleLocationSearch(value);
    };

    const handleSuggestionSelect = (suggestion: LocationSuggestion) => {
        if (!currentField) return;
        
        setSearchData(prev => ({
            ...prev,
            [currentField]: suggestion.name
        }));
        setSuggestions([]);
        setCurrentField(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!searchData.origin || !searchData.destination) {
            alert('Por favor, selecione origem e destino');
            return;
        }
        onSearch(searchData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white rounded-lg shadow">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Origin Field */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchData.origin}
                            onChange={e => handleInputChange(e.target.value, 'origin')}
                            onFocus={() => setCurrentField('origin')}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="De onde você vai sair?"
                        />
                        <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {currentField === 'origin' && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionSelect(suggestion)}
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Destination Field */}
                <div className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={searchData.destination}
                            onChange={e => handleInputChange(e.target.value, 'destination')}
                            onFocus={() => setCurrentField('destination')}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Para onde você vai?"
                        />
                        <Map className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                    {currentField === 'destination' && suggestions.length > 0 && (
                        <ul className="absolute z-10 w-full bg-white border rounded-md mt-1 max-h-60 overflow-auto shadow-lg">
                            {suggestions.map((suggestion, index) => (
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleSuggestionSelect(suggestion)}
                                >
                                    {suggestion.name}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            {/* Date Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Data de ida</label>
                    <div className="relative">
                        <input
                            type="date"
                            value={searchData.checkIn.toISOString().split('T')[0]}
                            onChange={(e) => setSearchData(prev => ({
                                ...prev,
                                checkIn: new Date(e.target.value)
                            }))}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Data de volta
                        <span className="text-xs text-gray-500 ml-1">(opcional)</span>
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={searchData.checkOut?.toISOString().split('T')[0] || ''}
                            onChange={(e) => setSearchData(prev => ({
                                ...prev,
                                checkOut: e.target.value ? new Date(e.target.value) : undefined
                            }))}
                            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            min={searchData.checkIn.toISOString().split('T')[0]}
                        />
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    </div>
                </div>
            </div>

            {/* Passengers Field */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Passageiros</label>
                <div className="relative">
                    <input
                        type="number"
                        min="1"
                        max="9"
                        value={searchData.passengers}
                        onChange={(e) => setSearchData(prev => ({
                            ...prev,
                            passengers: Math.min(9, Math.max(1, parseInt(e.target.value) || 1))
                        }))}
                        className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                disabled={isLoading}
            >
                {isLoading ? 'Buscando...' : 'Buscar Voos'}
            </button>
        </form>
    );
}
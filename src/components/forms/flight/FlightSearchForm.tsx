'use client';

import { useState } from 'react';
import { SearchFormData } from '@/types';
import { Calendar } from 'lucide-react';
import LocationPicker from '@/components/common/map/LocationPicker';

interface FlightSearchFormProps {
    onSearch: (data: SearchFormData) => void;
}

export default function FlightSearchForm({ onSearch }: FlightSearchFormProps) {
    const [searchData, setSearchData] = useState<SearchFormData>({
        origin: '',
        destination: '',
        checkIn: new Date(),
        checkOut: undefined,
        passengers: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Origem</label>
                    <LocationPicker
                        initialValue={searchData.origin}
                        onSelect={(location) =>
                            setSearchData(prev => ({ ...prev, origin: location.placeName }))}
                        placeholder="Selecione a origem"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Destino</label>
                    <LocationPicker
                        initialValue={searchData.destination}
                        onSelect={(location) =>
                            setSearchData(prev => ({ ...prev, destination: location.placeName }))}
                        placeholder="Selecione o destino"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Data de ida
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={searchData.checkIn.toISOString().split('T')[0]}
                            onChange={(e) =>
                                setSearchData(prev => ({
                                    ...prev,
                                    checkIn: new Date(e.target.value)
                                }))}
                            className="w-full px-3 py-2 border rounded-md"
                            min={new Date().toISOString().split('T')[0]}
                        />
                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Data de volta
                    </label>
                    <div className="relative">
                        <input
                            type="date"
                            value={searchData.checkOut?.toISOString().split('T')[0] || ''}
                            onChange={(e) =>
                                setSearchData(prev => ({
                                    ...prev,
                                    checkOut: e.target.value ? new Date(e.target.value) : undefined
                                }))}
                            className="w-full px-3 py-2 border rounded-md"
                            min={searchData.checkIn.toISOString().split('T')[0]}
                        />
                        <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">
                        Passageiros
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="9"
                        value={searchData.passengers}
                        onChange={(e) =>
                            setSearchData(prev => ({
                                ...prev,
                                passengers: parseInt(e.target.value)
                            }))}
                        className="w-full px-3 py-2 border rounded-md"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
                Buscar Voos
            </button>
        </form>
    );
}
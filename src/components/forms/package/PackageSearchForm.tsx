'use client';

import { useState } from 'react';
import { SearchFormData } from '@/types';
import { Calendar, Users, Map } from 'lucide-react';
import LocationPicker from '@/components/common/map/LocationPicker';

interface PackageSearchFormProps {
    onSearch: (data: SearchFormData) => void;
}

export default function PackageSearchForm({ onSearch }: PackageSearchFormProps) {
    const [searchData, setSearchData] = useState<SearchFormData>({
        origin: '',
        destination: '',
        checkIn: new Date(),
        checkOut: new Date(new Date().setDate(new Date().getDate() + 7)),
        passengers: 2,
        rooms: 1
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Saindo de</label>
                    <LocationPicker
                        initialValue={searchData.origin}
                        onSelect={(location) =>
                            setSearchData(prev => ({ ...prev, origin: location.placeName }))}
                        placeholder="De onde você vai sair?"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Indo para</label>
                    <LocationPicker
                        initialValue={searchData.destination}
                        onSelect={(location) =>
                            setSearchData(prev => ({ ...prev, destination: location.placeName }))}
                        placeholder="Para onde você quer ir?"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Ida</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={searchData.checkIn.toISOString().split('T')[0]}
                                onChange={(e) =>
                                    setSearchData(prev => ({
                                        ...prev,
                                        checkIn: new Date(e.target.value)
                                    }))}
                                className="w-full px-3 py-2 border rounded-md pr-10"
                                min={new Date().toISOString().split('T')[0]}
                            />
                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Volta</label>
                        <div className="relative">
                            <input
                                type="date"
                                value={searchData.checkOut?.toISOString().split('T')[0]}
                                onChange={(e) =>
                                    setSearchData(prev => ({
                                        ...prev,
                                        checkOut: new Date(e.target.value)
                                    }))}
                                className="w-full px-3 py-2 border rounded-md pr-10"
                                min={searchData.checkIn.toISOString().split('T')[0]}
                            />
                            <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Viajantes</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                max="10"
                                value={searchData.passengers}
                                onChange={(e) =>
                                    setSearchData(prev => ({
                                        ...prev,
                                        passengers: parseInt(e.target.value)
                                    }))}
                                className="w-full px-3 py-2 border rounded-md pr-10"
                            />
                            <Users className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">Quartos</label>
                        <div className="relative">
                            <input
                                type="number"
                                min="1"
                                max="5"
                                value={searchData.rooms}
                                onChange={(e) =>
                                    setSearchData(prev => ({
                                        ...prev,
                                        rooms: parseInt(e.target.value)
                                    }))}
                                className="w-full px-3 py-2 border rounded-md pr-10"
                            />
                            <Map className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                    </div>
                </div>
            </div>

            <button
                type="submit"
                className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors"
            >
                Buscar Pacotes
            </button>
        </form>
    );
}
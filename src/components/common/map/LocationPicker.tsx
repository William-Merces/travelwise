'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X } from 'lucide-react';
import { searchLocation } from '@/services/mapbox';
import MapView from './MapView';
import LoadingSpinner from '../LoadingSpinner';

interface LocationPickerProps {
    onSelect: (location: {
        coordinates: [number, number];
        placeName: string;
    }) => void;
    initialValue?: string;
    placeholder?: string;
    className?: string;
}

interface SearchResult {
    center: [number, number];
    place_name: string;
}

const LocationPicker = ({
    onSelect,
    initialValue = '',
    placeholder = 'Buscar localização...',
    className = ''
}: LocationPickerProps) => {
    const [query, setQuery] = useState(initialValue);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<SearchResult | null>(null);
    const searchTimeout = useRef<NodeJS.Timeout>();
    const wrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = async (searchQuery: string) => {
        setQuery(searchQuery);

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (searchQuery.length < 3) {
            setResults([]);
            setShowResults(false);
            return;
        }

        searchTimeout.current = setTimeout(async () => {
            try {
                setLoading(true);
                const searchResults = await searchLocation(searchQuery);
                setResults(searchResults);
                setShowResults(true);
            } catch (error) {
                console.error('Error searching location:', error);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleSelectLocation = (location: SearchResult) => {
        setSelectedLocation(location);
        setQuery(location.place_name);
        setShowResults(false);
        onSelect({
            coordinates: location.center,
            placeName: location.place_name
        });
    };

    const clearSelection = () => {
        setSelectedLocation(null);
        setQuery('');
        setResults([]);
        onSelect({
            coordinates: [-51.92528, -14.235004], // Centro do Brasil
            placeName: ''
        });
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="relative">
                <div className="relative">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => handleSearch(e.target.value)}
                        placeholder={placeholder}
                        className="form-input pl-10 pr-10 w-full"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    {query && (
                        <button
                            onClick={clearSelection}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {showResults && (results.length > 0 || loading) && (
                    <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
                        {loading ? (
                            <div className="p-4 flex justify-center">
                                <LoadingSpinner size="small" />
                            </div>
                        ) : (
                            <ul className="py-1">
                                {results.map((result, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handleSelectLocation(result)}
                                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                                        >
                                            <MapPin className="w-4 h-4 text-gray-400" />
                                            <span>{result.place_name}</span>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                )}
            </div>

            {selectedLocation && (
                <div className="mt-4">
                    <MapView
                        center={selectedLocation.center}
                        zoom={12}
                        markers={[
                            {
                                id: '1',
                                coordinates: selectedLocation.center,
                                title: selectedLocation.place_name
                            }
                        ]}
                        className="h-[300px]"
                    />
                </div>
            )}
        </div>
    );
};

export default LocationPicker;
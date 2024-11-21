'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, X, Plane } from 'lucide-react';
import { searchLocation } from '@/services/mapbox';
import { getLocationSuggestions } from '@/services/flight-api';
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
    mode?: 'general' | 'flight';
}

interface SearchResult {
    center: [number, number];
    place_name: string;
}

interface FlightLocation {
    name: string;
    iata: string;
    type: string;
}

export default function LocationPicker({
    onSelect,
    initialValue = '',
    placeholder = 'Buscar localização...',
    className = '',
    mode = 'general'
}: LocationPickerProps) {
    const [query, setQuery] = useState(initialValue);
    const [results, setResults] = useState<SearchResult[]>([]);
    const [flightResults, setFlightResults] = useState<FlightLocation[]>([]);
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
        console.log('Searching for:', searchQuery); // Debug log

        if (searchTimeout.current) {
            clearTimeout(searchTimeout.current);
        }

        if (searchQuery.length < 3) {
            setResults([]);
            setFlightResults([]);
            setShowResults(false);
            return;
        }

        searchTimeout.current = setTimeout(async () => {
            setLoading(true);
            try {
                if (mode === 'flight') {
                    console.log('Fetching flight locations...'); // Debug log
                    const suggestions = await getLocationSuggestions(searchQuery);
                    console.log('Got flight suggestions:', suggestions); // Debug log
                    setFlightResults(suggestions);
                } else {
                    console.log('Fetching general locations...'); // Debug log
                    const searchResults = await searchLocation(searchQuery);
                    console.log('Got general location results:', searchResults); // Debug log
                    setResults(searchResults);
                }
                setShowResults(true);
            } catch (error) {
                console.error('Error searching location:', error);
                setFlightResults([]);
                setResults([]);
            } finally {
                setLoading(false);
            }
        }, 300);
    };

    const handleSelectLocation = (location: SearchResult | FlightLocation) => {
        if ('center' in location) {
            // Mapbox result
            setSelectedLocation(location);
            setQuery(location.place_name);
            onSelect({
                coordinates: location.center,
                placeName: location.place_name
            });
        } else {
            // Flight location
            setQuery(location.name);
            onSelect({
                coordinates: [-51.92528, -14.235004], // Default coordinates for flight locations
                placeName: location.name
            });
        }
        setShowResults(false);
    };

    const clearSelection = () => {
        setSelectedLocation(null);
        setQuery('');
        setResults([]);
        setFlightResults([]);
        onSelect({
            coordinates: [-51.92528, -14.235004],
            placeName: ''
        });
    };

    return (
        <div ref={wrapperRef} className={`relative ${className}`}>
            <div className="relative">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleSearch(e.target.value)}
                    onFocus={() => setShowResults(true)}
                    placeholder={placeholder}
                    className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
                {mode === 'flight' ? (
                    <Plane className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                ) : (
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                )}
                {query && (
                    <button
                        type="button"
                        onClick={clearSelection}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        <X className="h-5 w-5" />
                    </button>
                )}
            </div>

            {showResults && (loading || flightResults.length > 0 || results.length > 0) && (
                <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto border border-gray-200">
                    {loading ? (
                        <div className="flex items-center justify-center p-4">
                            <LoadingSpinner size="small" />
                        </div>
                    ) : mode === 'flight' ? (
                        <ul className="py-1">
                            {flightResults.map((result, index) => (
                                <li
                                    key={`${result.iata}-${index}`}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => handleSelectLocation(result)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <Plane className="h-4 w-4 text-gray-400" />
                                        <div>
                                            <div className="text-sm font-medium">{result.name}</div>
                                            <div className="text-xs text-gray-500">
                                                {result.iata} • {result.type === 'AIRPORT' ? 'Aeroporto' : 'Cidade'}
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <ul className="py-1">
                            {results.map((result, index) => (
                                <li
                                    key={index}
                                    className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => handleSelectLocation(result)}
                                >
                                    <div className="flex items-center space-x-3">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                        <span>{result.place_name}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {mode !== 'flight' && selectedLocation && (
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
                        className="h-[300px] rounded-md"
                    />
                </div>
            )}
        </div>
    );
}
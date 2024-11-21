// src/components/forms/flight/FlightFilterForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { FlightFilters } from '@/types';
import { Slider } from '@/components/ui/slider';

interface FlightFilterFormProps {
    filters: FlightFilters;
    onFilterChange: (filters: FlightFilters) => void;
}

export default function FlightFilterForm({ filters, onFilterChange }: FlightFilterFormProps) {
    const [localFilters, setLocalFilters] = useState<FlightFilters>(filters);

    const handlePriceChange = (value: number[]) => {
        setLocalFilters(prev => ({
            ...prev,
            priceRange: [value[0], value[1]]
        }));
    };

    const handleAirlineChange = (airline: string) => {
        setLocalFilters(prev => ({
            ...prev,
            airlines: prev.airlines.includes(airline)
                ? prev.airlines.filter(a => a !== airline)
                : [...prev.airlines, airline]
        }));
    };

    const handleStopsChange = (value: 'any' | 'nonstop' | 'oneStop') => {
        setLocalFilters(prev => ({
            ...prev,
            stops: value
        }));
    };

    useEffect(() => {
        onFilterChange(localFilters);
    }, [localFilters, onFilterChange]);

    return (
        <div className="space-y-6">
            <div>
                <h3 className="text-sm font-medium mb-2">Faixa de Preço</h3>
                <Slider
                    value={localFilters.priceRange}
                    onValueChange={handlePriceChange}
                    min={0}
                    max={5000}
                    step={100}
                    className="mt-2"
                />
                <div className="flex justify-between mt-2">
                    <span className="text-sm text-gray-600">R$ {localFilters.priceRange[0]}</span>
                    <span className="text-sm text-gray-600">R$ {localFilters.priceRange[1]}</span>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Companhias Aéreas</h3>
                <div className="space-y-2">
                    {['LATAM', 'GOL', 'Azul', 'American Airlines', 'Emirates', 'Air France'].map(airline => (
                        <label key={airline} className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                checked={localFilters.airlines.includes(airline)}
                                onChange={() => handleAirlineChange(airline)}
                                className="rounded border-gray-300"
                            />
                            <span>{airline}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium mb-2">Paradas</h3>
                <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            checked={localFilters.stops === 'any'}
                            onChange={() => handleStopsChange('any')}
                            className="text-blue-600"
                        />
                        <span>Qualquer número de paradas</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            checked={localFilters.stops === 'nonstop'}
                            onChange={() => handleStopsChange('nonstop')}
                            className="text-blue-600"
                        />
                        <span>Voo direto</span>
                    </label>
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            checked={localFilters.stops === 'oneStop'}
                            onChange={() => handleStopsChange('oneStop')}
                            className="text-blue-600"
                        />
                        <span>1 parada</span>
                    </label>
                </div>
            </div>
        </div>
    );
}
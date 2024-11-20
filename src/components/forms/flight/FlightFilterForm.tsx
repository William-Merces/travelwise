'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { Check } from 'lucide-react';

interface FilterProps {
    filters: {
        priceRange: [number, number];
        airlines: string[];
        stops: string;
        departureTime: string;
    };
    onFilterChange: (filters: FilterProps['filters']) => void;
}

export default function FlightFilterForm({ filters, onFilterChange }: FilterProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const airlines = [
        'LATAM',
        'GOL',
        'Azul',
        'American Airlines',
        'Emirates',
        'Air France'
    ];

    const departureTimes = [
        { value: 'any', label: 'Qualquer horário' },
        { value: 'morning', label: 'Manhã (06:00 - 11:59)' },
        { value: 'afternoon', label: 'Tarde (12:00 - 17:59)' },
        { value: 'evening', label: 'Noite (18:00 - 23:59)' }
    ];

    const stopOptions = [
        { value: 'any', label: 'Qualquer número de paradas' },
        { value: 'nonstop', label: 'Somente voos diretos' },
        { value: '1stop', label: 'Máximo 1 parada' }
    ];

    return (
        <div className="space-y-6">
            {/* Faixa de Preço */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-4">Faixa de Preço</h3>
                <div className="px-2">
                    <Slider
                        defaultValue={filters.priceRange}
                        min={0}
                        max={5000}
                        step={100}
                        onValueChange={(value) =>
                            onFilterChange({ ...filters, priceRange: value as [number, number] })}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>R$ {filters.priceRange[0]}</span>
                        <span>R$ {filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Companhias Aéreas */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-4">Companhias Aéreas</h3>
                <div className="space-y-2">
                    {airlines.map((airline) => (
                        <label
                            key={airline}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                        >
                            <div className={`
                w-5 h-5 border rounded-md flex items-center justify-center
                ${filters.airlines.includes(airline)
                                    ? 'bg-primary border-primary'
                                    : 'border-gray-300 dark:border-gray-600'}
              `}>
                                {filters.airlines.includes(airline) && (
                                    <Check className="h-4 w-4 text-white" />
                                )}
                            </div>
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={filters.airlines.includes(airline)}
                                onChange={(e) => {
                                    const newAirlines = e.target.checked
                                        ? [...filters.airlines, airline]
                                        : filters.airlines.filter(a => a !== airline);
                                    onFilterChange({ ...filters, airlines: newAirlines });
                                }}
                            />
                            <span className="text-sm">{airline}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Número de Paradas */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-4">Paradas</h3>
                <div className="space-y-2">
                    {stopOptions.map((option) => (
                        <label
                            key={option.value}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                        >
                            <div className={`
                w-4 h-4 border rounded-full flex items-center justify-center
                ${filters.stops === option.value
                                    ? 'border-2 border-primary'
                                    : 'border-gray-300 dark:border-gray-600'}
              `}>
                                {filters.stops === option.value && (
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                            </div>
                            <input
                                type="radio"
                                className="hidden"
                                checked={filters.stops === option.value}
                                onChange={() => onFilterChange({ ...filters, stops: option.value })}
                            />
                            <span className="text-sm">{option.label}</span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Horário de Partida */}
            <div>
                <h3 className="text-lg font-medium mb-4">Horário de Partida</h3>
                <div className="space-y-2">
                    {departureTimes.map((time) => (
                        <label
                            key={time.value}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                        >
                            <div className={`
                w-4 h-4 border rounded-full flex items-center justify-center
                ${filters.departureTime === time.value
                                    ? 'border-2 border-primary'
                                    : 'border-gray-300 dark:border-gray-600'}
              `}>
                                {filters.departureTime === time.value && (
                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                )}
                            </div>
                            <input
                                type="radio"
                                className="hidden"
                                checked={filters.departureTime === time.value}
                                onChange={() =>
                                    onFilterChange({ ...filters, departureTime: time.value })}
                            />
                            <span className="text-sm">{time.label}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
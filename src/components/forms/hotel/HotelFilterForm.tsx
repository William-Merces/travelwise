'use client';

import { useState } from 'react';
import { HotelFilters } from '@/types';
import { Star } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

interface HotelFilterFormProps {
    filters: HotelFilters;
    onFilterChange: (filters: HotelFilters) => void;
}

export default function HotelFilterForm({ filters, onFilterChange }: HotelFilterFormProps) {
    const amenities = [
        'Wi-Fi',
        'Piscina',
        'Academia',
        'Restaurante',
        'Bar',
        'Spa',
        'Estacionamento',
        'Ar condicionado',
        'Pet friendly'
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
                        max={2000}
                        step={50}
                        onValueChange={(value) =>
                            onFilterChange({ ...filters, priceRange: value as [number, number] })}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>R$ {filters.priceRange[0]}</span>
                        <span>R$ {filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Classificação */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-4">Classificação</h3>
                <div className="flex space-x-2">
                    {[5, 4, 3, 2, 1].map((rating) => (
                        <button
                            key={rating}
                            onClick={() => onFilterChange({ ...filters, rating })}
                            className={`
                flex items-center space-x-1 px-3 py-1 rounded
                ${filters.rating === rating
                                    ? 'bg-primary text-white'
                                    : 'bg-gray-100 dark:bg-gray-800'}
              `}
                        >
                            <Star
                                className={filters.rating === rating ? 'fill-current' : ''}
                                size={16}
                            />
                            <span>{rating}+</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Comodidades */}
            <div>
                <h3 className="text-lg font-medium mb-4">Comodidades</h3>
                <div className="space-y-2">
                    {amenities.map((amenity) => (
                        <label
                            key={amenity}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                        >
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 dark:border-gray-600"
                                checked={filters.amenities.includes(amenity)}
                                onChange={(e) => {
                                    const newAmenities = e.target.checked
                                        ? [...filters.amenities, amenity]
                                        : filters.amenities.filter(a => a !== amenity);
                                    onFilterChange({ ...filters, amenities: newAmenities });
                                }}
                            />
                            <span className="text-sm">{amenity}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}
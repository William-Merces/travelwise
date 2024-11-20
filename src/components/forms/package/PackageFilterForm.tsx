'use client';

import { useState } from 'react';
import { PackageFilters } from '@/types';
import { Slider } from '@/components/ui/slider';

interface PackageFilterFormProps {
    filters: PackageFilters;
    onFilterChange: (filters: PackageFilters) => void;
}

export default function PackageFilterForm({ filters, onFilterChange }: PackageFilterFormProps) {
    const activities = [
        'Passeios turísticos',
        'Esportes radicais',
        'Praias',
        'Museus e cultura',
        'Gastronomia',
        'Compras',
        'Vida noturna',
        'Ecoturismo',
        'Bem-estar'
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
                        max={10000}
                        step={500}
                        onValueChange={(value) =>
                            onFilterChange({ ...filters, priceRange: value as [number, number] })}
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                        <span>R$ {filters.priceRange[0]}</span>
                        <span>R$ {filters.priceRange[1]}</span>
                    </div>
                </div>
            </div>

            {/* Duração da Viagem */}
            <div className="border-b pb-4">
                <h3 className="text-lg font-medium mb-4">Duração da Viagem</h3>
                <div className="space-y-2">
                    {[3, 5, 7, 10, 15].map((days) => (
                        <label
                            key={days}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                        >
                            <input
                                type="radio"
                                className="rounded-full"
                                checked={filters.duration === days}
                                onChange={() => onFilterChange({ ...filters, duration: days })}
                            />
                            <span className="text-sm">
                                {days} {days === 1 ? 'dia' : 'dias'}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Atividades Inclusas */}
            <div>
                <h3 className="text-lg font-medium mb-4">Atividades Inclusas</h3>
                <div className="space-y-2">
                    {activities.map((activity) => (
                        <label
                            key={activity}
                            className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded"
                        >
                            <input
                                type="checkbox"
                                className="rounded border-gray-300 dark:border-gray-600"
                                checked={filters.activities.includes(activity)}
                                onChange={(e) => {
                                    const newActivities = e.target.checked
                                        ? [...filters.activities, activity]
                                        : filters.activities.filter(a => a !== activity);
                                    onFilterChange({ ...filters, activities: newActivities });
                                }}
                            />
                            <span className="text-sm">{activity}</span>
                        </label>
                    ))}
                </div>
            </div>
        </div>
    );
}

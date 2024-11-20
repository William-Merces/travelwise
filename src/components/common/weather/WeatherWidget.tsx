'use client';

import { useWeather } from '@/hooks/useWeather';
import Image from 'next/image';

export default function WeatherWidget() {
    const { weather, isLoading, error } = useWeather();

    if (isLoading) {
        return (
            <div className="animate-pulse flex items-center space-x-2">
                <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                    <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
            </div>
        );
    }

    if (error || !weather) {
        return null;
    }

    return (
        <div className="flex items-center space-x-2">
            <Image
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt={weather.description}
                width={40}
                height={40}
            />
            <div className="text-sm">
                <p className="font-medium">{weather.city}</p>
                <p>{Math.round(weather.temp)}°C</p>
            </div>
        </div>
    );
}
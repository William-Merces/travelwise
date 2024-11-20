import { useEffect, useState } from 'react';

interface WeatherData {
    temp: number;
    main: string;
    description: string;
}

export function useWeather(location: string) {
    const [data, setData] = useState<WeatherData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                const response = await fetch(
                    `https://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}&q=${location}&lang=pt`
                );
                
                if (!response.ok) throw new Error('Failed to fetch weather');
                
                const weatherData = await response.json();
                
                setData({
                    temp: weatherData.current.temp_c,
                    main: weatherData.current.condition.text,
                    description: weatherData.current.condition.text
                });
            } catch (err) {
                setError(err as Error);
            } finally {
                setIsLoading(false);
            }
        }

        if (location) {
            fetchWeather();
        }
    }, [location]);

    return { data, isLoading, error };
}
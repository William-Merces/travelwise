import { weatherApi } from './api';
import { WeatherData } from '@/types';

export const getWeatherByCity = async (city: string): Promise<WeatherData> => {
    try {
        const response = await weatherApi.get('/weather', {
            params: {
                q: city,
            },
        });

        return {
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            city: response.data.name,
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};

export const getWeatherByCoordinates = async (lat: number, lon: number): Promise<WeatherData> => {
    try {
        const response = await weatherApi.get('/weather', {
            params: {
                lat,
                lon,
            },
        });

        return {
            temp: response.data.main.temp,
            description: response.data.weather[0].description,
            icon: response.data.weather[0].icon,
            city: response.data.name,
        };
    } catch (error) {
        console.error('Error fetching weather:', error);
        throw error;
    }
};
import axios from 'axios';

export const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    params: {
        appid: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
        units: 'metric',
        lang: 'pt_br',
    },
});

export const mapboxApi = axios.create({
    baseURL: 'https://api.mapbox.com/geocoding/v5/mapbox.places',
    params: {
        access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
        language: 'pt-BR',
    },
});
import { mapboxApi } from './api';

interface GeocodingResult {
    center: [number, number];
    place_name: string;
}

export const searchLocation = async (query: string): Promise<GeocodingResult[]> => {
    try {
        const response = await mapboxApi.get(`/${query}.json`);
        return response.data.features.map((feature: any) => ({
            center: feature.center,
            place_name: feature.place_name,
        }));
    } catch (error) {
        console.error('Error searching location:', error);
        throw error;
    }
};

export const getCoordinates = async (location: string): Promise<[number, number]> => {
    try {
        const results = await searchLocation(location);
        if (results.length === 0) {
            throw new Error('Location not found');
        }
        return results[0].center;
    } catch (error) {
        console.error('Error getting coordinates:', error);
        throw error;
    }
};

export const initializeMap = (container: string, center: [number, number], zoom: number) => {
    const mapboxgl = require('mapbox-gl');
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

    return new mapboxgl.Map({
        container,
        style: 'mapbox://styles/mapbox/streets-v11',
        center,
        zoom,
    });
};
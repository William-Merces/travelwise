// src/services/flight-api.ts
import { SearchFormData, Flight } from '@/types';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'skyscanner44.p.rapidapi.com';

interface LocationResponse {
    places: Array<{
        name: string;
        iata: string;
        type: string;
        cityName?: string;
        countryName: string;
    }>;
}

export async function getLocationSuggestions(query: string): Promise<Array<{
    name: string;
    iata: string;
    type: string;
}>> {
    if (!query || query.length < 2) return [];

    try {
        const response = await fetch(`/api/flights/locations?query=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch suggestions');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching suggestions:', error);
        return [];
    }
}

export async function searchFlights(searchData: SearchFormData): Promise<Flight[]> {
    try {
        const params = new URLSearchParams({
            origin: searchData.origin,
            destination: searchData.destination,
            checkIn: searchData.checkIn.toISOString(),
            passengers: searchData.passengers.toString()
        });

        if (searchData.checkOut) {
            params.append('checkOut', searchData.checkOut.toISOString());
        }

        const response = await fetch(`/api/flights/search?${params}`);

        if (!response.ok) {
            throw new Error('Failed to fetch flights');
        }

        return await response.json();
    } catch (error) {
        console.error('Error searching flights:', error);
        throw error;
    }
}
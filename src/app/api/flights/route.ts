// src/app/api/flights/search/route.ts
import { NextResponse } from 'next/server';
import { Flight, SearchFormData } from '@/types';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'skyscanner44.p.rapidapi.com';

async function getLocationCode(location: string): Promise<string | null> {
    try {
        const response = await fetch(
            `https://skyscanner44.p.rapidapi.com/autocomplete?query=${encodeURIComponent(location)}`,
            {
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY!,
                    'X-RapidAPI-Host': RAPIDAPI_HOST
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Location search failed: ${response.statusText}`);
        }

        const data = await response.json();
        const place = data.places.find((p: any) => 
            p.type === 'AIRPORT' || p.type === 'CITY'
        );
        
        return place?.iata || null;
    } catch (error) {
        console.error('Error fetching location code:', error);
        return null;
    }
}

async function searchFlights(searchData: SearchFormData): Promise<Flight[]> {
    try {
        // Extract location codes from the full location names
        const originCode = await getLocationCode(searchData.origin);
        const destinationCode = await getLocationCode(searchData.destination);
        
        if (!originCode || !destinationCode) {
            throw new Error('Could not find airport codes for the specified locations');
        }

        // Format dates according to Skyscanner API requirements (YYYY-MM-DD)
        const departureDate = searchData.checkIn.toISOString().split('T')[0];
        const returnDate = searchData.checkOut?.toISOString().split('T')[0];

        // Build query parameters
        const params = new URLSearchParams({
            origin: originCode,
            destination: destinationCode,
            departureDate: departureDate,
            adults: searchData.passengers.toString(),
            currency: 'BRL',
            locale: 'pt-BR',
            market: 'BR'
        });

        if (returnDate) {
            params.append('returnDate', returnDate);
        }

        // Make the API request
        const response = await fetch(
            `https://skyscanner44.p.rapidapi.com/search-extended?${params.toString()}`,
            {
                headers: {
                    'X-RapidAPI-Key': RAPIDAPI_KEY!,
                    'X-RapidAPI-Host': RAPIDAPI_HOST
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Flight search failed: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Transform the response data into our Flight type
        if (!data.itineraries || !Array.isArray(data.itineraries)) {
            return [];
        }

        return data.itineraries.map((itinerary: any) => {
            const leg = itinerary.legs[0];
            return {
                id: itinerary.id,
                airline: leg.carriers[0]?.name || 'Unknown Airline',
                origin: leg.origin.name,
                destination: leg.destination.name,
                departureTime: leg.departure,
                arrivalTime: leg.arrival,
                price: itinerary.price.amount,
                stops: leg.stops.length,
                duration: leg.duration,
                iataOrigin: leg.origin.iata,
                iataDestination: leg.destination.iata,
                stopLocations: leg.stops.map((stop: any) => stop.name)
            };
        });
    } catch (error) {
        console.error('Error in searchFlights:', error);
        throw error;
    }
}

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        
        // Parse search parameters
        const searchData: SearchFormData = {
            origin: searchParams.get('origin') || '',
            destination: searchParams.get('destination') || '',
            checkIn: new Date(searchParams.get('checkIn') || Date.now()),
            passengers: parseInt(searchParams.get('passengers') || '1'),
            checkOut: searchParams.get('checkOut') 
                ? new Date(searchParams.get('checkOut'))
                : undefined
        };

        // Validate required fields
        if (!searchData.origin || !searchData.destination) {
            return NextResponse.json(
                { error: 'Origin and destination are required' },
                { status: 400 }
            );
        }

        // Search for flights
        const flights = await searchFlights(searchData);
        
        // Return the results
        return NextResponse.json(flights);
        
    } catch (error: any) {
        console.error('Error in flight search route:', error);
        return NextResponse.json(
            { 
                error: error instanceof Error ? error.message : 'Internal server error',
                details: error.toString()
            },
            { status: 500 }
        );
    }
}
import { Flight, SearchFormData } from '@/types';

const RAPIDAPI_KEY = process.env.NEXT_PUBLIC_RAPIDAPI_KEY;

export async function searchFlights(searchData: SearchFormData): Promise<Flight[]> {
    const origin = await getIATACode(searchData.origin);
    const destination = await getIATACode(searchData.destination);
    
    if (!origin || !destination) {
        throw new Error('Não foi possível encontrar os códigos IATA para origem ou destino');
    }

    const date = searchData.checkIn.toISOString().split('T')[0];

    const url = `https://skyscanner44.p.rapidapi.com/search-extended`;
    const params = new URLSearchParams({
        adults: searchData.passengers?.toString() || '1',
        origin: origin,
        destination: destination,
        departureDate: date,
        currency: 'BRL',
        locale: 'pt-BR'
    });

    const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY!,
            'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
    });

    if (!response.ok) {
        throw new Error(`Erro na busca de voos: ${response.statusText}`);
    }

    const data = await response.json();
    
    // Transform Skyscanner data to our Flight type
    return transformSkyscannerData(data);
}

async function getIATACode(cityName: string): Promise<string | null> {
    const url = 'https://skyscanner44.p.rapidapi.com/autocomplete';
    const params = new URLSearchParams({ query: cityName });

    const response = await fetch(`${url}?${params}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': RAPIDAPI_KEY!,
            'X-RapidAPI-Host': 'skyscanner44.p.rapidapi.com'
        }
    });

    if (!response.ok) {
        throw new Error(`Erro na busca do código IATA: ${response.statusText}`);
    }

    const data = await response.json();
    return data[0]?.iata || null;
}

function transformSkyscannerData(data: any): Flight[] {
    if (!data.itineraries || !data.itineraries.length) {
        return [];
    }

    return data.itineraries.map((itinerary: any) => ({
        id: itinerary.id,
        airline: itinerary.legs[0].carriers[0].name,
        origin: itinerary.legs[0].origin.name,
        destination: itinerary.legs[0].destination.name,
        departureTime: itinerary.legs[0].departure,
        arrivalTime: itinerary.legs[0].arrival,
        price: parseFloat(itinerary.price.amount),
        stops: itinerary.legs[0].stops.length,
        duration: itinerary.legs[0].duration
    }));
}
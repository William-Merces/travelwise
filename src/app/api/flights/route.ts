import { NextResponse } from 'next/server';

const mockFlights = [
    {
        id: 'fl1',
        airline: 'LATAM',
        origin: 'São Paulo, São Paulo, Brasil',
        destination: 'Brasília, Distrito Federal, Brasil',
        departureTime: '2024-11-20T10:00:00',
        arrivalTime: '2024-11-20T11:30:00',
        price: 750.00,
        stops: 0
    },
    {
        id: 'fl2',
        airline: 'GOL',
        origin: 'São Paulo, São Paulo, Brasil',
        destination: 'Brasília, Distrito Federal, Brasil',
        departureTime: '2024-11-20T14:00:00',
        arrivalTime: '2024-11-20T15:30:00',
        price: 680.00,
        stops: 0
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const origin = searchParams.get('origin');
    const destination = searchParams.get('destination');
    const date = searchParams.get('date');

    console.log('Received params:', { origin, destination, date });
    
    let flights = mockFlights;

    if (origin) {
        flights = flights.filter(flight => 
            flight.origin.toLowerCase() === origin.toLowerCase()
        );
    }

    if (destination) {
        flights = flights.filter(flight => 
            flight.destination.toLowerCase() === destination.toLowerCase()
        );
    }

    if (date) {
        flights = flights.filter(flight => 
            flight.departureTime.startsWith(date)
        );
    }

    console.log('Filtered flights:', flights);

    return NextResponse.json(flights);
}
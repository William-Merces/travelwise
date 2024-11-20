import { NextResponse } from 'next/server';

const mockPackages = [
    {
        id: 'p1',
        name: 'Brasília Completo',
        flight: {
            id: 'fl1',
            airline: 'LATAM',
            origin: 'São Paulo, São Paulo, Brasil',
            destination: 'Brasília, Distrito Federal, Brasil',
            departureTime: '2024-11-20T10:00:00',
            arrivalTime: '2024-11-20T11:30:00',
            price: 750.00,
            stops: 0
        },
        hotel: {
            id: 'h1',
            name: 'Hotel Nacional',
            location: 'Brasília, Distrito Federal, Brasil',
            rating: 5,
            price: 450.00,
            amenities: ['Wi-Fi', 'Piscina', 'Academia', 'Restaurante', 'Spa'],
            images: ['/images/hotels/hotel-1.jpg']
        },
        activities: ['Tour Congresso Nacional', 'Catedral', 'Praça dos Três Poderes'],
        price: 1500.00,
        savings: 200.00
    },
    {
        id: 'p2',
        name: 'Brasília Econômico',
        flight: {
            id: 'fl2',
            airline: 'GOL',
            origin: 'São Paulo, São Paulo, Brasil',
            destination: 'Brasília, Distrito Federal, Brasil',
            departureTime: '2024-11-20T14:00:00',
            arrivalTime: '2024-11-20T15:30:00',
            price: 680.00,
            stops: 0
        },
        hotel: {
            id: 'h2',
            name: 'Royal Tulip',
            location: 'Brasília, Distrito Federal, Brasil',
            rating: 5,
            price: 520.00,
            amenities: ['Wi-Fi', 'Piscina', 'Academia', 'Restaurante', 'Bar'],
            images: ['/images/hotels/hotel-2.jpg']
        },
        activities: ['Tour Congresso Nacional', 'Memorial JK'],
        price: 1300.00,
        savings: 150.00
    }
];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination');
    const origin = searchParams.get('origin');
    
    console.log('Received params:', { origin, destination });
    
    let packages = mockPackages;

    if (destination) {
        packages = packages.filter(pkg =>
            pkg.hotel.location.toLowerCase().includes(destination.toLowerCase())
        );
    }

    if (origin) {
        packages = packages.filter(pkg =>
            pkg.flight.origin.toLowerCase().includes(origin.toLowerCase())
        );
    }

    console.log('Filtered packages:', packages);

    return NextResponse.json(packages);
}
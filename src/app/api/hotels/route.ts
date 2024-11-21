import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('destination');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    console.log('Parâmetros recebidos:', { location, checkIn, checkOut });

    if (!location || !checkIn || !checkOut) {
        return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    try {
        // Primeiro, precisamos obter o dest_id da cidade
        const locationSearchUrl = 'https://booking-com.p.rapidapi.com/v1/hotels/locations';
        const locationResponse = await fetch(`${locationSearchUrl}?name=${encodeURIComponent(location)}&locale=pt-br`, {
            headers: {
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        });

        if (!locationResponse.ok) {
            throw new Error(`Location API returned status: ${locationResponse.status}`);
        }

        const locations = await locationResponse.json();
        if (!locations || locations.length === 0) {
            return NextResponse.json([]);
        }

        const destId = locations[0].dest_id;
        const destType = locations[0].dest_type;

        // Agora, buscar os hotéis usando o dest_id
        const hotelsUrl = `https://booking-com.p.rapidapi.com/v1/hotels/search`;
        const params = new URLSearchParams({
            checkout_date: new Date(checkOut).toISOString().split('T')[0],
            units: 'metric',
            dest_id: destId,
            dest_type: destType,
            locale: 'pt-br',
            adults_number: '2',
            order_by: 'popularity',
            filter_by_currency: 'BRL',
            checkin_date: new Date(checkIn).toISOString().split('T')[0],
            room_number: '1',
            page_number: '0',
            include_adjacency: 'true'
        });

        console.log('URL da busca de hotéis:', `${hotelsUrl}?${params}`);

        const hotelsResponse = await fetch(`${hotelsUrl}?${params}`, {
            headers: {
                'X-RapidAPI-Key': process.env.NEXT_PUBLIC_RAPIDAPI_KEY || '',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        });

        if (!hotelsResponse.ok) {
            throw new Error(`Hotels API returned status: ${hotelsResponse.status}`);
        }

        const data = await hotelsResponse.json();
        console.log('Resposta da API de hotéis:', data);

        if (!data.result || data.result.length === 0) {
            return NextResponse.json([]);
        }

        const hotels = data.result.map((hotel: any) => ({
            id: hotel.hotel_id?.toString(),
            name: hotel.hotel_name,
            location: `${hotel.city}, ${hotel.country_trans}`,
            rating: Math.ceil(hotel.review_score / 2) || 3,
            price: hotel.min_total_price || hotel.price_breakdown?.gross_price || 0,
            amenities: [
                'Wi-Fi',
                ...(hotel.has_gym ? ['Academia'] : []),
                ...(hotel.has_restaurant ? ['Restaurante'] : [])
            ],
            images: [hotel.max_photo_url || hotel.main_photo_url || '/images/hotels/hotel-1.jpg']
        }));

        return NextResponse.json(hotels);

    } catch (error) {
        console.error('Erro ao buscar hotéis:', error);
        return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
    }
}
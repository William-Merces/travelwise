// src/app/api/hotels/route.ts
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const location = searchParams.get('destination');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');

    try {
        const url = `https://booking-com.p.rapidapi.com/v2/hotels/search`;
        const response = await fetch(`${url}?${new URLSearchParams({
            units: 'metric',
            locale: 'pt_BR',
            order_by: 'popularity',
            filter_by_currency: 'BRL',
            checkin_date: checkIn || '',
            checkout_date: checkOut || '',
            adults_number: '2',
            room_number: '1',
            dest_id: '-2121456', // ID de São Paulo, por exemplo
            dest_type: 'city',
            categories_filter_ids: 'class::2,class::3,class::4,class::5'
        })}`, {
            headers: {
                'X-RapidAPI-Key': '3f56c5327cmsh16822e4f4fce8f3p11c50bjsnb274de6d84d7',
                'X-RapidAPI-Host': 'booking-com.p.rapidapi.com'
            }
        });

        const data = await response.json();

        const hotels = data.results.map((hotel: any) => ({
            id: hotel.hotel_id,
            name: hotel.hotel_name,
            location: hotel.address,
            rating: Math.floor(hotel.class),
            price: hotel.price_breakdown?.gross_price || 0,
            amenities: hotel.facilities || [],
            images: [hotel.max_photo_url]
        }));

        return NextResponse.json(hotels);
    } catch (error) {
        console.error('Error fetching hotels:', error);
        return NextResponse.json({ error: 'Failed to fetch hotels' }, { status: 500 });
    }
}

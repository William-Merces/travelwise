import { NextResponse } from 'next/server';
import { getWeatherByCity, getWeatherByCoordinates } from '@/services/weather';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const city = searchParams.get('city');
    const lat = searchParams.get('lat');
    const lon = searchParams.get('lon');

    try {
        if (city) {
            const data = await getWeatherByCity(city);
            return NextResponse.json(data);
        } else if (lat && lon) {
            const data = await getWeatherByCoordinates(Number(lat), Number(lon));
            return NextResponse.json(data);
        } else {
            return NextResponse.json(
                { error: 'City or coordinates required' },
                { status: 400 }
            );
        }
    } catch (error) {
        console.error('Weather API error:', error);
        return NextResponse.json(
            { error: 'Failed to fetch weather data' },
            { status: 500 }
        );
    }
}
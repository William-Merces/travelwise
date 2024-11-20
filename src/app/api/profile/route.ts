import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/services/auth';

const mockUserData = {
    favorites: {
        flights: ['fl1'],
        hotels: ['h1'],
        packages: ['p1']
    },
    bookings: [
        {
            id: 'b1',
            type: 'flight',
            itemId: 'fl1',
            date: '2024-04-20',
            status: 'confirmed'
        }
    ]
};

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    return NextResponse.json(mockUserData);
}

export async function PUT(request: Request) {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    // Em um ambiente real, aqui salvaria no banco de dados
    return NextResponse.json({ ...mockUserData, ...data });
}
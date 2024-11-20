import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

    // Páginas que requerem autenticação
    const protectedPaths = ['/profile', '/favorites', '/bookings'];

    // Páginas que não devem ser acessadas se já estiver autenticado
    const authPaths = ['/login', '/register'];

    const path = request.nextUrl.pathname;

    // Redireciona usuários autenticados para home se tentarem acessar login/register
    if (token && authPaths.includes(path)) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redireciona para login se tentar acessar rotas protegidas sem autenticação
    if (!token && protectedPaths.some(p => path.startsWith(p))) {
        return NextResponse.redirect(
            new URL(`/login?callbackUrl=${encodeURIComponent(path)}`, request.url)
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/profile/:path*',
        '/favorites/:path*',
        '/bookings/:path*',
        '/login',
        '/register'
    ],
};
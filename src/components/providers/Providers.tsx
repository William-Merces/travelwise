'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';

interface ProvidersProps {
    children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider attribute="class" defaultTheme="light">
            <SessionProvider>
                {children}
            </SessionProvider>
        </ThemeProvider>
    );
}
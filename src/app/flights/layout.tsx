import { ReactNode } from 'react';

interface FlightsLayoutProps {
    children: ReactNode;
}

export default function FlightsLayout({ children }: FlightsLayoutProps) {
    return (
        <div className="w-full p-4">
            <main className="w-full bg-gray-50 dark:bg-gray-800">
                {children}
            </main>
        </div>
    );
}
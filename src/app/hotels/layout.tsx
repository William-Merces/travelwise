import { ReactNode } from 'react';

interface HotelsLayoutProps {
    children: ReactNode;
}

export default function HotelsLayout({ children }: HotelsLayoutProps) {
    return (
        <div className="w-full p-4">
            <main className="w-full bg-gray-50 dark:bg-gray-800">
                {children}
            </main>
        </div>
    );
}
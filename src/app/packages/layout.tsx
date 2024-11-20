import { ReactNode } from 'react';

interface PackagesLayoutProps {
    children: ReactNode;
}

export default function PackagesLayout({ children }: PackagesLayoutProps) {
    return (
        <div className="w-full p-4">
            <main className="w-full bg-gray-50 dark:bg-gray-800">
                {children}
            </main>
        </div>
    );
}
import { ReactNode } from 'react';

interface ProfileLayoutProps {
    children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="flex flex-col min-h-screen pt-16 pl-64">
            <main className="flex-grow bg-gray-50 dark:bg-gray-800">
                {children}
            </main>
        </div>
    );
}
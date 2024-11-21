import ClientHeader from './ClientHeader';

export default function Header() {
    return (
        <header className="fixed top-0 w-full bg-white dark:bg-gray-900 shadow-md z-50">
            <ClientHeader />
        </header>
    );
}
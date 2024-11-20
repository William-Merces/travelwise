'use client';

import { useState, createContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home, Plane, Building2, Package, Heart, History, Settings, ChevronRight, ChevronLeft
} from 'lucide-react';

export const SidebarContext = createContext({
    isCollapsed: false,
    setIsCollapsed: (value: boolean) => {}
});

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const pathname = usePathname();

    const menuItems = [
        { href: '/', icon: Home, label: 'Início' },
        { href: '/flights', icon: Plane, label: 'Voos' },
        { href: '/hotels', icon: Building2, label: 'Hotéis' },
        { href: '/packages', icon: Package, label: 'Pacotes' },
        { href: '/favorites', icon: Heart, label: 'Favoritos' },
        { href: '/history', icon: History, label: 'Histórico' },
        { href: '/settings', icon: Settings, label: 'Configurações' },
    ];

    return (
        <SidebarContext.Provider value={{ isCollapsed, setIsCollapsed }}>
            <aside 
                className={`${isCollapsed ? 'w-16' : 'w-64'} 
                transition-all duration-300 ease-in-out
                fixed left-0 top-16 h-[calc(100vh-4rem)] 
                bg-white dark:bg-gray-900 shadow-lg z-40`}
            >
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="absolute -right-3 top-6 bg-primary text-white rounded-full p-1"
                >
                    {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
                </button>

                <nav className="h-full py-4">
                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;

                            return (
                                <li key={item.href}>
                                    <Link href={item.href}
                                        className={`flex items-center px-4 py-2 space-x-4
                                            ${isActive ? 'bg-primary/10 text-primary border-r-4 border-primary' 
                                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                                    >
                                        <Icon size={20} />
                                        {!isCollapsed && <span>{item.label}</span>}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </aside>
            <div className={`${isCollapsed ? 'w-16' : 'w-64'} transition-all duration-300 ease-in-out shrink-0`} />
        </SidebarContext.Provider>
    );
};

export default Sidebar;
'use client';

import { TravelPackage } from '@/types';
import PackageCard from './PackageCard';

interface PackagesListProps {
    packages: TravelPackage[];
    showFavoriteButton?: boolean;
}

export default function PackagesList({ packages, showFavoriteButton }: PackagesListProps) {
    if (packages.length === 0) {
        return (
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow p-8 text-center">
                <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Nenhum pacote encontrado
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                    Tente ajustar seus filtros ou alterar as datas da viagem
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">
                    {packages.length} {packages.length === 1 ? 'pacote encontrado' : 'pacotes encontrados'}
                </h2>
                <div className="flex items-center space-x-4">
                    <select
                        className="border rounded-md px-3 py-2 bg-white dark:bg-gray-900"
                        defaultValue="price"
                    >
                        <option value="price">Ordenar por preço</option>
                        <option value="savings">Ordenar por economia</option>
                        <option value="duration">Ordenar por duração</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {packages.map((pkg) => (
                    <PackageCard
                        key={pkg.id}
                        package={pkg}
                        showFavoriteButton={showFavoriteButton}
                    />
                ))}
            </div>

            {packages.length > 10 && (
                <div className="flex justify-center mt-6">
                    <button className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary hover:text-white transition-colors">
                        Carregar mais pacotes
                    </button>
                </div>
            )}
        </div>
    );
}

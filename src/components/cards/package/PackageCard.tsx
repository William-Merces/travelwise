'use client';

import Image from 'next/image';
import { Star, Plane, Building, MapPin, Tag } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import { TravelPackage } from '@/types';

interface PackageCardProps {
    package: TravelPackage;
    onSelect?: (pkg: TravelPackage) => void;
}

const PackageCard = ({ package: pkg, onSelect }: PackageCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
                {/* Imagem do Hotel do Pacote */}
                <div className="relative w-full md:w-72 h-48">
                    <Image
                        src={pkg.hotel.images[0]}
                        alt={pkg.hotel.name}
                        fill
                        className="object-cover"
                    />
                    <div className="absolute top-2 right-2 bg-primary text-white px-3 py-1 rounded-full text-sm">
                        <div className="flex items-center space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>Economize {formatCurrency(pkg.savings)}</span>
                        </div>
                    </div>
                </div>

                {/* Conteúdo */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        {/* Informações do Pacote */}
                        <div className="flex-1">
                            <h3 className="text-xl font-semibold">{pkg.name}</h3>

                            {/* Localização */}
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                                <MapPin className="w-4 h-4 mr-1" />
                                <span>{pkg.hotel.location}</span>
                            </div>

                            {/* Detalhes do Voo */}
                            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center space-x-2">
                                    <Plane className="w-4 h-4 text-primary" />
                                    <span className="font-medium">Voo incluído:</span>
                                </div>
                                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    <p>{pkg.flight.airline}</p>
                                    <p>{pkg.flight.origin} → {pkg.flight.destination}</p>
                                </div>
                            </div>

                            {/* Hotel */}
                            <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Building className="w-4 h-4 text-primary" />
                                        <span className="font-medium">{pkg.hotel.name}</span>
                                    </div>
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-4 h-4 ${i < pkg.hotel.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Atividades */}
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold mb-2">Atividades inclusas:</h4>
                                <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300">
                                    {pkg.activities.map((activity, index) => (
                                        <li key={index}>{activity}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        {/* Preço e Botão */}
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end justify-between">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                    {formatCurrency(pkg.price)}
                                </p>
                                <p className="text-sm line-through text-gray-500 dark:text-gray-400">
                                    {formatCurrency(pkg.price + pkg.savings)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    por pessoa
                                </p>
                            </div>
                            <button
                                onClick={() => onSelect?.(pkg)}
                                className="btn btn-primary mt-4 md:mt-0"
                            >
                                Selecionar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PackageCard;
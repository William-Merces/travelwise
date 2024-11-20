'use client';

import Image from 'next/image';
import { Star, MapPin, Wifi, Pool, Dumbbell, Utensils } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import { Hotel } from '@/types';

interface HotelCardProps {
    hotel: Hotel;
    onSelect?: (hotel: Hotel) => void;
}

const AMENITY_ICONS = {
    'Wi-Fi': Wifi,
    'Piscina': Pool,
    'Academia': Dumbbell,
    'Restaurante': Utensils
};

const HotelCard = ({ hotel, onSelect }: HotelCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
                {/* Imagem do Hotel */}
                <div className="relative w-full md:w-72 h-48">
                    <Image
                        src={hotel.images[0]}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Conteúdo */}
                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        {/* Informações do Hotel */}
                        <div className="flex-1">
                            <div className="flex items-start justify-between">
                                <div>
                                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span>{hotel.location}</span>
                                    </div>
                                </div>
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            className={`w-4 h-4 ${i < hotel.rating
                                                    ? 'text-yellow-400 fill-current'
                                                    : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Comodidades */}
                            <div className="mt-4">
                                <h4 className="text-sm font-semibold mb-2">Comodidades</h4>
                                <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.map((amenity) => {
                                        const Icon = AMENITY_ICONS[amenity as keyof typeof AMENITY_ICONS];
                                        return (
                                            <div
                                                key={amenity}
                                                className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                                            >
                                                {Icon && <Icon className="w-4 h-4 mr-1" />}
                                                <span>{amenity}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Preço e Botão */}
                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end justify-between">
                            <div className="text-right">
                                <p className="text-2xl font-bold text-primary">
                                    {formatCurrency(hotel.price)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    por noite
                                </p>
                            </div>
                            <button
                                onClick={() => onSelect?.(hotel)}
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

export default HotelCard;
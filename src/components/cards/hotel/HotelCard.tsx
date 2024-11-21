'use client';

import Image from 'next/image';
import { Star, MapPin, Wifi, GraduationCap, UtensilsCrossed } from 'lucide-react';
import { formatCurrency } from '@/utils/helpers';
import { Hotel } from '@/types';

interface HotelCardProps {
    hotel: Hotel;
    onSelect?: (hotel: Hotel) => void;
}

const AMENITY_ICONS = {
    'Wi-Fi': Wifi,
    'Academia': GraduationCap,
    'Restaurante': UtensilsCrossed
};

const HotelCard = ({ hotel, onSelect }: HotelCardProps) => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row">
                <div className="relative w-full md:w-72 h-48">
                    <Image
                        src={hotel.images[0]}
                        alt={hotel.name}
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>

                <div className="flex-1 p-6">
                    <div className="flex flex-col md:flex-row justify-between">
                        <div className="flex-1">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <h3 className="text-xl font-semibold">{hotel.name}</h3>
                                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mt-1">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        <span>{hotel.location}</span>
                                    </div>
                                </div>
                                <div className="flex items-center">
                                    <div className="flex space-x-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i < hotel.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-300 dark:text-gray-600'
                                                }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="text-sm font-semibold mb-2">Comodidades</h4>
                                <div className="flex flex-wrap gap-2">
                                    {hotel.amenities.map((amenity) => {
                                        const Icon = AMENITY_ICONS[amenity as keyof typeof AMENITY_ICONS];
                                        return Icon ? (
                                            <div
                                                key={amenity}
                                                className="flex items-center text-sm text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1"
                                            >
                                                <Icon className="w-4 h-4 mr-1" />
                                                <span>{amenity}</span>
                                            </div>
                                        ) : null;
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end justify-between">
                            <div className="text-right whitespace-nowrap">
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {formatCurrency(hotel.price)}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    por noite
                                </p>
                            </div>
                            <button
                                onClick={() => onSelect?.(hotel)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors mt-4 md:mt-0 w-full md:w-auto"
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
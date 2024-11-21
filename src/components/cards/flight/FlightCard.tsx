import { Flight } from '@/types';
import { formatCurrency, formatDate, formatTime } from '@/utils/helpers';
import { Plane, Clock, MapPin } from 'lucide-react';

interface FlightCardProps {
    flight: Flight;
    showFavoriteButton?: boolean;
}

export default function FlightCard({ flight, showFavoriteButton }: FlightCardProps) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Airline and Logo */}
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                        <Plane className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{flight.airline}</h3>
                        <p className="text-sm text-gray-500">
                            {flight.stops === 0 ? 'Direto' : `${flight.stops} ${flight.stops === 1 ? 'parada' : 'paradas'}`}
                        </p>
                    </div>
                </div>

                {/* Flight Times */}
                <div className="col-span-2">
                    <div className="flex items-center justify-between">
                        <div className="text-center">
                            <p className="text-xl font-bold">{formatTime(flight.departureTime)}</p>
                            <p className="text-sm text-gray-500">{formatDate(flight.departureTime)}</p>
                            <div className="flex items-center mt-1">
                                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                                <p className="text-sm">{flight.origin}</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-center px-4">
                            <div className="w-24 border-t border-gray-300 dark:border-gray-600"></div>
                            <div className="flex items-center mt-1">
                                <Clock className="w-4 h-4 text-gray-400 mr-1" />
                                <span className="text-sm text-gray-500">{flight.duration}</span>
                            </div>
                        </div>

                        <div className="text-center">
                            <p className="text-xl font-bold">{formatTime(flight.arrivalTime)}</p>
                            <p className="text-sm text-gray-500">{formatDate(flight.arrivalTime)}</p>
                            <div className="flex items-center mt-1">
                                <MapPin className="w-4 h-4 text-gray-400 mr-1" />
                                <p className="text-sm">{flight.destination}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Price and Book Button */}
                <div className="flex flex-col items-end justify-between">
                    <div className="text-right">
                        <p className="text-2xl font-bold text-primary">
                            {formatCurrency(flight.price)}
                        </p>
                        <p className="text-sm text-gray-500">por passageiro</p>
                    </div>
                    <button className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">
                        Reservar
                    </button>
                </div>
            </div>
        </div>
    );
}
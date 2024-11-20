'use client';

import { Clock, Plane } from 'lucide-react';
import { formatCurrency, formatFlightDuration } from '@/utils/helpers';
import { Flight } from '@/types';

interface FlightCardProps {
    flight: Flight;
    onSelect?: (flight: Flight) => void;
}

const FlightCard = ({ flight, onSelect }: FlightCardProps) => {
    const departureTime = new Date(flight.departureTime);
    const arrivalTime = new Date(flight.arrivalTime);
    const duration = (arrivalTime.getTime() - departureTime.getTime()) / (1000 * 60); // em minutos

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
                {/* Companhia Aérea */}
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full">
                        <Plane className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold">{flight.airline}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            Voo {flight.id}
                        </p>
                    </div>
                </div>

                {/* Detalhes do Voo */}
                <div className="flex-1 mx-4">
                    <div className="flex items-center justify-between max-w-md mx-auto">
                        {/* Origem */}
                        <div className="text-center">
                            <p className="text-xl font-bold">
                                {departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{flight.origin}</p>
                        </div>

                        {/* Duração/Paradas */}
                        <div className="text-center flex-1 px-4">
                            <div className="relative">
                                <div className="border-t-2 border-gray-300 dark:border-gray-600 w-full absolute top-1/2 left-0"></div>
                                <Plane className="w-4 h-4 text-primary mx-auto relative z-10 transform rotate-90" />
                            </div>
                            <div className="mt-2">
                                <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center justify-center">
                                    <Clock className="w-3 h-3 mr-1" />
                                    {formatFlightDuration(duration)}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {flight.stops === 0 ? 'Direto' :
                                        flight.stops === 1 ? '1 parada' :
                                            `${flight.stops} paradas`}
                                </p>
                            </div>
                        </div>

                        {/* Destino */}
                        <div className="text-center">
                            <p className="text-xl font-bold">
                                {arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{flight.destination}</p>
                        </div>
                    </div>
                </div>

                {/* Preço e Botão */}
                <div className="flex flex-col items-end space-y-2">
                    <p className="text-2xl font-bold text-primary">
                        {formatCurrency(flight.price)}
                    </p>
                    <button
                        onClick={() => onSelect?.(flight)}
                        className="btn btn-primary"
                    >
                        Selecionar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FlightCard;
// src/types/index.ts

export interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    favorites?: {
        flights: string[];
        hotels: string[];
        packages: string[];
    };
}

export interface WeatherData {
    temp: number;
    description: string;
    icon: string;
    city: string;
}

export interface SearchFormData {
    origin: string;
    destination: string;
    checkIn: Date;
    checkOut?: Date;
    passengers: number;
    rooms?: number;
}

export interface Flight {
    id: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: string;
    arrivalTime: string;
    price: number;
    stops: number;
    duration: string;
    iataOrigin: string;
    iataDestination: string;
    stopLocations: string[];
    aircraft?: string;
    cabinClass?: string;
    seatsAvailable?: number;
    luggage?: {
        cabin: number;
        checked: number;
    };
    segments?: {
        departure: string;
        arrival: string;
        duration: string;
        airline: string;
    }[];
}

export interface Hotel {
    id: string;
    name: string;
    location: string;
    rating: number;
    price: number;
    amenities: string[];
    images: string[];
}

export interface TravelPackage {
    id: string;
    name: string;
    flight: Flight;
    hotel: Hotel;
    activities: string[];
    price: number;
    savings: number;
}

export interface FlightFilters {
    priceRange: [number, number];
    airlines: string[];
    stops: 'any' | 'nonstop' | 'oneStop';
    departureTime?: 'any' | 'morning' | 'afternoon' | 'evening';
}

export interface HotelFilters {
    priceRange: [number, number];
    rating: number;
    amenities: string[];
}

export interface PackageFilters {
    priceRange: [number, number];
    duration: number;
    activities: string[];
}

export type SortOption = 'price' | 'duration' | 'departure' | 'airline' | 'rating';

export interface Booking {
    id: string;
    userId: string;
    type: 'flight' | 'hotel' | 'package';
    status: 'pending' | 'confirmed' | 'cancelled';
    paymentStatus: 'pending' | 'paid' | 'refunded';
    bookingDate: string;
    totalPrice: number;
    item: Flight | Hotel | TravelPackage;
}

export interface Review {
    id: string;
    userId: string;
    itemId: string;
    itemType: 'flight' | 'hotel' | 'package';
    rating: number;
    comment: string;
    date: string;
}

export interface SkyscannerResponse {
    itineraries: Array<{
        id: string;
        legs: Array<{
            origin: {
                name: string;
                iata: string;
            };
            destination: {
                name: string;
                iata: string;
            };
            departure: string;
            arrival: string;
            duration: string;
            carriers: Array<{
                name: string;
            }>;
            stops: Array<{
                name: string;
            }>;
        }>;
        price: {
            amount: number;
        };
    }>;
}

export interface SkyscannerLocationResponse {
    places: Array<{
        name: string;
        cityName?: string;
        countryName: string;
        iata: string;
        type: string;
    }>;
}

export interface SkyscannerSearchParams {
    origin: string;
    destination: string;
    departureDate: string;
    returnDate?: string;
    adults: number;
    currency: string;
    locale: string;
    market?: string;
    cabinClass?: string;
}

export interface Location {
    coordinates: [number, number];
    placeName: string;
}

export interface MapboxFeature {
    id: string;
    place_name: string;
    center: [number, number];
}

export interface MapboxResponse {
    features: MapboxFeature[];
}
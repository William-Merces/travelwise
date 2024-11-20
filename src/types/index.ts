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
    origin?: string;
    destination: string;
    checkIn: Date;
    checkOut?: Date;
    passengers?: number;
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
    stopLocations?: string[];
    duration?: string;
    aircraft?: string;
    cabinClass?: string;
    seatsAvailable?: number;
    luggage?: {
        cabin: number;
        checked: number;
    };
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
    stops: 'any' | 'nonstop' | '1stop';
    departureTime: 'any' | 'morning' | 'afternoon' | 'evening';
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
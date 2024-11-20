export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
};

export const formatFlightDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
};

export const calculatePackageSavings = (flightPrice: number, hotelPrice: number, packagePrice: number): number => {
    const individualTotal = flightPrice + hotelPrice;
    return individualTotal - packagePrice;
};

export const getWeatherIcon = (code: string): string => {
    return `https://openweathermap.org/img/wn/${code}@2x.png`;
};

export const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const generateBookingReference = (): string => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const calculateNights = (checkIn: Date, checkOut: Date): number => {
    const diffTime = Math.abs(checkOut.getTime() - checkIn.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isValidCPF = (cpf: string): boolean => {
    const cleanCPF = cpf.replace(/[^\d]/g, '');

    if (cleanCPF.length !== 11) return false;

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (11 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(9, 10))) return false;

    sum = 0;
    for (let i = 1; i <= 10; i++) {
        sum += parseInt(cleanCPF.substring(i - 1, i)) * (12 - i);
    }

    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cleanCPF.substring(10, 11))) return false;

    return true;
};
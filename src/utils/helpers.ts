export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(value);
};

export const formatDate = (date: Date | string): string => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    }).format(dateObj);
};

export const formatTime = (dateString: string): string => {
    return new Intl.DateTimeFormat('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(dateString));
};

export const formatFlightDuration = (minutes: number): string => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}min`;
};

// Nova função para formatar duração no formato da Skyscanner (PT2H30M)
export const formatSkyscannerDuration = (duration: string): string => {
    const hours = duration.match(/(\d+)H/)?.[1] || '0';
    const minutes = duration.match(/(\d+)M/)?.[1] || '0';
    return `${hours}h ${minutes}min`;
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

// Novas funções para trabalhar com a API do Skyscanner
export const calculateDuration = (departure: string, arrival: string): string => {
    const start = new Date(departure);
    const end = new Date(arrival);
    const durationInMinutes = (end.getTime() - start.getTime()) / (1000 * 60);
    return formatFlightDuration(durationInMinutes);
};

export const formatSkyscannerDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
};

// Função para limpar e formatar strings de localização
export const formatLocation = (location: string): string => {
    return location
        .replace(/International Airport/gi, '')
        .replace(/Airport/gi, '')
        .trim();
};

// Função para determinar o período do dia
export const getFlightPeriod = (time: string): 'morning' | 'afternoon' | 'evening' | 'night' => {
    const hour = new Date(time).getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 22) return 'evening';
    return 'night';
};
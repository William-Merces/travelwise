import { useState, useEffect } from 'react';

interface Coordinates {
    latitude: number;
    longitude: number;
}

export const useGeolocation = () => {
    const [coordinates, setCoordinates] = useState<Coordinates | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Geolocalização não suportada pelo navegador');
            setLoading(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCoordinates({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
                setLoading(false);
            },
            (error) => {
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        setError('Usuário negou a solicitação de Geolocalização');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        setError('Localização indisponível');
                        break;
                    case error.TIMEOUT:
                        setError('Tempo de solicitação expirou');
                        break;
                    default:
                        setError('Ocorreu um erro desconhecido');
                }
                setLoading(false);
            }
        );
    }, []);

    return { coordinates, error, loading };
};
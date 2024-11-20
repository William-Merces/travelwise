'use client';

import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Locate } from 'lucide-react';
import { useGeolocation } from '@/hooks/useGeolocation';
import LoadingSpinner from '../LoadingSpinner';

interface MapViewProps {
    center?: [number, number];
    zoom?: number;
    markers?: Array<{
        id: string;
        coordinates: [number, number];
        title: string;
        description?: string;
    }>;
    onMarkerClick?: (markerId: string) => void;
    className?: string;
    interactive?: boolean;
}

const MapView = ({
    center = [-51.92528, -14.235004], // Centro do Brasil como padrão
    zoom = 4,
    markers = [],
    onMarkerClick,
    className = '',
    interactive = true
}: MapViewProps) => {
    const mapContainer = useRef<HTMLDivElement>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const markerRefs = useRef<{ [key: string]: mapboxgl.Marker }>({});
    const { coordinates, loading: locationLoading } = useGeolocation();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!mapContainer.current) return;

        mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN!;

        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v12',
            center: center,
            zoom: zoom,
            interactive: interactive
        });

        map.current.addControl(new mapboxgl.NavigationControl());

        map.current.on('load', () => {
            setLoading(false);
        });

        return () => {
            map.current?.remove();
        };
    }, []);

    // Atualiza marcadores quando mudarem
    useEffect(() => {
        if (!map.current || loading) return;

        // Remove marcadores antigos
        Object.values(markerRefs.current).forEach(marker => marker.remove());
        markerRefs.current = {};

        // Adiciona novos marcadores
        markers.forEach(marker => {
            const el = document.createElement('div');
            el.className = 'marker';
            el.innerHTML = `
        <div class="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center cursor-pointer shadow-lg transform hover:scale-110 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
      `;

            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div class="p-2">
          <h3 class="font-bold">${marker.title}</h3>
          ${marker.description ? `<p class="text-sm">${marker.description}</p>` : ''}
        </div>
      `);

            const mapMarker = new mapboxgl.Marker(el)
                .setLngLat(marker.coordinates)
                .setPopup(popup)
                .addTo(map.current!);

            el.addEventListener('click', () => {
                onMarkerClick?.(marker.id);
            });

            markerRefs.current[marker.id] = mapMarker;
        });
    }, [markers, loading]);

    // Função para centralizar no local atual
    const centerOnCurrentLocation = () => {
        if (!coordinates || !map.current) return;

        map.current.flyTo({
            center: [coordinates.longitude, coordinates.latitude],
            zoom: 14
        });
    };

    return (
        <div className={`relative ${className}`}>
            <div ref={mapContainer} className="w-full h-full min-h-[400px] rounded-lg overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                        <LoadingSpinner size="large" />
                    </div>
                )}
            </div>

            {interactive && coordinates && (
                <button
                    onClick={centerOnCurrentLocation}
                    className="absolute bottom-4 right-4 p-2 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    title="Centralizar em minha localização"
                >
                    <Locate className="w-5 h-5" />
                </button>
            )}
        </div>
    );
};

export default MapView;
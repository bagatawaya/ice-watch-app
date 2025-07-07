
import { SightingType } from '../types';

// This is a standard material design "place" icon path.
// It's a reliable SVG path for Google Maps markers.
const PIN_PATH = 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z';

export const getSightingTypeColor = (type: SightingType): string => {
    switch (type) {
        case 'checkpoint': return '#F59E0B'; // Amber 500
        case 'detainment': return '#EF4444'; // Red 500
        case 'workplace_raid': return '#B91C1C'; // Red 700
        case 'sighting_motion': return '#3B82F6'; // Blue 500
        case 'sighting_stationary': return '#60A5FA'; // Blue 400
        case 'residential': return '#8B5CF6'; // Violet 500
        case 'courthouse': return '#A78BFA'; // Violet 400
        case 'other':
        default: return '#6B7280'; // Gray 500
    }
};

export const getMarkerOptions = (type: SightingType) => {
    // Defensively check for the google object and its properties. This prevents runtime errors
    // if the Google Maps script is not fully initialized when this function is called.
    const google = (window as any).google;
    if (google && google.maps) {
        return {
            path: PIN_PATH,
            fillColor: getSightingTypeColor(type),
            fillOpacity: 0.9,
            strokeWeight: 1,
            strokeColor: '#FFFFFF',
            scale: 1.5,
        };
    }
    // Fallback to the default marker if Google Maps API is not ready.
    return undefined;
};
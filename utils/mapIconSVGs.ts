import { SightingType } from '../types';

// Raw SVG <path>, <circle> etc. data for each icon.
// The wrapping <svg> tag is not included.
const icons: Record<SightingType, string> = {
    checkpoint: `
        <path d="M4 19.5v-15a2.5 2.5 0 0 1 2.5-2.5h11A2.5 2.5 0 0 1 20 4.5v15"/>
        <path d="M12 2v20"/>
        <path d="M12 8h.01"/>
        <path d="M12 16h.01"/>
    `,
    detainment: `
        <path d="M8 10a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
        <path d="M16 10a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
        <path d="M12 10h2" />
        <path d="M6 10H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2" />
        <path d="M18 10h2a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
    `,
    sighting_motion: `
        <path d="M14 16H9m10 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm-9 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
        <path d="M5 16H3.6a1 1 0 0 1-1-1.2l1.6-4.8A1 1 0 0 1 5.2 9h13.6a1 1 0 0 1 1 .8l1.6 4.8a1 1 0 0 1-1 1.2H19"/>
        <path d="m5 9-1.5-4.5A1 1 0 0 1 4.4 3h15.2a1 1 0 0 1 1 .5L20 9"/>
    `,
    sighting_stationary: `
        <path d="M14 16H9m10 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Zm-9 0a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z"/>
        <path d="M5 16H3.6a1 1 0 0 1-1-1.2l1.6-4.8A1 1 0 0 1 5.2 9h13.6a1 1 0 0 1 1 .8l1.6 4.8a1 1 0 0 1-1 1.2H19"/>
        <path d="m5 9-1.5-4.5A1 1 0 0 1 4.4 3h15.2a1 1 0 0 1 1 .5L20 9"/>
    `,
    workplace_raid: `
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <line x1="9" y1="9" x2="15" y2="9" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
    `,
    residential: `
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
        <polyline points="9 22 9 12 15 12 15 22"/>
    `,
    courthouse: `
        <path d="m14 13-5-5-4 4 5 5-2 2h6v-6l-2-2z"/>
        <path d="m9 5 4-4"/>
        <path d="m18 11 4-4"/>
        <path d="m15 16 5 5"/>
        <path d="m22 2-2 2"/>
    `,
    other: `
        <circle cx="12" cy="12" r="10"/>
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
        <path d="M12 17h.01"/>
    `
};

/**
 * Returns the raw SVG path data for a given sighting type.
 * @param type The SightingType enum value.
 * @returns A string containing SVG elements like <path>, <circle>, etc.
 */
export const getSightingTypeIconSVG = (type: SightingType): string => {
    return icons[type] || icons.other;
};

import { Report, User, SightingType } from '../types';

// Hardcoded base64 images to avoid external network requests for seeding.
// These are visible SVG placeholders.
const SEED_IMAGES = {
  IMAGE_1: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzI4M2E0OCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaWdodGluZyAxPC90ZXh0Pjwvc3ZnPg==',
  IMAGE_2: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzM4YjJhYyIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaWdodGluZyAyPC90ZXh0Pjwvc3ZnPg==',
  IMAGE_3: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzcxODA5NiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaWdodGluZyAzPC90ZXh0Pjwvc3ZnPg==',
  IMAGE_4: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iI2U1M2UzZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaWdodGluZyA0PC90ZXh0Pjwvc3ZnPg==',
  IMAGE_5: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiB2aWV3Qm94PSIwIDAgNjAwIDQwMCI+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0iIzRiNTU2OCIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0ic2Fucy1zZXJpZiIgZm9udC1zaXplPSIzMCIgZmlsbD0id2hpdGUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIj5TaWdodGluZyA1PC90ZXh0Pjwvc3ZnPg==',
};

export const seedReporter: User = {
    id: 'community-reporter',
    username: 'Community Alert',
    email: 'community@alert.system',
    isAdmin: false,
    state: 'CA',
    county: 'Los Angeles',
    notificationSettings: { radius: 0, email: false, sms: false, popup: false }
};

// Data generation constants
const stateLocations = {
    CA: [
        { city: 'Los Angeles', county: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
        { city: 'Long Beach', county: 'Los Angeles', lat: 33.7701, lng: -118.1937 },
        { city: 'Glendale', county: 'Los Angeles', lat: 34.1425, lng: -118.2551 },
        { city: 'Santa Monica', county: 'Los Angeles', lat: 34.0195, lng: -118.4912 },
        { city: 'Pasadena', county: 'Los Angeles', lat: 34.1478, lng: -118.1445 },
        { city: 'Pomona', county: 'Los Angeles', lat: 34.0551, lng: -117.7520 },
        { city: 'Palmdale', county: 'Los Angeles', lat: 34.5794, lng: -118.1165 },
        { city: 'San Diego', county: 'San Diego', lat: 32.7157, lng: -117.1611 },
        { city: 'Chula Vista', county: 'San Diego', lat: 32.6401, lng: -117.0842 },
        { city: 'Oceanside', county: 'San Diego', lat: 33.1959, lng: -117.3795 },
        { city: 'Escondido', county: 'San Diego', lat: 33.1192, lng: -117.0864 },
        { city: 'Anaheim', county: 'Orange', lat: 33.8366, lng: -117.9143 },
        { city: 'Santa Ana', county: 'Orange', lat: 33.7455, lng: -117.8677 },
        { city: 'Irvine', county: 'Orange', lat: 33.6846, lng: -117.8265 },
        { city: 'Huntington Beach', county: 'Orange', lat: 33.6603, lng: -117.9992 },
        { city: 'Riverside', county: 'Riverside', lat: 33.9806, lng: -117.3755 },
        { city: 'Moreno Valley', county: 'Riverside', lat: 33.9425, lng: -117.2297 },
        { city: 'Corona', county: 'Riverside', lat: 33.8753, lng: -117.5664 },
        { city: 'San Bernardino', county: 'San Bernardino', lat: 34.1083, lng: -117.2898 },
        { city: 'Fontana', county: 'San Bernardino', lat: 34.0922, lng: -117.4350 },
        { city: 'Rancho Cucamonga', county: 'San Bernardino', lat: 34.1064, lng: -117.5756 },
        { city: 'San Jose', county: 'Santa Clara', lat: 37.3382, lng: -121.8863 },
        { city: 'Sunnyvale', county: 'Santa Clara', lat: 37.3688, lng: -122.0363 },
        { city: 'Palo Alto', county: 'Santa Clara', lat: 37.4419, lng: -122.1430 },
        { city: 'Oakland', county: 'Alameda', lat: 37.8044, lng: -122.2712 },
        { city: 'Fremont', county: 'Alameda', lat: 37.5485, lng: -121.9886 },
        { city: 'Hayward', county: 'Alameda', lat: 37.6688, lng: -122.0808 },
        { city: 'Sacramento', county: 'Sacramento', lat: 38.5816, lng: -121.4944 },
        { city: 'Elk Grove', county: 'Sacramento', lat: 38.4088, lng: -121.3716 },
        { city: 'Fresno', county: 'Fresno', lat: 36.7468, lng: -119.7726 },
        { city: 'Bakersfield', county: 'Kern', lat: 35.3733, lng: -119.0187 },
        { city: 'San Francisco', county: 'San Francisco', lat: 37.7749, lng: -122.4194 },
        { city: 'Stockton', county: 'San Joaquin', lat: 37.9577, lng: -121.2908 },
        { city: 'Modesto', county: 'Stanislaus', lat: 37.6391, lng: -120.9969 },
        { city: 'Salinas', county: 'Monterey', lat: 36.6777, lng: -121.6555 },
        { city: 'Vallejo', county: 'Solano', lat: 38.1041, lng: -122.2566 },
        { city: 'El Centro', county: 'Imperial', lat: 32.7920, lng: -115.5631 },
        { city: 'Redding', county: 'Shasta', lat: 40.5865, lng: -122.3917 },
        { city: 'Chico', county: 'Butte', lat: 39.7285, lng: -121.8375 },
        { city: 'Visalia', county: 'Tulare', lat: 36.3302, lng: -119.2921 },
    ],  
    MD: [
      { city: 'Baltimore', county: 'Baltimore City', lat: 39.2904, lng: -76.6122 },
      { city: 'Silver Spring', county: 'Montgomery', lat: 38.9907, lng: -77.0261 },
      { city: 'Rockville', county: 'Montgomery', lat: 39.083997, lng: -77.152757 },
      { city: 'College Park', county: "Prince George's", lat: 38.9897, lng: -76.9378 },
      { city: 'Hagerstown', county: 'Washington', lat: 39.6418, lng: -77.7199 }
    ] ,
    TX: [
        { city: 'Houston', county: 'Harris', lat: 29.7604, lng: -95.3698 },
        { city: 'San Antonio', county: 'Bexar', lat: 29.4241, lng: -98.4936 },
        { city: 'Dallas', county: 'Dallas', lat: 32.7767, lng: -96.7970 },
        { city: 'Austin', county: 'Travis', lat: 30.2672, lng: -97.7431 },
        { city: 'Fort Worth', county: 'Tarrant', lat: 32.7555, lng: -97.3308 },
        { city: 'El Paso', county: 'El Paso', lat: 31.7619, lng: -106.4850 },
        { city: 'McAllen', county: 'Hidalgo', lat: 26.2034, lng: -98.2300 },
        { city: 'Laredo', county: 'Webb', lat: 27.5303, lng: -99.4897 },
    ],
    FL: [
        { city: 'Miami', county: 'Miami-Dade', lat: 25.7617, lng: -80.1918 },
        { city: 'Orlando', county: 'Orange', lat: 28.5383, lng: -81.3792 },
        { city: 'Tampa', county: 'Hillsborough', lat: 27.9506, lng: -82.4572 },
        { city: 'Jacksonville', county: 'Duval', lat: 30.3322, lng: -81.6557 },
        { city: 'Fort Lauderdale', county: 'Broward', lat: 26.1224, lng: -80.1373 },
        { city: 'Homestead', county: 'Miami-Dade', lat: 25.4687, lng: -80.4776 },
        { city: 'Immokalee', county: 'Collier', lat: 26.4173, lng: -81.4237 },
    ],
    NY: [ // Coordinates verified to be within New York state.
        { city: 'New York City (Bronx)', county: 'Bronx', lat: 40.8448, lng: -73.8648 },
        { city: 'New York City (Brooklyn)', county: 'Kings', lat: 40.6782, lng: -73.9442 },
        { city: 'New York City (Queens)', county: 'Queens', lat: 40.7282, lng: -73.7949 },
        { city: 'Buffalo', county: 'Erie', lat: 42.83, lng: -78.8784 }, // Adjusted south to avoid Canada
        { city: 'Rochester', county: 'Monroe', lat: 43.10, lng: -77.6088 }, // Adjusted south to avoid Canada
        { city: 'Hempstead', county: 'Nassau', lat: 40.7062, lng: -73.6187 },
        { city: 'Brentwood', county: 'Suffolk', lat: 40.7818, lng: -73.2459 },
    ],
    IL: [
        { city: 'Chicago (Pilsen)', county: 'Cook', lat: 41.8558, lng: -87.6657 },
        { city: 'Chicago (Little Village)', county: 'Cook', lat: 41.8488, lng: -87.7126 },
        { city: 'Aurora', county: 'Kane', lat: 41.7606, lng: -88.3201 },
        { city: 'Joliet', county: 'Will', lat: 41.5250, lng: -88.0817 },
        { city: 'Waukegan', county: 'Lake', lat: 42.3636, lng: -87.8448 },
        { city: 'Cicero', county: 'Cook', lat: 41.8456, lng: -87.7539 },
    ],
    AZ: [
        { city: 'Phoenix', county: 'Maricopa', lat: 33.4484, lng: -112.0740 },
        { city: 'Tucson', county: 'Pima', lat: 32.2226, lng: -110.9747 },
        { city: 'Mesa', county: 'Maricopa', lat: 33.4152, lng: -111.8315 },
        { city: 'Yuma', county: 'Yuma', lat: 32.6927, lng: -114.6277 },
        { city: 'Nogales', county: 'Santa Cruz', lat: 31.3391, lng: -110.9351 },
    ],
    GA: [
        { city: 'Atlanta', county: 'Fulton', lat: 33.7490, lng: -84.3880 },
        { city: 'Doraville', county: 'DeKalb', lat: 33.9068, lng: -84.2755 },
        { city: 'Gainesville', county: 'Hall', lat: 34.2979, lng: -83.8241 },
        { city: 'Dalton', county: 'Whitfield', lat: 34.7698, lng: -84.9702 },
        { city: 'Savannah', county: 'Chatham', lat: 32.0809, lng: -81.0912 },
    ]
};

const sightingTypesList: SightingType[] = ['checkpoint', 'detainment', 'sighting_motion', 'sighting_stationary', 'workplace_raid', 'residential', 'courthouse', 'other'];

const descriptions = [
    'seed_desc_1', 'seed_desc_2', 'seed_desc_3', 'seed_desc_4', 'seed_desc_5',
    'seed_desc_6', 'seed_desc_7', 'seed_desc_8', 'seed_desc_9', 'seed_desc_10',
    'seed_desc_11', 'seed_desc_12', 'seed_desc_13', 'seed_desc_14', 'seed_desc_15',
    'seed_desc_16', 'seed_desc_17', 'seed_desc_18', 'seed_desc_19', 'seed_desc_20',
    'seed_desc_21', 'seed_desc_22',
    'seed_desc_add_1', 'seed_desc_add_2', 'seed_desc_add_3', 'seed_desc_add_4',
    'seed_desc_add_5', 'seed_desc_add_6', 'seed_desc_add_7', 'seed_desc_add_8',
    'seed_desc_add_9', 'seed_desc_add_10', 'seed_desc_add_11', 'seed_desc_add_12',
    'seed_desc_add_13', 'seed_desc_add_14', 'seed_desc_add_15', 'seed_desc_add_16',
    'seed_desc_add_17', 'seed_desc_add_18', 'seed_desc_add_19', 'seed_desc_add_20',
    'seed_desc_add_21', 'seed_desc_add_22', 'seed_desc_add_23', 'seed_desc_add_24',
    'seed_desc_add_25', 'seed_desc_add_26', 'seed_desc_add_27', 'seed_desc_add_28',
    'seed_desc_add_29', 'seed_desc_add_30', 'seed_desc_add_31', 'seed_desc_add_32',
    'seed_desc_add_33', 'seed_desc_add_34', 'seed_desc_add_35', 'seed_desc_add_36',
    'seed_desc_add_37', 'seed_desc_add_38', 'seed_desc_add_39', 'seed_desc_add_40',
    'seed_desc_add_41', 'seed_desc_add_42', 'seed_desc_add_43', 'seed_desc_add_44',
    'seed_desc_add_45', 'seed_desc_add_46', 'seed_desc_add_47', 'seed_desc_add_48',
    'seed_desc_add_49', 'seed_desc_add_50', 'seed_desc_add_51', 'seed_desc_add_52',
    'seed_desc_add_53', 'seed_desc_add_54'
];

const seedImages = Object.values(SEED_IMAGES);

// Combine all locations into one big array for better random distribution
const allLocations = Object.entries(stateLocations).flatMap(([state, locs]) => 
    locs.map(loc => ({ ...loc, state }))
);

/**
 * Generates reports for the last 7 days with a specific day-over-day increasing trend.
 */
const generateLast7DaysReports = (
    locations: { city: string, county: string, lat: number, lng: number, state: string }[]
): Report[] => {
    const reports: Report[] = [];
    const now = new Date(); // Use the actual current date and time
    // Reports per day: today, yesterday, 2 days ago, ... 6 days ago
    const reportsPerDay = [14, 12, 10, 8, 6, 4, 2];

    let reportIdCounter = 0;

    for (let i = 0; i < reportsPerDay.length; i++) {
        const count = reportsPerDay[i];
        const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);

        for (let j = 0; j < count; j++) {
            const reportDate = new Date(date);
            // Randomize time within the day
            reportDate.setHours(Math.floor(Math.random() * 24));
            reportDate.setMinutes(Math.floor(Math.random() * 60));

            const locationIndex = (reportIdCounter + j) % locations.length;
            const loc = locations[locationIndex];
            const randomSightingType = sightingTypesList[(reportIdCounter + j) % sightingTypesList.length];
            const randomDescription = descriptions[(reportIdCounter + j) % descriptions.length];
            const randomImage = seedImages[(reportIdCounter + j) % seedImages.length];

            const latOffset = (Math.random() - 0.5) * 0.02;
            const lngOffset = (Math.random() - 0.5) * 0.02;

            reports.push({
                id: `gen-last7days-seed-${reportIdCounter + j}`,
                reporter: seedReporter,
                timestamp: reportDate.getTime(),
                location: {
                    latitude: loc.lat + latOffset,
                    longitude: loc.lng + lngOffset
                },
                description: randomDescription,
                photoBase64: randomImage,
                address: `${loc.city}, ${loc.state}`,
                area: `${loc.county}, ${loc.state}`,
                sightingType: randomSightingType,
            });
        }
        reportIdCounter += count;
    }
    return reports;
};

/**
 * Generates a specified number of reports scattered randomly between 8 and 30 days ago.
 */
const generateOlderReports = (
    locations: { city: string, county: string, lat: number, lng: number, state: string }[],
    count: number
): Report[] => {
    const reports: Report[] = [];
    const now = new Date(); // Use the actual current date and time
    const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const startDate = new Date(now.getTime() - thirtyDaysInMs);
    const endDate = new Date(now.getTime() - sevenDaysInMs);
    const timeRange = endDate.getTime() - startDate.getTime();

    for (let i = 0; i < count; i++) {
        const randomTime = startDate.getTime() + Math.random() * timeRange;
        const reportDate = new Date(randomTime);
        
        const locationIndex = i % locations.length;
        const loc = locations[locationIndex];
        const randomSightingType = sightingTypesList[i % sightingTypesList.length];
        const randomDescription = descriptions[i % descriptions.length];
        const randomImage = seedImages[i % seedImages.length];
        
        const latOffset = (Math.random() - 0.5) * 0.02;
        const lngOffset = (Math.random() - 0.5) * 0.02;

        reports.push({
            id: `gen-older-seed-${i}`,
            reporter: seedReporter,
            timestamp: reportDate.getTime(),
            location: {
                latitude: loc.lat + latOffset,
                longitude: loc.lng + lngOffset
            },
            description: randomDescription,
            photoBase64: randomImage,
            address: `${loc.city}, ${loc.state}`,
            area: `${loc.county}, ${loc.state}`,
            sightingType: randomSightingType,
        });
    }
    return reports;
};


const TOTAL_REPORTS = 930;
const LAST_7_DAYS_REPORTS_COUNT = 2 + 4 + 6 + 8 + 10 + 12 + 14; // 56
const OLDER_REPORTS_COUNT = TOTAL_REPORTS - LAST_7_DAYS_REPORTS_COUNT;

const last7DaysReports = generateLast7DaysReports(allLocations);
const olderReports = generateOlderReports(allLocations, OLDER_REPORTS_COUNT);

// Combine all reports and sort them by timestamp, newest first
export const initialReports: Report[] = [
    ...last7DaysReports,
    ...olderReports,
].sort(
  (a, b) => b.timestamp - a.timestamp
);
// This file is now a client-side fetcher for our serverless functions.
// It no longer contains any API keys or direct SDK calls.

export async function getAddressFromCoordinates(lat: number, lon: number): Promise<string> {
    try {
        const response = await fetch('/api/reverse-geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ lat, lon }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Reverse geocode failed: ${response.status} ${errorText}`);
            throw new Error(`Reverse geocode failed: ${response.statusText}`);
        }
        return await response.text();
    } catch (error) {
        console.error("Error fetching address from proxy:", error);
        // Fallback to coordinates to avoid breaking the UI
        return `Approx. location near ${lat.toFixed(3)}, ${lon.toFixed(3)}`;
    }
}

export async function getCoordinatesFromAddress(address: string): Promise<{lat: number, lng: number} | null> {
    try {
        const response = await fetch('/api/geocode', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ address }),
        });
        if (!response.ok) {
            const errorText = await response.text();
            console.error(`Geocode failed: ${response.status} ${errorText}`);
            throw new Error(`Geocode failed: ${response.statusText}`);
        }
        const parsed = await response.json();
        if(parsed.lat !== null && parsed.lng !== null) {
            return parsed;
        }
        return null;
    } catch (error) {
        console.error("Error fetching coordinates from proxy:", error);
        return null;
    }
}

export async function getAddressSuggestions(query: string, location?: { latitude: number, longitude: number }): Promise<string[]> {
    if (query.length < 3) {
        return [];
    }
    try {
        const response = await fetch('/api/address-suggestions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ query, location }),
        });
         if (!response.ok) {
            const errorText = await response.text();
            console.error(`Address suggestions failed: ${response.status} ${errorText}`);
            throw new Error(`Address suggestions failed: ${response.statusText}`);
        }
        const parsed = await response.json();
         if(Array.isArray(parsed)) {
            return parsed.filter(item => typeof item === 'string');
        }
        return [];
    } catch (error) {
        console.error("Error fetching address suggestions from proxy:", error);
        return [];
    }
}


import { useState, useEffect } from 'react';

function getStorageValue<T,>(key: string, defaultValue: T): T {
    if (typeof window !== 'undefined') {
        const saved = localStorage.getItem(key);
        if (saved !== null) {
            try {
                return JSON.parse(saved);
            } catch (error) {
                console.error(`Error parsing localStorage key "${key}":`, error);
                return defaultValue;
            }
        }
    }
    return defaultValue;
}

export const useLocalStorage = <T,>(key: string, defaultValue: T): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [value, setValue] = useState<T>(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error);
        }
    }, [key, value]);

    return [value, setValue];
};

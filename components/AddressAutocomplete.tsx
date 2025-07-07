

import React, { useState, useEffect, useRef } from 'react';
import { useDebounce } from '../hooks/useDebounce';
import { getAddressSuggestions } from '../api/gemini';
import { useLanguage } from '../contexts/LanguageContext';

interface AddressAutocompleteProps {
    initialValue: string;
    onValueChange: (value: string) => void;
    onSelect: (value: string) => void;
    placeholder?: string;
    id?: string;
}

const AddressAutocomplete: React.FC<AddressAutocompleteProps> = ({
    initialValue,
    onValueChange,
    onSelect,
    placeholder = "Enter an address",
    id,
}) => {
    const [inputValue, setInputValue] = useState(initialValue);
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [userLocation, setUserLocation] = useState<{latitude: number; longitude: number} | null>(null);
    const debouncedSearchTerm = useDebounce(inputValue, 400);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const { t } = useLanguage();

    useEffect(() => {
        setInputValue(initialValue);
    }, [initialValue]);

    // Get user's location once to provide better suggestions
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLocation({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            },
            (err) => {
                // Silently fail, suggestions will just not be location-biased
                console.warn('Could not get user location for suggestions:', err.message);
            },
            // Options: low accuracy is fine, don't need to re-fetch often.
            { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 * 60 * 60 }
        );
    }, []);

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (debouncedSearchTerm) {
                setIsLoading(true);
                const results = await getAddressSuggestions(debouncedSearchTerm, userLocation ?? undefined);
                setSuggestions(results);
                setIsLoading(false);
            } else {
                setSuggestions([]);
            }
        };

        if(showSuggestions){
          fetchSuggestions();
        }
    }, [debouncedSearchTerm, showSuggestions, userLocation]);
    
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
                setShowSuggestions(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setInputValue(value);
        onValueChange(value);
        if(!showSuggestions){
            setShowSuggestions(true);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setInputValue(suggestion);
        onSelect(suggestion);
        setSuggestions([]);
        setShowSuggestions(false);
    };

    return (
        <div className="relative w-full" ref={wrapperRef}>
            <input
                id={id}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder={placeholder}
                className="w-full px-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                autoComplete="off"
            />
            {showSuggestions && (inputValue.length > 2) && (
                <ul className="absolute z-20 w-full mt-1 bg-brand-surface border border-brand-primary rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {isLoading && <li className="px-4 py-2 text-brand-text-secondary">{t('loadingSuggestions')}</li>}
                    {!isLoading && suggestions.length > 0 &&
                        suggestions.map((suggestion, index) => (
                            <li
                                key={index}
                                onMouseDown={(e) => { e.preventDefault(); handleSuggestionClick(suggestion); }}
                                className="px-4 py-2 cursor-pointer text-brand-text hover:bg-brand-primary"
                            >
                                {suggestion}
                            </li>
                        ))
                    }
                    {!isLoading && suggestions.length === 0 && debouncedSearchTerm.length > 2 && (
                        <li className="px-4 py-2 text-brand-text-secondary">{t('noSuggestions')}</li>
                    )}
                </ul>
            )}
        </div>
    );
};

export default AddressAutocomplete;
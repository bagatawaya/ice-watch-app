import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Define types explicitly since we are fetching JSON at runtime
type Language = 'en' | 'es';
type Translations = Record<string, string>;
type AllTranslations = Record<Language, Translations>;
type TranslationVariables = Record<string, string | number>;

interface LanguageContextType {
    language: Language;
    setLanguage: (language: Language) => void;
    t: (key: string, variables?: TranslationVariables) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [language, setLanguage] = useLocalStorage<Language>('ice-alert-language', 'en');
    const [translations, setTranslations] = useState<AllTranslations | null>(null);

    // Update html lang attribute when language changes
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    // Fetch translation files on initial component mount
    useEffect(() => {
        const fetchTranslations = async () => {
            try {
                const [enResponse, esResponse] = await Promise.all([
                    // UPDATED: Changed './locales/' to './locals/' to match file path
                    fetch('./locals/en.json'),
                    fetch('./locals/es.json'),
                ]);

                if (!enResponse.ok || !esResponse.ok) {
                    throw new Error('Network response was not ok for one or more translation files.');
                }

                const enData = await enResponse.json();
                const esData = await esResponse.json();

                setTranslations({ en: enData, es: esData });
            } catch (error) {
                console.error("Failed to load translations:", error);
                // In case of error, we can set empty objects to avoid a crash
                // The `t` function will then just return the keys.
                setTranslations({ en: {}, es: {} });
            }
        };

        fetchTranslations();
    }, []);

    // Translation function
    const t = (key: string, variables?: TranslationVariables): string => {
        // Fallback to key if translations are not loaded yet
        if (!translations) {
            return key;
        }
        // Return translated string, with English as a fallback, and finally the key itself.
        let text = translations[language]?.[key] || translations.en?.[key] || key;

        if (variables) {
            for (const [varName, varValue] of Object.entries(variables)) {
                text = text.replace(new RegExp(`{{${varName}}}`, 'g'), String(varValue));
            }
        }

        return text;
    };

    // By removing the render-blocking check, the app is more resilient and will not show a blank screen.
    // It will render with keys first, then update once translations are loaded.
    return (
        <LanguageContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};

export const useLanguage = (): LanguageContextType => {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

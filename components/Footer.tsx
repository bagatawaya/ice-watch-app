

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface FooterProps {
    onNavigate: (page: 'help' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const { t } = useLanguage();
    return (
        <footer className="bg-brand-surface text-brand-text-secondary shadow-inner py-4 mt-auto">
            <div className="max-w-5xl mx-auto px-4 flex justify-center items-center space-x-6 text-sm">
                <button
                    onClick={() => onNavigate('terms')}
                    className="hover:text-brand-text transition-colors"
                >
                    {t('termsAndConditions')}
                </button>
            </div>
        </footer>
    );
};

export default Footer;

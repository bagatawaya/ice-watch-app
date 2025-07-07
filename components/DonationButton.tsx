
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface DonationButtonProps {
    onOpen: () => void;
}

const DonationButton: React.FC<DonationButtonProps> = ({ onOpen }) => {
    const { t } = useLanguage();
    
    // Positioned to avoid overlapping with other floating action buttons.
    // bottom-24 on mobile is above the Report/AI buttons.
    // top-6/right-6 on desktop is standard.
    const mobilePosition = `bottom-24 right-6`;
    const desktopPosition = `md:top-6 md:right-6 md:bottom-auto`;

    return (
         <button
            onClick={onOpen}
            className={`fixed z-50 group ${mobilePosition} ${desktopPosition} flex items-center bg-brand-surface border border-brand-primary hover:border-blue-400 text-brand-text font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-blue-500`}
            aria-label={t('donate')}
            title={t('supportOurWork')}
        >
            <span className="p-3 text-xl md:hidden" role="img" aria-label="blue heart">💙</span>
            <div className="hidden md:flex items-center gap-2 px-4 py-2">
                 <span className="text-xl" role="img" aria-label="blue heart">💙</span>
                 <span>{t('donate')}</span>
            </div>
        </button>
    );
};

export default DonationButton;

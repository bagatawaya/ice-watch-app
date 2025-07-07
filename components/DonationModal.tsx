
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { HeartIcon } from './icons';

interface DonationModalProps {
    onClose: () => void;
}

const DonationModal: React.FC<DonationModalProps> = ({ onClose }) => {
    const { t } = useLanguage();

    const ONE_TIME_URL = "https://buy.stripe.com/test_3cIdRb6RibRa5fp18I6EU01";
    const RECURRING_URL = "https://buy.stripe.com/test_fZu3cx5NeaN637h4kU6EU00";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-[60] p-4 animate-fade-in" onClick={onClose}>
            <div 
                className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-sm relative text-center p-8 border border-brand-primary"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-brand-secondary hover:text-brand-text text-3xl font-bold z-10"
                    aria-label={t('closeModal')}
                >
                    &times;
                </button>
                
                <HeartIcon className="h-12 w-12 text-blue-400 mx-auto mb-4" />

                <h2 className="text-2xl font-bold text-brand-text mb-2">{t('donationModalTitle')}</h2>
                <p className="text-brand-text-secondary mb-6">{t('donationModalDesc')}</p>

                <div className="space-y-4">
                    <a
                        href={ONE_TIME_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 text-lg"
                    >
                        {t('giveOnce')}
                    </a>
                    <a
                        href={RECURRING_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-brand-primary hover:bg-brand-secondary text-brand-text font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 text-lg"
                    >
                        {t('giveMonthly')}
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DonationModal;

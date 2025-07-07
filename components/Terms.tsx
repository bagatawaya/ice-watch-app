
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface TermsProps {
    onNavigateBack?: () => void;
}

const Terms: React.FC<TermsProps> = ({ onNavigateBack }) => {
    const { t } = useLanguage();

    const Section: React.FC<{titleKey: string, bodyKey: string}> = ({ titleKey, bodyKey }) => (
        <section>
            <h2 className="text-xl font-semibold text-brand-accent mb-2">{t(titleKey)}</h2>
            <p className="text-brand-text-secondary">{t(bodyKey)}</p>
        </section>
    );

    return (
        <main className="max-w-3xl mx-auto p-4 my-8">
            <div className="bg-brand-surface p-8 rounded-lg space-y-6">
                 <div className="flex justify-between items-start border-b border-brand-primary pb-4">
                    <div>
                        <h1 className="text-3xl font-bold text-brand-text">{t('termsTitle')}</h1>
                        <p className="text-sm text-brand-text-secondary mt-1">{t('termsLastUpdated')}</p>
                    </div>
                     {onNavigateBack && (
                        <button
                            onClick={onNavigateBack}
                            className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors flex-shrink-0"
                        >
                            {t('back')}
                        </button>
                    )}
                </div>

                <p className="text-brand-text-secondary">{t('termsIntro')}</p>

                <Section titleKey="termsUserContentTitle" bodyKey="termsUserContentBody" />
                <Section titleKey="termsDisclaimerTitle" bodyKey="termsDisclaimerBody" />
                <Section titleKey="termsLiabilityTitle" bodyKey="termsLiabilityBody" />
                <Section titleKey="termsAcceptanceTitle" bodyKey="termsAcceptanceBody" />
            </div>
        </main>
    );
};

export default Terms;

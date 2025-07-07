
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface HelpProps {
    onNavigateBack?: () => void;
}

const Help: React.FC<HelpProps> = ({ onNavigateBack }) => {
    const { t } = useLanguage();
    return (
        <main className="max-w-3xl mx-auto p-4">
            <div className="bg-brand-surface p-8 rounded-lg space-y-6">
                <div className="flex justify-between items-center border-b border-brand-primary pb-2">
                    <h1 className="text-3xl font-bold text-brand-text">{t('helpTitle')}</h1>
                     {onNavigateBack && (
                        <button
                            onClick={onNavigateBack}
                            className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                        >
                            {t('back')}
                        </button>
                    )}
                </div>

                <section>
                    <h2 className="text-xl font-semibold text-brand-accent mb-2">{t('helpMissionTitle')}</h2>
                    <p className="text-brand-text-secondary">
                        {t('helpMissionDesc')}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-brand-accent mb-2">{t('helpForVisitorsTitle')}</h2>
                    <p className="text-brand-text-secondary">
                        {t('helpForVisitorsDesc')}
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-brand-accent mb-2">{t('helpRegisteringTitle')}</h2>
                    <p className="text-brand-text-secondary">
                        {t('helpRegisteringDesc')}
                    </p>
                    <ul className="list-disc list-inside text-brand-text-secondary mt-2 space-y-1">
                        <li>{t('helpRegisteringPoint1')}</li>
                        <li>{t('helpRegisteringPoint2')}</li>
                        <li>{t('helpRegisteringPoint3')}</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-brand-accent mb-2">{t('helpNotificationsTitle')}</h2>
                    <p className="text-brand-text-secondary">
                        {t('helpNotificationsDesc')}
                    </p>
                </section>
                
                 <section>
                    <h2 className="text-xl font-semibold text-brand-accent mb-2">{t('helpGuidelinesTitle')}</h2>
                    <p className="text-brand-text-secondary">
                       {t('helpGuidelinesDesc')}
                    </p>
                </section>
            </div>
        </main>
    );
};

export default Help;

import React from 'react';
import { Lawyer } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { PhoneIcon, SmsIcon, GlobeIcon, UserIcon } from './icons';

interface LawyerCardProps {
    lawyer: Lawyer;
}

const LawyerCard: React.FC<LawyerCardProps> = ({ lawyer }) => {
    const { t } = useLanguage();

    const ActionButton: React.FC<{ href: string; label: string; children: React.ReactNode }> = ({ href, label, children }) => (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center gap-2 text-sm bg-brand-primary text-brand-text-secondary hover:bg-brand-accent hover:text-white rounded-md px-3 py-2 transition-colors"
        >
            {children}
            <span>{label}</span>
        </a>
    );

    return (
        <div className="bg-brand-surface rounded-lg shadow-md p-4 flex flex-col gap-3 border border-brand-primary/50">
            <div>
                <h3 className="font-bold text-lg text-brand-text">{lawyer.name}</h3>
                <p className="text-sm text-brand-text-secondary">{lawyer.firm}</p>
                <p className="text-sm text-brand-accent font-semibold">{lawyer.state}{lawyer.city ? `, ${lawyer.city}`: ''}</p>
            </div>

            <div className="flex flex-wrap gap-1">
                {lawyer.proBono && (
                     <span className="text-xs font-bold bg-green-800/50 text-green-300 px-2 py-1 rounded-full">{t('proBonoOnly')}</span>
                )}
                {lawyer.specialties.map(spec => (
                    <span key={spec} className="text-xs bg-brand-primary text-brand-text-secondary px-2 py-1 rounded-full">{spec}</span>
                ))}
            </div>

            {lawyer.languages.length > 0 && (
                <p className="text-xs text-brand-text-secondary">
                    <span className="font-bold">Languages:</span> {lawyer.languages.join(', ')}
                </p>
            )}

            <div className="flex items-center gap-2 pt-2 border-t border-brand-primary/20">
                {lawyer.phone && (
                    <>
                        <ActionButton href={`tel:${lawyer.phone}`} label={t('call')}>
                            <PhoneIcon className="h-4 w-4" />
                        </ActionButton>
                        <ActionButton href={`sms:${lawyer.phone}`} label={t('text')}>
                            <SmsIcon className="h-4 w-4" />
                        </ActionButton>
                    </>
                )}
                {lawyer.website && (
                    <ActionButton href={lawyer.website} label={t('website')}>
                        <GlobeIcon className="h-4 w-4" />
                    </ActionButton>
                )}
            </div>
        </div>
    );
};

export default LawyerCard;


import React from 'react';
import { IceFacility } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import FacilityMap from './FacilityMap';
import { BuildingOfficeIcon, ClockIcon, LocationPinIcon, EmailIcon } from './icons';

interface FacilityDetailProps {
    facility: IceFacility;
    onBack: () => void;
}

const FacilityDetail: React.FC<FacilityDetailProps> = ({ facility, onBack }) => {
    const { t } = useLanguage();
    const mapUrl = `https://www.google.com/maps?q=${facility.location.latitude},${facility.location.longitude}`;

    const InfoRow = ({ label, value, href, icon }: { label: string, value?: string, href?: string, icon: React.ReactNode }) => {
        if (!value) return null;
        const Component = href ? 'a' : 'p';
        const props = href ? { href, target: "_blank", rel: "noopener noreferrer", className: "text-brand-accent hover:underline break-all" } : { className: "text-brand-text break-words" };

        return (
            <div className="flex items-start gap-3 py-3">
                <div className="flex-shrink-0 text-brand-accent mt-1">{icon}</div>
                <div>
                    <p className="text-sm font-bold text-brand-text-secondary">{label}</p>
                    <Component {...props}>{value}</Component>
                </div>
            </div>
        );
    }


    return (
        <main className="min-h-screen bg-brand-bg py-8">
            <div className="max-w-4xl mx-auto px-4">
                <button
                    onClick={onBack}
                    className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors mb-6"
                >
                    &larr; {t('back')}
                </button>

                <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden animate-fade-in">
                    <div className="p-6 border-b border-brand-primary">
                        <div className="flex items-center gap-3">
                            <BuildingOfficeIcon className="h-8 w-8 text-brand-accent flex-shrink-0" />
                            <h1 className="text-2xl font-bold text-brand-text">{facility.name}</h1>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2">
                        {/* Left Column: Details */}
                        <div className="p-6">
                            <h2 className="text-lg font-bold text-brand-text mb-2">{t('facilityInfo')}</h2>
                            <div className="divide-y divide-brand-primary/50">
                                <InfoRow label={t('address')} value={facility.address} href={mapUrl} icon={<LocationPinIcon className="h-5 w-5" />} />
                                <InfoRow label={t('hoursOfOperation')} value={facility.hours} icon={<ClockIcon className="h-5 w-5" />} />
                            </div>

                             <h2 className="text-lg font-bold text-brand-text mt-6 mb-2">{t('contactInfo')}</h2>
                             <div className="divide-y divide-brand-primary/50">
                                <InfoRow label={t('phone')} value={facility.phone} href={`tel:${facility.phone}`} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>} />
                                <InfoRow label={t('email')} value={facility.email} href={`mailto:${facility.email}`} icon={<EmailIcon className="h-5 w-5" />} />
                                <InfoRow label={t('website')} value={facility.website} href={facility.website} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.998 5.998 0 0116 10c0 .954-.225 1.852-.625 2.644a.5.5 0 01-.866-.5A4.972 4.972 0 0015 10c0-.445-.078-.876-.22-1.282A2.498 2.498 0 0012.5 7.5a2.5 2.5 0 00-2.5 2.5V8a.5.5 0 01-1 0V7.5a.5.5 0 00-.5-.5 1.5 1.5 0 00-1.5 1.5v.054a.5.5 0 01-.968.25c-.287-.801-.73-1.524-1.29-2.122a.5.5 0 01.25-.968z" clipRule="evenodd" /><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.998 5.998 0 0116 10c0 .954-.225 1.852-.625 2.644a.5.5 0 01-.866-.5A4.972 4.972 0 0015 10c0-.445-.078-.876-.22-1.282A2.498 2.498 0 0012.5 7.5a2.5 2.5 0 00-2.5 2.5V8a.5.5 0 01-1 0V7.5a.5.5 0 00-.5-.5 1.5 1.5 0 00-1.5 1.5v.054a.5.5 0 01-.968.25c-.287-.801-.73-1.524-1.29-2.122a.5.5 0 01.25-.968z" clipRule="evenodd" /></svg>} />
                            </div>

                             {facility.notes && (
                                <>
                                    <h2 className="text-lg font-bold text-brand-text mt-6 mb-2">{t('notes')}</h2>
                                    <p className="text-brand-text-secondary text-sm italic p-3 bg-brand-primary/20 rounded-lg">{facility.notes}</p>
                                </>
                            )}
                        </div>

                        {/* Right Column: Map */}
                        <div className="w-full h-80 md:h-full bg-brand-primary">
                             <FacilityMap facilities={[facility]} onSelectFacility={() => {}} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default FacilityDetail;


import React, { useState } from 'react';
import { Report } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { LocationPinIcon, ClockIcon, UserIcon, PlayIcon } from './icons';
import { SightingTypeIcon } from './SightingTypeIcon';
import SocialShare from './SocialShare';
import MapComponent from './MapComponent';

interface ReportDetailProps {
    report: Report;
    onBack: () => void;
}

const ReportDetail: React.FC<ReportDetailProps> = ({ report, onBack }) => {
    const { language, t } = useLanguage();
    const [activeView, setActiveView] = useState<'map' | 'photo' | 'video'>('map');
    const locale = language === 'es' ? es : enUS;

    const mapUrl = `https://www.google.com/maps?q=${report.location.latitude},${report.location.longitude}`;
    
    const formattedDate = new Date(report.timestamp).toLocaleString(language, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    
    const translatedDescription = t(report.description);

    const renderActiveView = () => {
        switch (activeView) {
            case 'photo':
                return <img src={report.photoBase64} alt="Sighting" className="w-full h-full object-contain" />;
            case 'video':
                return report.videoBase64 ? <video controls autoPlay src={report.videoBase64} className="w-full h-full object-contain" /> : <MapComponent items={[report]} mode="reports" onSelectReport={() => {}} onSelectFacility={() => {}} isFiltered={true} disableInfoWindows={true} />;
            case 'map':
            default:
                return <MapComponent items={[report]} mode="reports" onSelectReport={() => {}} onSelectFacility={() => {}} isFiltered={true} disableInfoWindows={true} />;
        }
    };

    const Thumbnail = ({ type, onClick, isActive, children }: { type: 'map' | 'photo' | 'video', onClick: () => void, isActive: boolean, children: React.ReactNode }) => (
        <button
            onClick={onClick}
            className={`relative w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-surface ${
                isActive ? 'border-brand-accent scale-105 ring-brand-accent' : 'border-brand-primary hover:border-brand-accent'
            }`}
            aria-label={`View ${type}`}
        >
            {children}
        </button>
    );

    return (
        <main className="min-h-screen bg-brand-bg py-8">
            <div className="max-w-3xl mx-auto px-4">
                <button
                    onClick={onBack}
                    className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors mb-6"
                >
                    &larr; {t('back')}
                </button>

                <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden animate-fade-in">
                    {/* Main Media View */}
                    <div className="w-full h-96 bg-black flex items-center justify-center">
                        {renderActiveView()}
                    </div>

                    {/* Thumbnails */}
                    <div className="flex items-center justify-center gap-4 p-4 bg-brand-surface/50">
                        <Thumbnail type="map" isActive={activeView === 'map'} onClick={() => setActiveView('map')}>
                            <div className="w-full h-full bg-brand-primary text-brand-text flex items-center justify-center">
                                <LocationPinIcon className="h-8 w-8"/>
                            </div>
                            <div className="absolute inset-0 bg-black/20" />
                        </Thumbnail>

                        <Thumbnail type="photo" isActive={activeView === 'photo'} onClick={() => setActiveView('photo')}>
                            <img src={report.photoBase64} alt={t('previewAlt')} className="w-full h-full object-cover" />
                        </Thumbnail>

                        {report.videoBase64 && (
                            <Thumbnail type="video" isActive={activeView === 'video'} onClick={() => setActiveView('video')}>
                                <img src={report.photoBase64} alt="Video thumbnail" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                    <PlayIcon className="h-8 w-8 text-white/90" />
                                </div>
                            </Thumbnail>
                        )}
                    </div>

                    <div className="p-6">
                        <div className="mb-4 p-4 bg-brand-primary/20 rounded-lg">
                            <h2 className="text-lg font-bold text-brand-accent flex items-center gap-2">
                                <SightingTypeIcon type={report.sightingType} className="h-5 w-5" />
                                <span>{t(`sightingTypeName_${report.sightingType}`)}</span>
                            </h2>
                            <p className="text-brand-text-secondary mt-1 text-sm">{t(`sightingTypeDesc_${report.sightingType}`)}</p>
                            {report.sightingType === 'other' && report.sightingTypeOtherDescription && (
                                <p className="text-brand-text mt-2 pl-3 border-l-2 border-brand-accent/50 italic">"{report.sightingTypeOtherDescription}"</p>
                            )}
                        </div>

                        <div className="mb-4">
                             <h1 className="text-xl font-bold text-brand-text mb-2">{t('reportDescription')}</h1>
                             <p className="text-brand-text-secondary whitespace-pre-wrap">{translatedDescription}</p>
                        </div>

                        <div className="border-t border-brand-primary my-4"></div>
                        <SocialShare report={report} />
                        <div className="border-t border-brand-primary my-4"></div>

                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                            <div className="flex items-center text-brand-text-secondary mb-2 sm:mb-0">
                                <UserIcon className="h-5 w-5 mr-2" />
                                <span className="text-sm font-semibold">{report.reporter.username}</span>
                            </div>
                            <div className="flex items-center text-brand-text-secondary text-sm">
                                <ClockIcon className="h-5 w-5 mr-2 flex-shrink-0" />
                                <div className="flex flex-col sm:items-end">
                                    <span title={formattedDate}>
                                        {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true, locale } as any)}
                                    </span>
                                    <span className="text-xs text-brand-text-secondary/80 -mt-1">{formattedDate}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-start text-brand-text mb-4">
                            <LocationPinIcon className="h-6 w-6 mr-2 mt-1 flex-shrink-0" />
                            <a
                                href={mapUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-brand-accent hover:text-brand-accent-hover font-semibold break-words text-lg"
                            >
                                {report.address || `${report.location.latitude.toFixed(5)}, ${report.location.longitude.toFixed(5)}`}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ReportDetail;
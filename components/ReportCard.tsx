
import React, { useState, useEffect } from 'react';
import { Report } from '../types';
import { LocationPinIcon, ClockIcon, UserIcon, EditIcon, TrashIcon } from './icons';
import { formatDistanceToNow } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { useLanguage } from '../contexts/LanguageContext';
import { SightingTypeIcon } from './SightingTypeIcon';
import SocialShare from './SocialShare';
import { GOOGLE_MAPS_API_KEY } from '../config';

interface ReportCardProps {
  report: Report;
  isNew?: boolean;
  onSelect: (report: Report) => void;
  isAdminView?: boolean;
  onDelete?: (reportId: string) => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ report, isNew = false, onSelect, isAdminView = false, onDelete }) => {
  const [showNewBadge, setShowNewBadge] = useState(isNew);
  const [mapError, setMapError] = useState(false);
  const { language, t } = useLanguage();
  const [currentTime, setCurrentTime] = useState(Date.now());
  
  const locale = language === 'es' ? es : enUS;
  
  const TRUNCATE_LENGTH = 300;

  useEffect(() => {
    // Update the time every minute to keep the 'time ago' fresh
    const interval = setInterval(() => {
      setCurrentTime(Date.now());
    }, 60000);
    return () => clearInterval(interval);
  }, []);


  useEffect(() => {
    if (isNew) {
      const timer = setTimeout(() => {
        setShowNewBadge(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isNew]);

  const staticMapUrl = GOOGLE_MAPS_API_KEY ? `https://maps.googleapis.com/maps/api/staticmap?center=${report.location.latitude},${report.location.longitude}&zoom=14&size=600x200&maptype=roadmap&markers=color:red%7C${report.location.latitude},${report.location.longitude}&key=${GOOGLE_MAPS_API_KEY}` : null;
  
  const osmEmbedUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${report.location.longitude-0.01},${report.location.latitude-0.01},${report.location.longitude+0.01},${report.location.latitude+0.01}&layer=mapnik&marker=${report.location.latitude},${report.location.longitude}`;

  const formattedDate = new Date(report.timestamp).toLocaleString(language, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
  
  const translatedDescription = t(report.description); 
  const isTruncated = translatedDescription.length > TRUNCATE_LENGTH;
  const truncatedDescription = isTruncated ? translatedDescription.substring(0, TRUNCATE_LENGTH) + '...' : translatedDescription;


  return (
    <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden relative animate-fade-in transition-colors duration-200">
      <button 
        onClick={() => onSelect(report)}
        className="w-full text-left block hover:bg-brand-primary/50"
      >
        {showNewBadge && (
          <div className="absolute top-2 right-2 bg-brand-accent text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse z-10">
            {t('new')}
          </div>
        )}
        
        <div className="w-full h-40 bg-brand-primary flex items-center justify-center overflow-hidden">
          {(staticMapUrl && !mapError) ? (
            <img
              src={staticMapUrl}
              alt={`Map of ${report.address || 'sighting location'}`}
              className="w-full h-full object-cover"
              loading="lazy"
              onError={() => setMapError(true)}
            />
          ) : (
            <div className="relative w-full h-full" aria-label={t('noMapAvailable')}>
                  <iframe
                      width="100%"
                      height="100%"
                      frameBorder={0}
                      scrolling="no"
                      marginHeight={0}
                      marginWidth={0}
                      src={osmEmbedUrl}
                      title={`Map of ${report.address}`}
                      className="w-full h-full pointer-events-none"
                  ></iframe>
                   {mapError && (
                    <div className="absolute top-1 left-1 bg-yellow-900/80 backdrop-blur-sm text-yellow-200 text-xs px-2 py-1 rounded shadow" role="alert">
                        {t('noMapAvailable')}
                    </div>
                   )}
                  <div className="absolute top-0 left-0 w-full h-full bg-transparent"></div>
              </div>
          )}
        </div>

        <div className="p-4">
          <div className="flex items-center text-brand-accent text-sm font-semibold mb-2">
              <SightingTypeIcon type={report.sightingType} className="h-4 w-4 mr-2" />
              <span>{t(`sightingTypeName_${report.sightingType}`)}</span>
          </div>
          <p className="text-brand-text mb-3 min-h-[40px]">
              {truncatedDescription}
              {isTruncated && <span className="text-brand-accent font-semibold ml-1">{t('readMore')}</span>}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
            <div className="flex items-center text-brand-text-secondary mb-2 sm:mb-0">
              <UserIcon className="h-4 w-4 mr-2" />
              <span className="text-sm font-semibold">{report.reporter.username}</span>
            </div>
            <div className="flex items-center text-brand-text-secondary text-sm">
              <ClockIcon className="h-4 w-4 mr-2 flex-shrink-0" />
              <div className="flex flex-col sm:items-end">
                  <span title={formattedDate}>
                      {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true, locale } as any)}
                  </span>
                  <span className="text-xs text-brand-text-secondary/80 -mt-1">{formattedDate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-start text-brand-text">
            <LocationPinIcon className="h-5 w-5 mr-2 mt-1 flex-shrink-0" />
            <span className="text-brand-accent font-semibold break-words">
              {report.address || `${report.location.latitude.toFixed(5)}, ${report.location.longitude.toFixed(5)}`}
            </span>
          </div>
        </div>
      </button>
       <div className="px-4 pb-3 border-t border-brand-primary/20">
            <SocialShare report={report} size="sm" />
        </div>
        {isAdminView && onDelete && (
            <div className="bg-brand-primary/40 px-4 py-3 border-t border-brand-primary/60">
                <h4 className="text-xs font-bold text-brand-text-secondary uppercase tracking-wider mb-2">{t('adminActions')}</h4>
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => { /* Placeholder for edit functionality */ }}
                        className="flex-1 flex items-center justify-center gap-2 text-sm bg-brand-secondary/50 text-brand-text-secondary hover:bg-brand-secondary hover:text-brand-text rounded-md px-3 py-1.5 transition-colors"
                    >
                        <EditIcon className="h-4 w-4" />
                        <span>{t('editReport')}</span>
                    </button>
                    <button
                        onClick={() => onDelete(report.id)}
                        className="flex-1 flex items-center justify-center gap-2 text-sm bg-brand-danger/20 text-brand-danger hover:bg-brand-danger hover:text-white rounded-md px-3 py-1.5 transition-colors"
                    >
                        <TrashIcon className="h-4 w-4" />
                        <span>{t('deleteReport')}</span>
                    </button>
                </div>
            </div>
        )}
    </div>
  );
};

export default ReportCard;

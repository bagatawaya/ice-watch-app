
import React from 'react';
import { IceFacility } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import FacilityMap from './FacilityMap';
import { iceFacilities } from '../data/iceFacilities';
import { BuildingOfficeIcon } from './icons';

interface FacilitiesMapProps {
  onSelectFacility: (facility: IceFacility) => void;
}

const FacilitiesMap: React.FC<FacilitiesMapProps> = ({ onSelectFacility }) => {
    const { t } = useLanguage();
    
    return (
        <div className="flex flex-col" style={{ height: 'calc(100vh - 60px)' }}>
            <div className="bg-brand-surface p-4 shadow-md z-10">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-brand-primary/20 border border-brand-accent/30 p-3 rounded-lg text-center">
                        <div className="flex justify-center items-center gap-2 mb-1">
                            <BuildingOfficeIcon className="h-6 w-6 text-brand-accent" />
                            <h2 className="text-xl font-bold text-brand-text">{t('iceFacilitiesTitle')}</h2>
                        </div>
                        <p className="text-brand-text-secondary text-sm max-w-2xl mx-auto">
                            {t('iceFacilitiesDesc')}
                        </p>
                    </div>
                </div>
            </div>
          
            <main className="flex-grow relative bg-brand-primary">
                <FacilityMap 
                    facilities={iceFacilities} 
                    onSelectFacility={onSelectFacility} 
                />
            </main>
        </div>
    );
};

export default FacilitiesMap;
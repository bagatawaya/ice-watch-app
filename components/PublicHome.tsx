

import React, { useState, useEffect, useMemo } from 'react';
import { Report, IceFacility } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { AlertTriangleIcon } from './icons';
import MapComponent from './MapComponent';
import { iceFacilities } from '../data/iceFacilities';

interface PublicHomeProps {
  reports: Report[];
  onRegisterPress: () => void;
  onSelectReport: (report: Report) => void;
  onSelectFacility: (facility: IceFacility) => void;
}

const PublicHome: React.FC<PublicHomeProps> = ({ reports, onRegisterPress, onSelectReport, onSelectFacility }) => {
    const { t } = useLanguage();
    
    const [mapMode, setMapMode] = useState<'reports' | 'facilities'>('reports');
    const [selectedState, setSelectedState] = useState<string>('all');
    const [selectedCounty, setSelectedCounty] = useState<string>('all');
    const [timeRange, setTimeRange] = useState<string>('all');
    const [selectedFacilityState, setSelectedFacilityState] = useState<string>('all');

    const statesAndCounties = useMemo(() => {
        const data: { [state: string]: Set<string> } = {};
        reports.forEach(report => {
            if (report.area) {
                const parts = report.area.split(', ');
                if (parts.length === 2) {
                    const [county, state] = parts;
                    if (!data[state]) {
                        data[state] = new Set();
                    }
                    data[state].add(county);
                }
            }
        });
        Object.keys(data).forEach(state => {
            data[state] = new Set(Array.from(data[state]).sort());
        });
        return data;
    }, [reports]);

    const availableStates = useMemo(() => Object.keys(statesAndCounties).sort(), [statesAndCounties]);
    const availableCounties = useMemo(() => {
        return selectedState !== 'all' ? Array.from(statesAndCounties[selectedState] || []) : [];
    }, [selectedState, statesAndCounties]);

    useEffect(() => {
        setSelectedCounty('all');
    }, [selectedState]);

    const filteredReports = useMemo(() => {
        let results = reports;

        if (timeRange !== 'all') {
            const now = Date.now();
            const days = timeRange === '30d' ? 30 : 7;
            const cutoff = now - days * 24 * 60 * 60 * 1000;
            results = results.filter(r => r.timestamp >= cutoff);
        }

        if (selectedState !== 'all') {
            results = results.filter(r => r.area?.endsWith(`, ${selectedState}`));
        }

        if (selectedState !== 'all' && selectedCounty !== 'all') {
            results = results.filter(r => r.area?.startsWith(`${selectedCounty},`));
        }
        
        return results;
    }, [selectedState, selectedCounty, timeRange, reports]);

    const availableFacilityStates = useMemo(() => {
        const states = new Set(iceFacilities.map(f => f.state));
        return Array.from(states).sort();
    }, []);

    const filteredFacilities = useMemo(() => {
        if (selectedFacilityState === 'all') {
            return iceFacilities;
        }
        return iceFacilities.filter(facility => facility.state === selectedFacilityState);
    }, [selectedFacilityState]);

    const isFiltered = selectedState !== 'all' || timeRange !== 'all';
    
    const getButtonClass = (mode: 'reports' | 'facilities') => {
        return `px-4 py-2 text-sm font-bold rounded-md transition-colors ${
            mapMode === mode
            ? 'bg-brand-accent text-white'
            : 'bg-transparent text-brand-text-secondary hover:bg-brand-primary'
        }`;
    };

  return (
    <div className="flex flex-col">
        <div className="bg-brand-surface p-4 shadow-md z-10">
            <div className="max-w-7xl mx-auto">
                <div className="bg-brand-primary/20 border border-brand-accent/30 p-3 rounded-lg mb-4 text-center">
                    <div className="flex justify-center items-center gap-2 mb-1">
                        <AlertTriangleIcon className="h-6 w-6 text-brand-accent" />
                        <h2 className="text-xl font-bold text-brand-text">{t('publicHomeMarketingTitle')}</h2>
                    </div>
                    <p className="text-brand-text-secondary text-sm max-w-2xl mx-auto">
                        <button onClick={onRegisterPress} className="font-bold underline text-brand-accent hover:text-brand-accent-hover">
                          {t('publicHomeMarketingCTA')}
                        </button>
                        {' '}{t('publicHomeMarketingSubtitle')}
                    </p>
                </div>
                
                <div className="flex justify-center mb-4">
                    <div className="inline-flex rounded-lg shadow-sm bg-brand-primary p-1">
                        <button onClick={() => setMapMode('reports')} className={getButtonClass('reports')}>
                            {t('communityReports')}
                        </button>
                        <button onClick={() => setMapMode('facilities')} className={getButtonClass('facilities')}>
                            {t('iceFacilities')}
                        </button>
                    </div>
                </div>

                {mapMode === 'reports' && (
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
                      <div className="flex-1">
                          <label className="block text-sm font-bold text-brand-text-secondary mb-1">{t('filterByState')}</label>
                          <select 
                              value={selectedState} 
                              onChange={e => setSelectedState(e.target.value)}
                              className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
                              aria-label={t('filterByState')}
                          >
                              <option value="all">{t('allStates')}</option>
                              {availableStates.map(state => <option key={state} value={state}>{state}</option>)}
                          </select>
                      </div>
                      <div className="flex-1">
                          <label className="block text-sm font-bold text-brand-text-secondary mb-1">{t('filterByCounty')}</label>
                          <select 
                              value={selectedCounty} 
                              onChange={e => setSelectedCounty(e.target.value)}
                              disabled={selectedState === 'all'}
                              className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
                              aria-label={t('filterByCounty')}
                          >
                              <option value="all">{t('allCounties')}</option>
                              {availableCounties.map(county => <option key={county} value={county}>{county}</option>)}
                          </select>
                      </div>
                      <div className="flex-1">
                          <label className="block text-sm font-bold text-brand-text-secondary mb-1">{t('filterByTime')}</label>
                          <select 
                              value={timeRange} 
                              onChange={e => setTimeRange(e.target.value)}
                              className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
                              aria-label={t('filterByTime')}
                          >
                              <option value="all">{t('allTime')}</option>
                              <option value="30d">{t('past30Days')}</option>
                              <option value="7d">{t('past7Days')}</option>
                          </select>
                      </div>
                  </div>
                )}

                {mapMode === 'facilities' && (
                  <div className="animate-fade-in">
                      <label className="block text-sm font-bold text-brand-text-secondary mb-1">{t('filterByState')}</label>
                      <select 
                          value={selectedFacilityState} 
                          onChange={e => setSelectedFacilityState(e.target.value)}
                          className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
                          aria-label={t('filterByState')}
                      >
                          <option value="all">{t('allStates')}</option>
                          {availableFacilityStates.map(state => <option key={state} value={state}>{state}</option>)}
                      </select>
                  </div>
                )}
            </div>
        </div>
      
        <div className="flex-grow relative bg-brand-primary h-[75vh]">
            <MapComponent 
                items={mapMode === 'reports' ? filteredReports : filteredFacilities}
                mode={mapMode}
                onSelectReport={onSelectReport}
                onSelectFacility={onSelectFacility}
                isFiltered={mapMode === 'reports' ? isFiltered : selectedFacilityState !== 'all'}
            />
        </div>
    </div>
  );
};

export default PublicHome;
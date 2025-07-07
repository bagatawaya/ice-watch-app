

import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import { Report, IceFacility } from '../types';
import { getSightingTypeColor } from '../utils/mapHelpers';
import { useLanguage } from '../contexts/LanguageContext';
import { formatDistanceToNow } from 'date-fns';
import enUS from 'date-fns/locale/en-US';
import es from 'date-fns/locale/es';
import { ClockIcon, SpinnerIcon, BuildingOfficeIcon } from './icons';
import { SightingTypeIcon } from './SightingTypeIcon';
import { GOOGLE_MAPS_API_KEY, MAP_ID } from '../config';
import { getSightingTypeIconSVG } from '../utils/mapIconSVGs';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const libraries: ('marker')[] = ['marker'];

const mapOptions = {
  mapId: MAP_ID,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: true,
  zoomControl: true,
};

const defaultCenter = {
  lat: 39.8283,
  lng: -98.5795,
};

interface MapComponentProps {
    items: (Report | IceFacility)[];
    mode: 'reports' | 'facilities';
    onSelectReport: (report: Report) => void;
    onSelectFacility: (facility: IceFacility) => void;
    isFiltered?: boolean;
    disableInfoWindows?: boolean;
}

const MapComponent: React.FC<MapComponentProps> = ({ items, mode, onSelectReport, onSelectFacility, isFiltered, disableInfoWindows = false }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [map, setMap] = useState<any | null>(null);
  const [selectedItem, setSelectedItem] = useState<Report | IceFacility | null>(null);
  const { language, t } = useLanguage();
  const locale = language === 'es' ? es : enUS;
  const markersRef = useRef<any[]>([]);

  const onLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map || !(window as any).google) return;

    if (items.length > 0 && isFiltered) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      items.forEach(item => {
        bounds.extend({ lat: item.location.latitude, lng: item.location.longitude });
      });
      map.fitBounds(bounds, 20);

      const listener = (window as any).google.maps.event.addListenerOnce(map, 'idle', () => {
        if (map.getZoom()! > 16) map.setZoom(16);
        if (items.length === 1 && map.getZoom() < 14) map.setZoom(14);
      });

      return () => {
        if ((window as any).google?.maps?.event) {
          (window as any).google.maps.event.removeListener(listener);
        }
      };
    } else if (!isFiltered) {
        map.setCenter(defaultCenter);
        map.setZoom(4);
    }
  }, [map, items, isFiltered]);

  useEffect(() => {
    if (!map || !(window as any).google?.maps?.marker?.AdvancedMarkerElement) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (items.length > 0) {
      const newMarkers = items.map((item) => {
        let pinElement: HTMLDivElement;
        
        if(mode === 'reports') {
            const report = item as Report;
            pinElement = document.createElement('div');
            const iconPath = getSightingTypeIconSVG(report.sightingType);
            
            pinElement.innerHTML = `
            <div style="width: 28px; height: 40px; transform: translate(-50%, -100%); cursor: pointer;">
                <svg viewBox="0 0 32 32" style="width:100%; height:100%; overflow: visible; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.3));">
                    <path fill="${getSightingTypeColor(report.sightingType)}" stroke="#FFFFFF" stroke-width="1.5" d="M16,32C16,32,3.2,19.2,3.2,12.8C3.2,6.4,8.9,0,16,0S28.8,6.4,28.8,12.8C28.8,19.2,16,32,16,32z"/>
                    <g transform="translate(16, 12.8) scale(0.4) translate(-12, -12)">
                        <g fill="white" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            ${iconPath}
                        </g>
                    </g>
                </svg>
            </div>
            `;
        } else { // facilities mode
            pinElement = document.createElement('div');
            pinElement.innerHTML = `
              <div style="width: 28px; height: 40px; transform: translate(-50%, -100%); cursor: pointer;">
                <svg viewBox="0 0 32 32" style="width:100%; height:100%; overflow: visible; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.3));">
                  <path fill="#111827" stroke="#FFFFFF" stroke-width="1.5" d="M16,32C16,32,3.2,19.2,3.2,12.8C3.2,6.4,8.9,0,16,0S28.8,6.4,28.8,12.8C28.8,19.2,16,32,16,32z"/>
                  <path stroke="#FFFFFF" stroke-width="2" fill="none" d="M9,18V10h14v8M9,14h14M13,10v-3h6v3"/>
                </svg>
              </div>
            `;
        }

        const advancedMarker = new (window as any).google.maps.marker.AdvancedMarkerElement({
          position: { lat: item.location.latitude, lng: item.location.longitude },
          map,
          title: mode === 'reports' ? t(`sightingTypeName_${(item as Report).sightingType}`) : (item as IceFacility).name,
          content: pinElement,
        });

        if (!disableInfoWindows) {
          advancedMarker.addListener('click', () => setSelectedItem(item));
        }

        return advancedMarker;
      });

      markersRef.current = newMarkers;
    }
  }, [map, items, t, mode, disableInfoWindows]);

  const fallbackMapUrl = useMemo(() => {
    if (items.length === 0) {
      const bbox = '-125.0,24.3,-66.9,49.3';
      return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik`;
    }

    const latitudes = items.map(r => r.location.latitude);
    const longitudes = items.map(r => r.location.longitude);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latPadding = (maxLat - minLat) * 0.15 || 0.1;
    const lngPadding = (maxLng - minLng) * 0.15 || 0.1;

    const bbox = `${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}`;
    const markersString = items.map(r => `marker=${r.location.latitude},${r.location.longitude}`).join('&');

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markersString}`;
  }, [items]);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedItem(null);
  }, []);

  const handleReportDetailsClick = useCallback(() => {
    if (selectedItem && 'reporter' in selectedItem) onSelectReport(selectedItem as Report);
  }, [selectedItem, onSelectReport]);

  const handleFacilityDetailsClick = useCallback(() => {
    if (selectedItem && !('reporter' in selectedItem)) onSelectFacility(selectedItem as IceFacility);
  }, [selectedItem, onSelectFacility]);

  if (loadError) {
    console.error("Google Maps API failed to load, likely due to an invalid API key. Displaying fallback map.", loadError);
    return (
      <div className="w-full h-full flex flex-col bg-brand-primary">
        <div className="p-2 bg-yellow-900/50 border-b border-yellow-700 text-center text-xs text-yellow-200" role="alert">
          <p><strong>{t('noMapAvailable')}:</strong> A basic fallback map is shown because Google Maps could not load.</p>
        </div>
        {fallbackMapUrl ? (
          <iframe
            title={t('noMapAvailable')}
            src={fallbackMapUrl}
            className="w-full h-full border-0"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-brand-text-secondary">{t('noMapAvailable')}</p>
          </div>
        )}
      </div>
    );
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-full">
        <SpinnerIcon className="w-12 h-12 text-brand-accent" />
      </div>
    );
  }

  const getInfoWindowOptions = () => {
    const options: { minWidth: number; maxWidth: number; pixelOffset?: any } = {
      minWidth: 300,
      maxWidth: 300,
    };
    const google = (window as any).google;
    if (google?.maps?.Size) {
      options.pixelOffset = new google.maps.Size(0, -50);
    }
    return options;
  };
  
  const renderInfoWindowContent = () => {
    if (!selectedItem) return null;

    if ('reporter' in selectedItem) { // It's a Report
      const report = selectedItem as Report;
      return (
        <div className="p-1 font-sans bg-brand-surface text-brand-text rounded-md w-full">
          <div className="flex items-center text-brand-accent text-base font-semibold mb-2">
            <SightingTypeIcon type={report.sightingType} className="h-5 w-5 mr-2" />
            <span>{t(`sightingTypeName_${report.sightingType}`)}</span>
          </div>
          <p className="text-sm text-brand-text-secondary mb-2 leading-tight max-h-24 overflow-y-auto">
            {t(report.description)}
          </p>
          <p className="text-xs font-semibold text-brand-accent mb-2 truncate">{report.address}</p>
          <div className="flex justify-between items-center text-brand-text-secondary text-xs">
            <div className="flex items-center">
              <ClockIcon className="h-4 w-4 mr-1" />
              <span title={new Date(report.timestamp).toLocaleString(language)}>
                {formatDistanceToNow(new Date(report.timestamp), { addSuffix: true, locale } as any)}
              </span>
            </div>
            <button
              onClick={handleReportDetailsClick}
              className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-1 px-3 rounded-md transition-colors"
            >
              {t('readMore')}
            </button>
          </div>
        </div>
      );
    } else { // It's an IceFacility
      const facility = selectedItem as IceFacility;
      return (
         <div className="p-1 font-sans bg-brand-surface text-brand-text rounded-md w-full">
            <div className="flex items-start text-brand-text text-base font-bold mb-2 gap-2">
                <BuildingOfficeIcon className="h-5 w-5 mr-1 text-brand-accent flex-shrink-0 mt-0.5" />
                <span>{facility.name}</span>
            </div>
            <p className="text-sm text-brand-text-secondary mb-3 leading-tight">{facility.address}</p>
            <div className="flex justify-end items-center">
              <button onClick={handleFacilityDetailsClick} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-1 px-3 rounded-md transition-colors">
                {t('seeDetails')}
              </button>
            </div>
          </div>
      );
    }
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {!disableInfoWindows && selectedItem && (
        <InfoWindowF
          position={{
            lat: selectedItem.location.latitude,
            lng: selectedItem.location.longitude,
          }}
          onCloseClick={handleInfoWindowClose}
          options={getInfoWindowOptions()}
        >
          {renderInfoWindowContent()}
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default MapComponent;

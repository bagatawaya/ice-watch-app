
import React, { useState, useCallback, useMemo, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, InfoWindowF } from '@react-google-maps/api';
import { IceFacility } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { SpinnerIcon, BuildingOfficeIcon } from './icons';
import { GOOGLE_MAPS_API_KEY, MAP_ID } from '../config';

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

interface FacilityMapProps {
  facilities: IceFacility[];
  onSelectFacility: (facility: IceFacility) => void;
}

const FacilityMap: React.FC<FacilityMapProps> = ({ facilities, onSelectFacility }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY || '',
    libraries,
  });

  const [map, setMap] = useState<any | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<IceFacility | null>(null);
  const { t } = useLanguage();
  const markersRef = useRef<any[]>([]);

  const onLoad = useCallback((mapInstance: any) => {
    setMap(mapInstance);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map || !(window as any).google) return;

    if (facilities.length > 0) {
      const bounds = new (window as any).google.maps.LatLngBounds();
      facilities.forEach(facility => {
        bounds.extend({ lat: facility.location.latitude, lng: facility.location.longitude });
      });
      map.fitBounds(bounds, 20);

      const listener = (window as any).google.maps.event.addListenerOnce(map, 'idle', () => {
        if (map.getZoom()! > 16) map.setZoom(16);
        if (facilities.length === 1 && map.getZoom()! < 14) map.setZoom(14);
      });

      return () => {
        if ((window as any).google?.maps?.event) {
          (window as any).google.maps.event.removeListener(listener);
        }
      };
    } else {
      map.setCenter(defaultCenter);
      map.setZoom(4);
    }
  }, [map, facilities]);

  useEffect(() => {
    if (!map || !(window as any).google?.maps?.marker?.AdvancedMarkerElement) return;

    markersRef.current.forEach((marker) => marker.setMap(null));
    markersRef.current = [];

    if (facilities.length > 0) {
      const newMarkers = facilities.map((facility) => {
        const pinElement = document.createElement('div');
        pinElement.innerHTML = `
          <div style="width: 28px; height: 40px; transform: translate(-50%, -100%); cursor: pointer;">
            <svg viewBox="0 0 32 32" style="width:100%; height:100%; overflow: visible; filter: drop-shadow(0px 2px 2px rgba(0,0,0,0.3));">
              <path fill="#111827" stroke="#FFFFFF" stroke-width="1.5" d="M16,32C16,32,3.2,19.2,3.2,12.8C3.2,6.4,8.9,0,16,0S28.8,6.4,28.8,12.8C28.8,19.2,16,32,16,32z"/>
              <path stroke="#FFFFFF" stroke-width="2" fill="none" d="M9,18V10h14v8M9,14h14M13,10v-3h6v3"/>
            </svg>
          </div>
        `;
        
        const advancedMarker = new (window as any).google.maps.marker.AdvancedMarkerElement({
          position: { lat: facility.location.latitude, lng: facility.location.longitude },
          map,
          title: facility.name,
          content: pinElement,
        });

        advancedMarker.addListener('click', () => setSelectedFacility(facility));

        return advancedMarker;
      });

      markersRef.current = newMarkers;
    }
  }, [map, facilities, t]);


  const fallbackMapUrl = useMemo(() => {
    const latitudes = facilities.map(r => r.location.latitude);
    const longitudes = facilities.map(r => r.location.longitude);
    const minLat = Math.min(...latitudes);
    const maxLat = Math.max(...latitudes);
    const minLng = Math.min(...longitudes);
    const maxLng = Math.max(...longitudes);

    const latPadding = (maxLat - minLat) * 0.15 || 0.1;
    const lngPadding = (maxLng - minLng) * 0.15 || 0.1;

    const bbox = `${minLng - lngPadding},${minLat - latPadding},${maxLng + lngPadding},${maxLat + latPadding}`;
    const markersString = facilities.map(r => `marker=${r.location.latitude},${r.location.longitude}`).join('&');

    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&${markersString}`;
  }, [facilities]);

  const handleInfoWindowClose = useCallback(() => {
    setSelectedFacility(null);
  }, []);

  const handleDetailsClick = useCallback(() => {
    if (selectedFacility) onSelectFacility(selectedFacility);
  }, [selectedFacility, onSelectFacility]);

  if (loadError) {
    return (
      <div className="w-full h-full flex flex-col bg-brand-primary">
        <div className="p-2 bg-yellow-900/50 border-b border-yellow-700 text-center text-xs text-yellow-200" role="alert">
          <strong>{t('noMapAvailable')}</strong>
        </div>
        <iframe title={t('noMapAvailable')} src={fallbackMapUrl} className="w-full h-full border-0" />
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
    const options: { minWidth: number; maxWidth: number; pixelOffset?: any } = { minWidth: 280, maxWidth: 300 };
    if ((window as any).google?.maps?.Size) {
      options.pixelOffset = new (window as any).google.maps.Size(0, -50);
    }
    return options;
  };

  return (
    <GoogleMap mapContainerStyle={containerStyle} options={mapOptions} onLoad={onLoad} onUnmount={onUnmount}>
      {selectedFacility && (
        <InfoWindowF
          position={{ lat: selectedFacility.location.latitude, lng: selectedFacility.location.longitude }}
          onCloseClick={handleInfoWindowClose}
          options={getInfoWindowOptions()}
        >
          <div className="p-1 font-sans bg-brand-surface text-brand-text rounded-md w-full">
            <div className="flex items-start text-brand-text text-base font-bold mb-2 gap-2">
                <BuildingOfficeIcon className="h-5 w-5 mr-1 text-brand-accent flex-shrink-0 mt-0.5" />
                <span>{selectedFacility.name}</span>
            </div>
            <p className="text-sm text-brand-text-secondary mb-3 leading-tight">{selectedFacility.address}</p>
            <div className="flex justify-end items-center">
              <button onClick={handleDetailsClick} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-1 px-3 rounded-md transition-colors">
                {t('seeDetails')}
              </button>
            </div>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  );
};

export default FacilityMap;
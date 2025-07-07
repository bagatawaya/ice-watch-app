


import React, { useState, useEffect, useMemo } from 'react';
import { User } from '../types';
import { getCoordinatesFromAddress, getAddressFromCoordinates } from '../api/gemini';
import { useLanguage } from '../contexts/LanguageContext';
import AddressAutocomplete from './AddressAutocomplete';
import { CrosshairIcon, SpinnerIcon } from './icons';

interface SettingsProps {
    user: User;
    onSave: (user: User) => void;
    onNavigate: (page: 'dashboard') => void;
}

const Settings: React.FC<SettingsProps> = ({ user, onSave, onNavigate }) => {
    const { t } = useLanguage();
    const [settings, setSettings] = useState(user.notificationSettings);
    const [address, setAddress] = useState(user.notificationSettings.location?.address || '');
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState('');
    const [saved, setSaved] = useState(false);
    const [geolocationStatus, setGeolocationStatus] = useState('');
    const [geolocationLoading, setGeolocationLoading] = useState(false);
    
    const [allStatesAndCounties, setAllStatesAndCounties] = useState<{ [state: string]: string[] }>({});
    const [selectedState, setSelectedState] = useState(user.state || '');
    const [selectedCounty, setSelectedCounty] = useState(user.county || '');

    useEffect(() => {
        fetch('/data/statesAndCounties.json')
            .then(res => res.json())
            .then(data => {
                if (data) {
                    setAllStatesAndCounties(data);
                }
            })
            .catch(err => console.error("Failed to load states and counties", err));
    }, []);

    const availableStates = useMemo(() => allStatesAndCounties ? Object.keys(allStatesAndCounties).sort() : [], [allStatesAndCounties]);
    const availableCounties = useMemo(() => {
        return (selectedState && allStatesAndCounties) ? allStatesAndCounties[selectedState] || [] : [];
    }, [selectedState, allStatesAndCounties]);

    useEffect(() => {
        // Reset county if state changes and the old county is not in the new state's list
        if (selectedState && allStatesAndCounties && allStatesAndCounties[selectedState] && !allStatesAndCounties[selectedState].includes(selectedCounty)) {
            setSelectedCounty('');
        }
    }, [selectedState, selectedCounty, allStatesAndCounties]);


    const handleGeolocationClick = () => {
        setGeolocationLoading(true);
        setGeolocationStatus(t('locating'));
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    const foundAddress = await getAddressFromCoordinates(latitude, longitude);
                    setAddress(foundAddress);
                    setGeolocationStatus(t('locationFoundVerify')); 
                } catch (error) {
                    console.error("Failed to get address from coordinates", error);
                    setGeolocationStatus(t('locationAddressError'));
                } finally {
                    setGeolocationLoading(false);
                }
            },
            (error) => {
                let statusMessage = '';
                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        statusMessage = t('locationPermissionDenied');
                        break;
                    case error.POSITION_UNAVAILABLE:
                        statusMessage = t('locationPositionUnavailable');
                        break;
                    case error.TIMEOUT:
                        statusMessage = t('locationTimeout');
                        break;
                    default:
                        statusMessage = t('locationGpsError');
                        break;
                }
                setGeolocationStatus(statusMessage);
                setGeolocationLoading(false);
                console.error(`Geolocation error: ${error.message} (Code: ${error.code})`);
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    };

    const handleSave = async () => {
        setIsSaving(true);
        setError('');
        setSaved(false);
        setGeolocationStatus('');

        let newLocation = settings.location;

        if (address.trim() && address.trim().toLowerCase() !== (settings.location?.address || '').toLowerCase()) {
            const coords = await getCoordinatesFromAddress(address);
            if (coords) {
                newLocation = { latitude: coords.lat, longitude: coords.lng, address: address.trim() };
            } else {
                setError(t('locationNotFoundSettings'));
                setIsSaving(false);
                return;
            }
        } else if (!address.trim()) {
            newLocation = undefined;
        }

        const finalSettings = {
            ...settings,
            location: newLocation,
            phoneNumber: settings.sms ? settings.phoneNumber : '' // Clear phone number if SMS is off
        }

        onSave({ 
            ...user, 
            state: selectedState,
            county: selectedCounty,
            notificationSettings: finalSettings
        });

        setIsSaving(false);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <main className="max-w-3xl mx-auto p-4">
            <div className="bg-brand-surface p-8 rounded-lg">
                <h1 className="text-2xl font-bold text-brand-text mb-6">{t('notificationSettings')}</h1>

                <div className="mb-6 border-b border-brand-primary pb-6">
                    <h2 className="text-lg font-bold text-brand-text-secondary mb-2">{t('yourLocation')}</h2>
                    <p className="text-sm text-brand-text-secondary mb-4">{t('yourLocationDesc')}</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-brand-text-secondary mb-1">{t('state')}</label>
                            <select value={selectedState} onChange={e => setSelectedState(e.target.value)} required className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent">
                                <option value="">{t('selectState')}</option>
                                {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-sm font-bold text-brand-text-secondary mb-1">{t('county')}</label>
                            <select value={selectedCounty} onChange={e => setSelectedCounty(e.target.value)} required disabled={!selectedState} className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50">
                                <option value="">{t('selectCounty')}</option>
                                {availableCounties.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>
                </div>
                
                <div className="mb-6 border-b border-brand-primary pb-6">
                    <label htmlFor="location-settings" className="block text-brand-text-secondary font-bold mb-2">{t('notificationLocation')}</label>
                    <p className="text-sm text-brand-text-secondary mb-2">{t('notificationLocationDesc')}</p>
                    
                    <div className="relative flex items-center gap-2">
                        <div className="flex-grow">
                            <AddressAutocomplete
                                id="location-settings"
                                initialValue={address}
                                onValueChange={setAddress}
                                onSelect={setAddress}
                                placeholder={t('addressPlaceholderSettings')}
                            />
                        </div>
                        <button 
                            type="button" 
                            onClick={handleGeolocationClick} 
                            disabled={geolocationLoading} 
                            className="p-2 text-brand-secondary hover:text-brand-text disabled:opacity-50 disabled:cursor-wait bg-brand-primary rounded-lg"
                            title={t('useMyLocation')}
                            aria-label={t('useMyLocation')}
                        >
                            {geolocationLoading ? <SpinnerIcon className="h-5 w-5"/> : <CrosshairIcon className="h-5 w-5"/>}
                        </button>
                    </div>

                    {geolocationStatus && <p className="text-sm text-brand-accent mt-2">{geolocationStatus}</p>}
                </div>

                <div className="mb-6">
                    <label htmlFor="radius" className="block text-brand-text-secondary font-bold mb-2">{t('notificationRadius')}</label>
                    <p className="text-sm text-brand-text-secondary mb-2">{t('notificationRadiusDesc')}</p>
                    <div className="flex items-center gap-4">
                        <input
                            id="radius"
                            type="range"
                            min="1"
                            max="30"
                            step="1"
                            value={settings.radius}
                            onChange={(e) => setSettings({ ...settings, radius: Number(e.target.value) })}
                            className="w-full"
                        />
                        <span className="font-bold text-brand-accent w-20 text-center">{settings.radius} {t('miles')}</span>
                    </div>
                </div>

                <div className="mb-8">
                    <h3 className="text-lg font-bold text-brand-text-secondary mb-2">{t('notificationMethods')}</h3>
                    <p className="text-sm text-brand-text-secondary mb-4">{t('notificationMethodsDesc')}</p>
                    <div className="space-y-2">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={settings.popup} onChange={e => setSettings({...settings, popup: e.target.checked})} className="h-5 w-5 rounded text-brand-accent focus:ring-brand-accent" />
                            <span className="text-brand-text">{t('inAppPopup')}</span>
                        </label>
                         <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={settings.email} onChange={e => setSettings({...settings, email: e.target.checked})} className="h-5 w-5 rounded text-brand-accent focus:ring-brand-accent" />
                            <span className="text-brand-text">{t('emailNotification')}</span>
                        </label>
                         <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={settings.sms} onChange={e => setSettings({...settings, sms: e.target.checked})} className="h-5 w-5 rounded text-brand-accent focus:ring-brand-accent" />
                            <span className="text-brand-text">{t('smsTextMessage')}</span>
                        </label>
                        {settings.sms && (
                            <div className="pl-8 pt-2 transition-all duration-300 ease-in-out">
                                <label htmlFor="phone" className="block text-brand-text-secondary text-sm font-bold mb-2">{t('mobileNumber')}</label>
                                <input
                                    id="phone"
                                    type="tel"
                                    placeholder="123-456-7890"
                                    value={settings.phoneNumber || ''}
                                    onChange={(e) => setSettings({ ...settings, phoneNumber: e.target.value })}
                                    className="w-full max-w-sm px-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                                />
                            </div>
                        )}
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

                <div className="flex justify-end items-center gap-4">
                    {saved && <span className="text-green-400">{t('settingsSaved')}</span>}
                    <button onClick={() => onNavigate('dashboard')} className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-6 rounded-lg transition-colors">{t('back')}</button>
                    <button onClick={handleSave} disabled={isSaving} className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-6 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed">
                        {isSaving ? t('saving') : t('saveChanges')}
                    </button>
                </div>
            </div>
        </main>
    );
};

export default Settings;
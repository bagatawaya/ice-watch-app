

import React, { useState, useRef } from 'react';
import { User, Report, SightingType } from '../types';
import { CameraIcon, VideoIcon, HelpCircleIcon } from './icons';
import { getAddressFromCoordinates, getCoordinatesFromAddress } from '../api/gemini';
import { useLanguage } from '../contexts/LanguageContext';
import AddressAutocomplete from './AddressAutocomplete';
import { sightingTypes } from '../data/sightingTypes';

interface ReportModalProps {
  currentUser: User;
  onClose: () => void;
  onAddReport: (report: Omit<Report, 'id'| 'reporter' | 'timestamp'>) => void;
}

const SightingTypeHelpModal: React.FC<{onClose: () => void}> = ({ onClose }) => {
    const { t } = useLanguage();
    return (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 animate-fade-in">
             <div className="bg-brand-bg border border-brand-primary rounded-lg shadow-2xl w-full max-w-2xl relative max-h-[80vh] overflow-y-auto">
                <div className="sticky top-0 bg-brand-surface p-4 border-b border-brand-primary flex justify-between items-center">
                    <h3 className="text-xl font-bold text-brand-text">{t('sightingTypeHelpTitle')}</h3>
                    <button onClick={onClose} className="text-brand-secondary hover:text-brand-text text-3xl font-bold z-10" aria-label={t('closeModal')}>
                        &times;
                    </button>
                </div>
                <div className="p-6 space-y-4">
                    {sightingTypes.map(type => (
                        <div key={type.id} className="p-3 bg-brand-surface rounded-md">
                            <h4 className="font-bold text-brand-accent">{t(type.nameKey)}</h4>
                            <p className="text-sm text-brand-text-secondary mt-1">{t(type.descriptionKey)}</p>
                            <p className="text-xs text-brand-text-secondary/80 mt-2">
                                <span className="font-semibold">{t('whyUseful')}:</span> {t(type.usefulnessKey)}
                            </p>
                        </div>
                    ))}
                </div>
             </div>
        </div>
    );
}


const ReportModal: React.FC<ReportModalProps> = ({ currentUser, onClose, onAddReport }) => {
  const [step, setStep] = useState(1);
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState<{latitude: number; longitude: number;} | null>(null);
  const [isLocationConfirmed, setIsLocationConfirmed] = useState(false);
  const [isHuman, setIsHuman] = useState(false);
  const [sightingType, setSightingType] = useState<SightingType>('sighting_stationary');
  const [otherDescription, setOtherDescription] = useState('');
  const [showHelp, setShowHelp] = useState(false);


  const { t } = useLanguage();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setError('');
      if (file.type.startsWith('image/')) {
        setMediaType('image');
      } else if (file.type.startsWith('video/')) {
        setMediaType('video');
      } else {
        setError(t('unsupportedFileType'));
        return;
      }

      setMediaFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMediaPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = async () => {
    if (!mediaFile) {
        setError(t('photoOrVideoRequired'));
        return;
    }
    setIsLoading(true);
    setError('');

    try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            });
        });
        const { latitude, longitude } = position.coords;
        const foundAddress = await getAddressFromCoordinates(latitude, longitude);
        setLocation({ latitude, longitude });
        setAddress(foundAddress);
        setIsLocationConfirmed(true);
    } catch (err) {
        console.warn('Could not auto-detect location. User will need to enter manually.', err);
        // Proceed to next step for manual entry
    } finally {
        setIsLoading(false);
        setStep(2);
    }
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.trim()) {
      setError(t('addressRequired')); 
      return;
    }
    if (sightingType === 'other' && !otherDescription.trim()) {
        setError(t('otherSightingDescriptionRequired'));
        return;
    }
    if (!description.trim()) {
        setError(t('reportDescriptionRequired'));
        return;
    }
    if (!isHuman) {
        setError("Please confirm you are not a robot.");
        return;
    }

    setIsLoading(true);
    setError('');

    try {
        let finalLocation = location;
        let finalAddress = address;

        if (!isLocationConfirmed || !finalLocation) {
             const coords = await getCoordinatesFromAddress(finalAddress);
            if (coords) {
                finalLocation = { latitude: coords.lat, longitude: coords.lng };
            } else {
                setError(t('locationNotFoundSettings'));
                setIsLoading(false);
                return;
            }
        }

      const newReportData = {
        location: finalLocation!,
        photoBase64: mediaType === 'image' ? mediaPreview! : '',
        videoBase64: mediaType === 'video' ? mediaPreview! : undefined,
        address: finalAddress,
        description: description,
        sightingType: sightingType,
        sightingTypeOtherDescription: sightingType === 'other' ? otherDescription : undefined,
      };

      onAddReport(newReportData);
      onClose();

    } catch (err) {
        console.error('Error creating report:', err);
        setError(t('reportCreationError'));
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep1 = () => (
    <div className="p-8">
        <h2 className="text-2xl font-bold text-brand-text mb-4">{t('reportModalStep1Title')}</h2>
         <div className="mb-6">
            <label className="block text-brand-text-secondary text-sm font-bold mb-2">
            {t('uploadPhotoOrVideo')}
            </label>
            <div
            className="border-2 border-dashed border-brand-primary rounded-lg p-6 text-center cursor-pointer hover:border-brand-accent"
            onClick={() => fileInputRef.current?.click()}
            >
            <input
                type="file"
                accept="image/*,video/*"
                capture="environment"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
            />
            {mediaPreview ? (
                mediaType === 'image' ? (
                    <img src={mediaPreview} alt={t('previewAlt')} className="max-h-48 mx-auto rounded-lg" />
                ) : (
                    <video src={mediaPreview} controls className="max-h-48 mx-auto rounded-lg" />
                )
            ) : (
                <div className="text-brand-secondary">
                <div className="flex justify-center space-x-8">
                    <CameraIcon className="mx-auto h-12 w-12" />
                    <VideoIcon className="mx-auto h-12 w-12" />
                </div>
                <p className="mt-2">{t('tapToSelect')}</p>
                </div>
            )}
            </div>
        </div>
        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
        <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                {t('cancel')}
            </button>
            <button
                type="button"
                onClick={handleNext}
                disabled={isLoading || !mediaFile}
                className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
            >
                {isLoading ? t('locating') : t('next')}
            </button>
        </div>
    </div>
  );

  const renderStep2 = () => (
     <div className="p-8">
        <h2 className="text-2xl font-bold text-brand-text mb-4">{t('reportModalStep2Title')}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <p className="text-sm text-brand-text-secondary mb-2">{t('reportModalLocationDesc')}</p>
                <p className="text-xs text-brand-text-secondary mb-4">{t('reportModalLocationDesktopNote')}</p>
                
                <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="address-autocomplete">{t('address')}</label>
                <AddressAutocomplete
                    id="address-autocomplete"
                    initialValue={address}
                    onValueChange={(value) => {
                        setAddress(value);
                        if(isLocationConfirmed) setIsLocationConfirmed(false);
                    }}
                    onSelect={(value) => {
                        setAddress(value);
                        setIsLocationConfirmed(false);
                    }}
                    placeholder={t('addressPlaceholder')}
                />
            </div>

            <div>
                 <label className="block text-brand-text-secondary text-sm font-bold mb-2 flex items-center gap-2">
                    {t('sightingType')}
                    <button type="button" onClick={() => setShowHelp(true)} className="text-brand-secondary hover:text-brand-text">
                        <HelpCircleIcon className="h-4 w-4" />
                    </button>
                </label>
                <select 
                    value={sightingType}
                    onChange={(e) => setSightingType(e.target.value as SightingType)}
                    className="w-full px-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                >
                    {sightingTypes.map(type => (
                        <option key={type.id} value={type.id}>{t(type.nameKey)}</option>
                    ))}
                </select>
            </div>

            {sightingType === 'other' && (
                 <div className="animate-fade-in">
                    <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="other-description">{t('otherSightingDescription')}</label>
                    <textarea
                        id="other-description"
                        rows={2}
                        value={otherDescription}
                        onChange={(e) => setOtherDescription(e.target.value)}
                        placeholder={t('otherSightingDescriptionPlaceholder')}
                        className="w-full px-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                    />
                </div>
            )}
            
             <div>
                <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="description">{t('reportDescription')}</label>
                <textarea
                    id="description"
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t('reportDescriptionPlaceholder')}
                    className="w-full px-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
            </div>
            
            <div>
                <label className="flex items-center text-sm text-brand-text-secondary cursor-pointer">
                    <input type="checkbox" checked={isHuman} onChange={e => setIsHuman(e.target.checked)} className="h-4 w-4 rounded text-brand-accent focus:ring-brand-accent mr-2" />
                    <span>{t('iamNotARobot')}</span>
                </label>
            </div>

            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

            <div className="flex justify-between items-center pt-4">
                <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={isLoading}
                    className="bg-brand-primary hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                >
                    {t('back')}
                </button>
                <button
                    type="submit"
                    disabled={isLoading || !address.trim() || !description.trim() || !isHuman || (sightingType === 'other' && !otherDescription.trim())}
                    className="bg-brand-danger hover:bg-brand-danger-hover text-white font-bold py-2 px-4 rounded-lg transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                >
                    {isLoading ? t('submitting') : t('submitReport')}
                </button>
            </div>
        </form>
     </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-lg relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-brand-secondary hover:text-brand-text text-3xl font-bold z-10"
          aria-label={t('closeModal')}
        >
          &times;
        </button>
        {step === 1 ? renderStep1() : renderStep2()}
        {showHelp && <SightingTypeHelpModal onClose={() => setShowHelp(false)} />}
      </div>
    </div>
  );
};

export default ReportModal;



import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';
import { LogoIcon, HelpCircleIcon, PlayIcon, NewspaperIcon, ScalesIcon, BuildingOfficeIcon } from './icons';

interface PublicHeaderProps {
    onNavigate: (page: 'help' | 'terms' | 'facilitiesMap' | 'dashboard' | 'news' | 'legal') => void;
    onLoginPress: () => void;
    onOpenPromoVideo: () => void;
}

const PublicHeader: React.FC<PublicHeaderProps> = ({ onNavigate, onLoginPress, onOpenPromoVideo }) => {
    const { t } = useLanguage();
    
    const NavButton = ({ page, icon, label }: { page: 'news' | 'facilitiesMap' | 'help' | 'legal', icon: React.ReactNode, label: string }) => (
         <button
            onClick={() => onNavigate(page)}
            className="flex items-center space-x-2 text-sm text-brand-secondary hover:text-brand-text transition-colors duration-200"
            aria-label={label}
        >
            {icon}
            <span className="hidden sm:inline">{label}</span>
        </button>
    );

    return (
        <header className="bg-brand-surface shadow-md sticky top-0 z-40">
            <div className="max-w-5xl mx-auto px-4 py-3 flex justify-between items-center">
                <button
                    onClick={() => onNavigate('dashboard')}
                    className="flex items-center gap-3 text-xl font-bold text-brand-text"
                >
                    <LogoIcon className="h-8 w-auto text-brand-accent"/>
                    <span>{t('title')}</span>
                </button>
                <div className="flex items-center space-x-4">
                    <NavButton page="news" icon={<NewspaperIcon className="h-5 w-5" />} label={t('news')} />
                    <NavButton page="legal" icon={<ScalesIcon className="h-5 w-5" />} label={t('legal')} />
                    <NavButton page="facilitiesMap" icon={<BuildingOfficeIcon className="h-5 w-5" />} label={t('facilities')} />
                    <NavButton page="help" icon={<HelpCircleIcon className="h-5 w-5" />} label={t('help')} />
                    
                    <div className="h-6 w-px bg-brand-primary"></div>

                    <button onClick={onOpenPromoVideo} className="flex items-center space-x-2 text-sm text-brand-secondary hover:text-brand-text transition-colors duration-200" aria-label={t('watchPromo')}>
                        <PlayIcon className="h-5 w-5 fill-current" />
                        <span className="hidden sm:inline">{t('watchPromo')}</span>
                    </button>
                     <LanguageToggle />
                     <button
                        onClick={onLoginPress}
                        className="text-sm font-semibold bg-brand-accent hover:bg-brand-accent-hover text-white py-2 px-4 rounded-lg transition-colors duration-200"
                        aria-label={t('login')}
                    >
                       {t('login')}
                    </button>
                </div>
            </div>
        </header>
    );
}

export default PublicHeader;
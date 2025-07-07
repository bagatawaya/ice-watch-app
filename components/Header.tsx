


import React from 'react';
import { LogoutIcon, UserIcon, CogIcon, HelpCircleIcon, ShieldIcon, LogoIcon, PlayIcon, NewspaperIcon, ScalesIcon, BuildingOfficeIcon } from './icons';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import LanguageToggle from './LanguageToggle';

interface HeaderProps {
  currentUser: User;
  onLogout: () => void;
  onNavigate: (page: 'dashboard' | 'settings' | 'help' | 'admin' | 'facilitiesMap' | 'news' | 'legal') => void;
  onOpenPromoVideo: () => void;
}

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout, onNavigate, onOpenPromoVideo }) => {
  const { t } = useLanguage();

  const NavButton = ({ page, icon, label }: { page: 'dashboard' | 'settings' | 'help' | 'admin' | 'facilitiesMap' | 'news' | 'legal', icon: React.ReactNode, label: string }) => (
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
        <button onClick={() => onNavigate('dashboard')} className="flex items-center gap-3 text-xl font-bold text-brand-text">
            <LogoIcon className="h-8 w-auto text-brand-accent"/>
            <span>{t('title')}</span>
        </button>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-sm text-brand-text-secondary">
            <UserIcon className="h-5 w-5" />
            <span>{currentUser.username}</span>
          </div>
          <nav className="flex items-center space-x-4">
            <NavButton page="news" icon={<NewspaperIcon className="h-5 w-5" />} label={t('news')} />
            <NavButton page="legal" icon={<ScalesIcon className="h-5 w-5" />} label={t('legal')} />
            <NavButton page="facilitiesMap" icon={<BuildingOfficeIcon className="h-5 w-5" />} label={t('facilities')} />
            <NavButton page="settings" icon={<CogIcon className="h-5 w-5" />} label={t('settings')} />
            {currentUser.isAdmin && (
              <NavButton page="admin" icon={<ShieldIcon className="h-5 w-5" />} label={t('admin')} />
            )}
          </nav>
          <button onClick={onOpenPromoVideo} className="flex items-center space-x-2 text-sm text-brand-secondary hover:text-brand-text transition-colors duration-200">
             <PlayIcon className="h-5 w-5 fill-current" />
             <span className="hidden sm:inline">{t('watchPromo')}</span>
          </button>
          <NavButton page="help" icon={<HelpCircleIcon className="h-5 w-5" />} label={t('help')} />
          <LanguageToggle />
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 text-sm text-brand-secondary hover:text-brand-text transition-colors duration-200"
            aria-label={t('logout')}
          >
            <LogoutIcon className="h-5 w-5" />
            <span className="hidden sm:inline">{t('logout')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
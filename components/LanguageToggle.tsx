import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const getButtonClass = (lang: 'en' | 'es') => {
    return `px-2 py-1 text-xs font-bold rounded-md transition-colors ${
      language === lang
        ? 'bg-brand-accent text-white'
        : 'bg-brand-primary text-brand-text-secondary hover:bg-brand-secondary'
    }`;
  };

  return (
    <div className="flex items-center space-x-1 bg-brand-primary rounded-md p-1">
      <button onClick={() => setLanguage('en')} className={getButtonClass('en')}>
        EN
      </button>
      <button onClick={() => setLanguage('es')} className={getButtonClass('es')}>
        ES
      </button>
    </div>
  );
};

export default LanguageToggle;

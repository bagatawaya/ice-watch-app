import React from 'react';
import { BotIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface AiAssistantButtonProps {
    onOpen: () => void;
}

const AiAssistantButton: React.FC<AiAssistantButtonProps> = ({ onOpen }) => {
    const { t } = useLanguage();

    return (
        <div className="fixed bottom-6 left-6 z-50 group">
            <button
                onClick={onOpen}
                className="flex items-center bg-brand-accent hover:bg-brand-accent-hover text-white font-bold rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand-bg focus:ring-brand-accent"
                aria-label={t('aiAssistant')}
            >
                <div className="p-3">
                  <BotIcon className="h-6 w-6" />
                </div>
                <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-in-out whitespace-nowrap pr-0 group-hover:pr-4">
                  {t('aiAssistant')}
                </span>
            </button>
        </div>
    );
};

export default AiAssistantButton;

import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PromoVideoModalProps {
    onClose: () => void;
}

const PromoVideoModal: React.FC<PromoVideoModalProps> = ({ onClose }) => {
    const { t, language } = useLanguage();

    const videoId = language === 'es' 
        ? '5_a16bzR6TM' // Spanish Video ID
        : 'qlEL2Haq--8';   // English Video ID

    const videoSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-[60] p-4 animate-fade-in"
            onClick={onClose}
        >
            <div 
                className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-4xl relative border border-brand-primary"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="p-4 border-b border-brand-primary flex justify-between items-center">
                    <h3 className="text-lg font-bold text-brand-text">{t('promoVideoTitle')}</h3>
                    <button
                        onClick={onClose}
                        className="text-brand-secondary hover:text-brand-text text-3xl font-bold z-10"
                        aria-label={t('closeModal')}
                    >
                        &times;
                    </button>
                </div>
                <div className="p-4 bg-black">
                    <div className="aspect-video w-full">
                        <iframe
                            src={videoSrc}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            className="w-full h-full rounded"
                        ></iframe>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoVideoModal;

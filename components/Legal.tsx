
import React, { useState } from 'react';
import { lawsuits } from '../data/lawsuits';
import LawsuitCard from './LawsuitCard';
import { useLanguage } from '../contexts/LanguageContext';
import { ScalesIcon } from './icons';
import LawyerDirectory from './LawyerDirectory';

const Legal: React.FC = () => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'directory' | 'cases'>('directory');

    const getTabClass = (tabName: 'directory' | 'cases') => {
        return `px-4 py-2 text-sm font-bold rounded-md transition-colors ${
            activeTab === tabName
            ? 'bg-brand-accent text-white'
            : 'bg-transparent text-brand-text-secondary hover:bg-brand-primary'
        }`;
    };

    return (
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8">
                <ScalesIcon className="h-12 w-12 mx-auto text-brand-accent mb-2" />
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-text">{t('legalTitle')}</h1>
                <p className="mt-2 text-lg text-brand-text-secondary max-w-3xl mx-auto">{t('legalDescription')}</p>
            </div>

            <div className="mb-8 flex justify-center">
                <div className="inline-flex rounded-lg shadow-sm bg-brand-primary p-1">
                    <button onClick={() => setActiveTab('directory')} className={getTabClass('directory')}>
                        {t('lawyerDirectoryTab')}
                    </button>
                    <button onClick={() => setActiveTab('cases')} className={getTabClass('cases')}>
                       {t('classActionCasesTab')}
                    </button>
                </div>
            </div>
            
            <div className="animate-fade-in">
                {activeTab === 'directory' && <LawyerDirectory />}
                
                {activeTab === 'cases' && (
                     <div className="max-w-4xl mx-auto space-y-6">
                        {lawsuits.map(lawsuit => (
                            <LawsuitCard key={lawsuit.id} lawsuit={lawsuit} />
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
};

export default Legal;

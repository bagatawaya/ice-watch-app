
import React, { useState } from 'react';
import { Lawsuit } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { ScalesIcon } from './icons';

interface LawsuitCardProps {
    lawsuit: Lawsuit;
}

const LawsuitCard: React.FC<LawsuitCardProps> = ({ lawsuit }) => {
    const { language, t } = useLanguage();
    const [isExpanded, setIsExpanded] = useState(false);
    const content = lawsuit[language];

    return (
        <div className="bg-brand-surface rounded-lg shadow-lg overflow-hidden animate-fade-in">
            <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                    <div className="flex-shrink-0 bg-brand-primary p-2 rounded-full">
                         <ScalesIcon className="h-6 w-6 text-brand-accent" />
                    </div>
                    <h3 className="text-xl font-bold text-brand-text">{content.name}</h3>
                </div>
                <p className="text-brand-text-secondary mb-4">{content.about}</p>
                
                <button 
                    onClick={() => setIsExpanded(!isExpanded)} 
                    className="text-sm font-semibold text-brand-accent hover:underline"
                >
                    {isExpanded ? t('readLess') : t('readMore')}
                </button>
            </div>

            {isExpanded && (
                <div className="px-6 pb-6 space-y-6 border-t border-brand-primary/50 animate-fade-in">
                    
                    <Section title={t('whoItHelps')}>
                        <p>{content.whoItHelps}</p>
                    </Section>

                     <Section title={t('lawsuitGoal')}>
                        <p>{content.goal}</p>
                    </Section>
                    
                    <Section title={t('amIEligible')}>
                        <ul className="space-y-4">
                            {content.questions.map((q, i) => (
                                <li key={i} className="p-3 bg-brand-primary/50 rounded-md">
                                    <p className="font-semibold text-brand-text">{q.question}</p>
                                    <p className="text-xs text-brand-text-secondary mt-1">{q.relevance}</p>
                                </li>
                            ))}
                        </ul>
                    </Section>

                    <Section title={t('whatShouldIDo')}>
                        <ul className="list-disc list-inside space-y-2">
                            {content.steps.map((step, i) => <li key={i}>{step}</li>)}
                        </ul>
                    </Section>
                    
                     <Section title={t('whatDocumentsNeeded')}>
                        <ul className="list-disc list-inside space-y-2">
                            {content.documents.map((doc, i) => <li key={i}>{doc}</li>)}
                        </ul>
                    </Section>

                    <Section title={t('whereCanIGetHelp')}>
                        {content.resources.map((res, i) => (
                            <div key={i} className="mb-3 p-3 border border-brand-primary rounded-lg">
                                <h5 className="font-bold text-brand-accent">{res.name}</h5>
                                <p className="text-sm">Phone: {res.phone}</p>
                                <a href={res.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-400 hover:underline">
                                    {res.website}
                                </a>
                            </div>
                        ))}
                    </Section>
                    
                    <Section title={t('importantDeadlines')}>
                        <p>{content.deadlines}</p>
                    </Section>

                    <div className="p-3 bg-green-900/30 text-green-200 border border-green-700 rounded-lg text-sm">
                        <p className="font-bold mb-1">{t('privacyAndSafety')}</p>
                        <p>{content.privacy}</p>
                    </div>

                </div>
            )}
        </div>
    );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="pt-4">
        <h4 className="text-lg font-bold text-brand-accent mb-2">{title}</h4>
        <div className="text-brand-text-secondary space-y-2">{children}</div>
    </div>
);

export default LawsuitCard;

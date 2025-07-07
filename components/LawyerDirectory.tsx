
import React, { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { lawyers, allStates, allSpecialties, allLanguages } from '../data/lawyers';
import LawyerCard from './LawyerCard';
import { SearchIcon, ChevronDownIcon } from './icons';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ITEMS_PER_PAGE = 10;

const LawyerDirectory: React.FC = () => {
    const { t } = useLanguage();
    const [stateFilter, setStateFilter] = useLocalStorage('lawyer-state-filter', 'all');
    const [languageFilter, setLanguageFilter] = useLocalStorage('lawyer-language-filter', 'all');
    const [proBonoFilter, setProBonoFilter] = useLocalStorage('lawyer-probono-filter', false);
    const [selectedSpecialties, setSelectedSpecialties] = useLocalStorage<string[]>('lawyer-specialty-filter', []);
    
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
    const [isFiltersOpen, setIsFiltersOpen] = useState(true);

    const filteredLawyers = useMemo(() => {
        let results = lawyers;

        if (proBonoFilter) {
            results = results.filter(l => l.proBono);
        }
        if (stateFilter !== 'all') {
            results = results.filter(l => l.state === stateFilter);
        }
        if (languageFilter !== 'all') {
            results = results.filter(l => l.languages.includes(languageFilter));
        }
        if (selectedSpecialties.length > 0) {
            results = results.filter(l =>
                selectedSpecialties.every(spec => l.specialties.includes(spec))
            );
        }

        return results;
    }, [stateFilter, languageFilter, proBonoFilter, selectedSpecialties]);

    // Reset pagination when filters change
    useEffect(() => {
        setVisibleCount(ITEMS_PER_PAGE);
    }, [stateFilter, languageFilter, proBonoFilter, selectedSpecialties]);

    const handleLoadMore = () => {
        setVisibleCount(prevCount => prevCount + ITEMS_PER_PAGE);
    };

    const handleSpecialtyChange = (specialty: string) => {
        setSelectedSpecialties(prev =>
            prev.includes(specialty)
                ? prev.filter(s => s !== specialty)
                : [...prev, specialty]
        );
    };

    const clearAllFilters = () => {
        setStateFilter('all');
        setLanguageFilter('all');
        setProBonoFilter(false);
        setSelectedSpecialties([]);
    };

    const hasMore = visibleCount < filteredLawyers.length;

    const FilterSelect: React.FC<{ label: string; value: string; onChange: (val: string) => void; options: string[]; allLabel: string; }> = ({ label, value, onChange, options, allLabel }) => (
        <div className="flex-1 min-w-[150px]">
            <label className="block text-sm font-bold text-brand-text-secondary mb-1">{label}</label>
            <select
                value={value}
                onChange={e => onChange(e.target.value)}
                className="w-full px-4 py-2 h-[42px] rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent"
            >
                <option value="all">{allLabel}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
        </div>
    );

    return (
        <section className="bg-brand-surface p-4 sm:p-6 rounded-lg">
            <h2 className="text-2xl font-bold text-brand-text mb-1">{t('lawyerDirectoryTitle')}</h2>
            <p className="text-sm text-brand-text-secondary mb-4">{t('lawyerDirectoryDescription')}</p>

            <div className="border-t border-b border-brand-primary/50 py-4">
                <button
                    onClick={() => setIsFiltersOpen(!isFiltersOpen)}
                    className="w-full flex justify-between items-center font-bold text-brand-text mb-2"
                >
                    <span>{t('filters')}</span>
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${isFiltersOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isFiltersOpen && (
                    <div className="animate-fade-in space-y-4">
                        {/* Row 1: Main Dropdowns */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <FilterSelect label={t('filterByState')} value={stateFilter} onChange={setStateFilter} options={allStates} allLabel={t('allStates')} />
                            <FilterSelect label={t('filterByLanguage')} value={languageFilter} onChange={setLanguageFilter} options={allLanguages} allLabel={t('allLanguages')} />
                            <div className="flex items-end pb-1.5">
                                <label className="flex items-center gap-2 text-brand-text-secondary cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={proBonoFilter}
                                        onChange={e => setProBonoFilter(e.target.checked)}
                                        className="h-5 w-5 rounded text-brand-accent focus:ring-brand-accent bg-brand-primary"
                                    />
                                    <span className="font-bold">{t('proBonoOnly')}</span>
                                </label>
                            </div>
                        </div>

                        {/* Row 2: Specialties */}
                        <div>
                             <label className="block text-sm font-bold text-brand-text-secondary mb-2">{t('specialties')}</label>
                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-48 overflow-y-auto bg-brand-primary/50 p-3 rounded-md">
                                 {allSpecialties.map(spec => (
                                     <label key={spec} className="flex items-center gap-2 text-sm text-brand-text-secondary cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={selectedSpecialties.includes(spec)}
                                            onChange={() => handleSpecialtyChange(spec)}
                                            className="h-4 w-4 rounded text-brand-accent focus:ring-brand-accent bg-brand-primary"
                                        />
                                        <span>{spec}</span>
                                     </label>
                                 ))}
                             </div>
                        </div>
                    </div>
                )}
            </div>


            {filteredLawyers.length > 0 ? (
                <div className="mt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredLawyers.slice(0, visibleCount).map(lawyer => (
                            <LawyerCard key={lawyer.id} lawyer={lawyer} />
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-16 bg-brand-bg rounded-lg mt-6">
                    <SearchIcon className="h-12 w-12 mx-auto text-brand-secondary mb-4" />
                    <h3 className="text-2xl font-semibold text-brand-text">{t('noResultsFound')}</h3>
                    <p className="text-brand-text-secondary mt-2 mb-4">{t('noResultsHint')}</p>
                    <button
                        onClick={clearAllFilters}
                        className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        {t('clearFilters')}
                    </button>
                </div>
            )}

            {hasMore && (
                <div className="mt-6 text-center">
                    <button
                        onClick={handleLoadMore}
                        className="bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-2 px-6 rounded-lg transition-colors"
                    >
                        {t('loadMore')}
                    </button>
                </div>
            )}
        </section>
    );
};

export default LawyerDirectory;

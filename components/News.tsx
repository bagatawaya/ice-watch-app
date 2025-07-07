
import React from 'react';
import { newsArticles } from '../data/newsArticles';
import NewsCard from './NewsCard';
import { useLanguage } from '../contexts/LanguageContext';
import { NewspaperIcon } from './icons';

const News: React.FC = () => {
    const { t } = useLanguage();

    return (
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
            <div className="text-center mb-8">
                <NewspaperIcon className="h-12 w-12 mx-auto text-brand-accent mb-2" />
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-text">{t('newsTitle')}</h1>
                <p className="mt-2 text-lg text-brand-text-secondary max-w-2xl mx-auto">{t('newsDescription')}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {newsArticles.map(article => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </main>
    );
};

export default News;

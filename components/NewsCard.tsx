
import React from 'react';
import { NewsArticle } from '../types';
import { format } from 'date-fns';

interface NewsCardProps {
    article: NewsArticle;
}

const NewsCard: React.FC<NewsCardProps> = ({ article }) => {
    return (
        <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-brand-surface rounded-lg shadow-lg overflow-hidden group hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 animate-fade-in"
        >
            <div className="w-full h-40 bg-brand-primary overflow-hidden">
                <img
                    src={article.imageUrl}
                    alt={`Image for article titled "${article.title}"`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                />
            </div>
            <div className="p-4">
                <p className="text-xs font-semibold text-brand-text-secondary uppercase tracking-wider mb-1">
                    {article.source} &bull; {format(new Date(article.date), 'MMM d, yyyy')}
                </p>
                <h3 className="text-lg font-bold text-brand-text group-hover:text-brand-accent transition-colors duration-200 leading-tight">
                    {article.title}
                </h3>
                <p className="text-sm text-brand-text-secondary mt-2">
                    {article.summary}
                </p>
            </div>
        </a>
    );
};

export default NewsCard;

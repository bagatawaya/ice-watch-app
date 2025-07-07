import React, { useState, useEffect, useMemo } from 'react';
import { Report, User } from '../types';
import ReportFeed from './ReportFeed';
import { AlertTriangleIcon } from './icons';
import { useLanguage } from '../contexts/LanguageContext';

interface DashboardProps {
  reports: Report[];
  onReportPress: () => void;
  onSelectReport: (report: Report) => void;
  currentUser: User;
  onNavigate: (page: 'settings') => void;
}

const Dashboard: React.FC<DashboardProps> = ({ reports, onReportPress, onSelectReport, currentUser, onNavigate }) => {
  const { t } = useLanguage();

  const countyReports = useMemo(() => {
    if (!currentUser.county || !currentUser.state) {
        return []; // Should not happen for registered users, but a safe fallback.
    }
    const userArea = `${currentUser.county}, ${currentUser.state}`;
    return reports.filter(report => report.area === userArea);
  }, [reports, currentUser]);


  return (
    <div className="min-h-screen bg-brand-bg">
      <main className="max-w-3xl mx-auto p-4">
        <div className="fixed bottom-6 right-6 z-50">
          <button
            onClick={onReportPress}
            className="flex items-center gap-2 bg-brand-danger hover:bg-brand-danger-hover text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
            aria-label={t('reportSighting')}
          >
            <AlertTriangleIcon className="h-6 w-6" />
            {t('reportSighting')}
          </button>
        </div>

        <div className="bg-brand-primary/30 p-4 rounded-lg mb-6 text-center">
            <p className="text-brand-text-secondary">
            {t('setupNotificationsPrompt')}{' '}
            <button
                onClick={() => onNavigate('settings')}
                className="font-semibold text-brand-accent hover:underline"
            >
                {t('setupNotificationsLink')}
            </button>
            </p>
        </div>

        <h2 className="text-2xl font-semibold text-brand-text mb-4">{t('yourCountyFeed', { county: currentUser.county })}</h2>
        {countyReports.length > 0 ? (
             <ReportFeed reports={countyReports} onSelectReport={onSelectReport} />
        ) : (
             <div className="text-center py-16 bg-brand-surface rounded-lg">
                <h3 className="text-2xl font-semibold text-brand-text">{t('welcomeToYourFeed', { county: currentUser.county })}</h3>
                <p className="text-brand-text-secondary mt-2 max-w-xl mx-auto">{t('noCountyReportsWelcome')}</p>
                 <button
                    onClick={onReportPress}
                    className="mt-6 flex items-center gap-2 mx-auto bg-brand-danger hover:bg-brand-danger-hover text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform transform hover:scale-105"
                    aria-label={t('reportSighting')}
                >
                    <AlertTriangleIcon className="h-6 w-6" />
                    {t('reportSighting')}
                </button>
             </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
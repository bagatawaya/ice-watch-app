
import React from 'react';
import { Report } from '../types';
import ReportCard from './ReportCard';
import { useLanguage } from '../contexts/LanguageContext';

interface ReportFeedProps {
  reports: Report[];
  onSelectReport: (report: Report) => void;
  isAdminView?: boolean;
  onDelete?: (reportId: string) => void;
}

const ReportFeed: React.FC<ReportFeedProps> = ({ reports, onSelectReport, isAdminView = false, onDelete }) => {
  const { t } = useLanguage();
  if (reports.length === 0) {
    return (
      <div className="text-center py-16">
        <h2 className="text-2xl font-semibold text-brand-text">{t('noReportsYet')}</h2>
        <p className="text-brand-text-secondary mt-2">{t('communityFeedClear')}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 pb-24">
      {reports.map((report, index) => (
        <ReportCard 
            key={report.id} 
            report={report} 
            isNew={index === 0 && !isAdminView} 
            onSelect={onSelectReport}
            isAdminView={isAdminView}
            onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default ReportFeed;


import React, { useState, useMemo } from 'react';
import { User, Report } from '../types';
import ReportFeed from './ReportFeed';
import { useLanguage } from '../contexts/LanguageContext';
import { UsersIcon, SearchIcon, ShieldCheckIcon, AlertTriangleIcon } from './icons';

interface AdminProps {
    currentUser: User;
    allUsers: User[];
    allReports: Report[];
    onUpdateUser: (user: User) => void;
    onSelectReport: (report: Report) => void;
    onDeleteReport: (reportId: string) => void;
}

const Admin: React.FC<AdminProps> = ({ currentUser, allUsers, allReports, onUpdateUser, onSelectReport, onDeleteReport }) => {
    const { t } = useLanguage();
    const [activeTab, setActiveTab] = useState<'users' | 'reports'>('users');
    const [userSearch, setUserSearch] = useState('');
    const [reportSearch, setReportSearch] = useState('');

    const isSuperAdmin = currentUser.email === 'bagataway@gmail.com';

    const filteredUsers = useMemo(() => {
        if (!userSearch) return allUsers;
        const lowercasedFilter = userSearch.toLowerCase();
        return allUsers.filter(user =>
            user.username.toLowerCase().includes(lowercasedFilter) ||
            user.email.toLowerCase().includes(lowercasedFilter)
        );
    }, [userSearch, allUsers]);

    const filteredReports = useMemo(() => {
        if (!reportSearch) return allReports;
        const lowercasedFilter = reportSearch.toLowerCase();
        return allReports.filter(report =>
            report.description.toLowerCase().includes(lowercasedFilter) ||
            report.address.toLowerCase().includes(lowercasedFilter)
        );
    }, [reportSearch, allReports]);

    const getUserReportCount = (userId: string) => {
        return allReports.filter(r => r.reporter.id === userId).length;
    };

    const getTabClass = (tabName: 'users' | 'reports') => {
        return `px-4 py-2 font-semibold rounded-md transition-colors text-sm flex items-center gap-2 ${
            activeTab === tabName
            ? 'bg-brand-accent text-white'
            : 'bg-brand-primary text-brand-text-secondary hover:bg-brand-secondary'
        }`;
    }

    const renderUserManagement = () => (
        <div className="space-y-4">
            <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-secondary" />
                <input
                    type="text"
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    placeholder={t('searchUsers')}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
            </div>
            <div className="overflow-x-auto bg-brand-bg rounded-lg">
                <table className="w-full text-left">
                    <thead className="bg-brand-primary/50">
                        <tr className="border-b border-brand-primary">
                            <th className="p-3 text-sm font-semibold text-brand-text-secondary">{t('username')}</th>
                            <th className="p-3 text-sm font-semibold text-brand-text-secondary">{t('email')}</th>
                            <th className="p-3 text-sm font-semibold text-brand-text-secondary text-center">{t('reportsCount')}</th>
                            <th className="p-3 text-sm font-semibold text-brand-text-secondary text-center">{t('isAdmin')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredUsers.map(user => (
                            <tr key={user.id} className="border-b border-brand-primary/50 hover:bg-brand-primary/20">
                                <td className="p-3 text-brand-text font-medium">{user.username}</td>
                                <td className="p-3 text-brand-text-secondary">{user.email}</td>
                                <td className="p-3 text-brand-text-secondary text-center">{getUserReportCount(user.id)}</td>
                                <td className="p-3 text-center">
                                    {user.email === 'bagataway@gmail.com' ? (
                                        <div className="flex items-center justify-center gap-1.5 text-brand-accent font-bold" title={t('superAdmin')}>
                                            <ShieldCheckIcon className="h-5 w-5" />
                                        </div>
                                    ) : (
                                        <label className={`relative inline-flex items-center cursor-pointer ${!isSuperAdmin ? 'cursor-not-allowed' : ''}`}>
                                            <input 
                                                type="checkbox"
                                                checked={user.isAdmin}
                                                disabled={!isSuperAdmin}
                                                onChange={(e) => onUpdateUser({ ...user, isAdmin: e.target.checked })}
                                                className="sr-only peer"
                                            />
                                            <div className="w-11 h-6 bg-brand-primary rounded-full peer peer-focus:ring-2 peer-focus:ring-brand-accent peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-accent disabled:opacity-50"></div>
                                        </label>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const renderReportManagement = () => (
        <div className="space-y-4">
             <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-brand-secondary" />
                <input
                    type="text"
                    value={reportSearch}
                    onChange={e => setReportSearch(e.target.value)}
                    placeholder={t('searchReportsPlaceholder')}
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"
                />
            </div>
            <div className="max-w-3xl mx-auto">
                <ReportFeed 
                    reports={filteredReports} 
                    onSelectReport={onSelectReport}
                    isAdminView={true}
                    onDelete={onDeleteReport}
                />
                {filteredReports.length === 0 && (
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-semibold text-brand-text">{t('noMatchingReports')}</h2>
                        <p className="text-brand-text-secondary mt-2">{t('noMatchingReportsHint')}</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <main className="max-w-5xl mx-auto p-4 space-y-6">
            <h1 className="text-3xl font-bold text-brand-text">{t('adminPanel')}</h1>
            
            <section className="bg-brand-surface p-4 sm:p-6 rounded-lg">
                <div className="border-b border-brand-primary mb-4">
                    <div className="flex items-center space-x-2">
                        <button className={getTabClass('users')} onClick={() => setActiveTab('users')}>
                            <UsersIcon className="h-5 w-5" />
                            <span>{t('adminUsers')}</span>
                        </button>
                         <button className={getTabClass('reports')} onClick={() => setActiveTab('reports')}>
                            <AlertTriangleIcon className="h-5 w-5" />
                           <span>{t('adminReports')}</span>
                        </button>
                    </div>
                </div>

                {activeTab === 'users' ? renderUserManagement() : renderReportManagement()}
            </section>
        </main>
    );
};

export default Admin;

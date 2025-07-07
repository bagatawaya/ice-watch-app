

import React, { useState, useEffect } from 'react';
import { User, Report, IceFacility } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import ReportModal from './components/ReportModal';
import PublicHome from './components/PublicHome';
import Auth from './components/Auth';
import Settings from './components/Settings';
import Admin from './components/Admin';
import Help from './components/Help';
import { getDistanceInMiles } from './utils/helpers';
import PublicHeader from './components/PublicHeader';
import { initialReports, seedReporter } from './data/seedData';
import ReportDetail from './components/ReportDetail';
import Footer from './components/Footer';
import Terms from './components/Terms';
import AiAssistantButton from './components/AiAssistantButton';
import AiAssistant from './components/LoginScreen';
import FacilitiesMap from './components/FacilitiesMap';
import FacilityDetail from './components/FacilityDetail';
import DonationButton from './components/DonationButton';
import DonationModal from './components/DonationModal';
import { useLanguage } from './contexts/LanguageContext';
import PromoVideoModal from './components/PromoVideoModal';
import News from './components/News';
import Legal from './components/Legal';

// Helper to check for notifications
const checkAndNotify = (report: Report, users: User[]) => {
    users.forEach(user => {
        const settings = user.notificationSettings;
        if (!settings || !settings.location || !(settings.popup || settings.email || settings.sms)) {
            return;
        }

        const distance = getDistanceInMiles(
            settings.location.latitude,
            settings.location.longitude,
            report.location.latitude,
            report.location.longitude
        );

        if (distance <= settings.radius) {
            const message = `New report at ${report.address} is ${distance.toFixed(1)} miles away.`;
            
            if (settings.popup) {
                console.log(`[IN-APP POPUP] To ${user.username}: ${message}`);
            }
            if (settings.email) {
                console.log(`[EMAIL] To ${user.email}: ${message}`);
            }
            if (settings.sms && settings.phoneNumber) {
                const reportLink = `${window.location.origin}/#report=${report.id}`;
                console.log(`[SMS] To ${settings.phoneNumber}: ${message} View: ${reportLink}`);
            }
        }
    });
};

const App: React.FC = () => {
  const [users, setUsers] = useLocalStorage<User[]>('ice-alert-users', []);
  const [currentUser, setCurrentUser] = useLocalStorage<User | null>('ice-alert-currentUser', null);
  const [reports, setReports] = useLocalStorage<Report[]>('ice-alert-reports', []);
  const { t } = useLanguage();

  const [page, setPage] = useState<'dashboard' | 'settings' | 'admin' | 'help' | 'terms' | 'facilitiesMap' | 'news' | 'legal'>('dashboard');
  const [modal, setModal] = useState<'auth' | 'report' | null>(null);
  const [authInitialView, setAuthInitialView] = useState<'login' | 'register' | 'forgotPassword'>('login');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [selectedFacility, setSelectedFacility] = useState<IceFacility | null>(null);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [isPromoVideoOpen, setIsPromoVideoOpen] = useState(false);
  
  const [hasCleanedReports, setHasCleanedReports] = useState(false);

  // Filter out any reports from localStorage that might be malformed (e.g., from an older app version)
  // This prevents render-time crashes if a report is missing its location property.
  const validReports = reports.filter(r => {
    return r && r.location && typeof r.location.latitude === 'number' && typeof r.location.longitude === 'number';
  });

  // Effect to perform a one-time cleanup of the data in localStorage.
  useEffect(() => {
    if (!hasCleanedReports && validReports.length !== reports.length) {
      console.warn(`[Data Cleanup] Removed ${reports.length - validReports.length} invalid report(s) from local storage.`);
      setReports(validReports);
      setHasCleanedReports(true); // Ensure this runs only once to prevent loops
    }
  }, [reports, validReports, hasCleanedReports, setReports]);
  
  // Effect to automatically open the AI assistant once per session
  useEffect(() => {
    const assistantShown = sessionStorage.getItem('ice-alert-assistant-shown');
    if (!assistantShown) {
        const timer = setTimeout(() => {
            setIsAssistantOpen(true);
            sessionStorage.setItem('ice-alert-assistant-shown', 'true');
        }, 3000);
        return () => clearTimeout(timer);
    }
  }, []);

  // Ensure admin user and seed data exists on first load
  useEffect(() => {
    const adminEmail = "bagataway@gmail.com";
    let updatedUsers = [...users];
    let usersWereUpdated = false;

    const adminExists = users.some(u => u.email === adminEmail);
    if (!adminExists) {
      const adminUser: User = {
        id: 'admin-' + Date.now().toString(),
        username: 'iceadmin',
        email: adminEmail,
        password: '123456',
        isAdmin: true,
        state: 'CA',
        county: 'Los Angeles',
        notificationSettings: { radius: 30, email: true, sms: false, popup: true, phoneNumber: '' }
      };
      updatedUsers.push(adminUser);
      usersWereUpdated = true;
    }

    const seedReporterExists = users.some(u => u.id === seedReporter.id);
    if(!seedReporterExists) {
        updatedUsers.push(seedReporter);
        usersWereUpdated = true;
    }

    if(usersWereUpdated) {
        setUsers(updatedUsers);
    }
    
    if (reports.length === 0) {
        setReports(initialReports);
    }
  }, []);

  const handleSelectReport = (report: Report) => {
    setSelectedReport(report);
  };
  const handleBackToFeed = () => setSelectedReport(null);

  const handleSelectFacility = (facility: IceFacility) => {
      setSelectedFacility(facility);
  };
  const handleBackToFacilitiesMap = () => {
      setSelectedFacility(null);
      // For public users, this sends them back to the main dashboard map.
      // For logged-in users, it sends them to the dedicated facilities page.
      if (currentUser) {
        setPage('facilitiesMap');
      } else {
        setPage('dashboard');
      }
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setModal(null);
    setPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setPage('dashboard');
    setSelectedFacility(null);
    setSelectedReport(null);
  };

  const handleRegister = (user: User) => {
    setUsers([...users, user]);
    setCurrentUser(user);
    setModal(null);
    // Direct new users to dashboard, which will show their county feed.
    // They can then navigate to settings from there.
    setPage('dashboard');
  };

  const handleAddReport = (reportData: Omit<Report, 'id' | 'reporter' | 'timestamp'>) => {
    if (!currentUser) return;
    const newReport: Report = {
        ...reportData,
        id: Date.now().toString(),
        reporter: { id: currentUser.id, username: currentUser.username },
        timestamp: Date.now(),
    };
    const updatedReports = [newReport, ...reports];
    setReports(updatedReports);
    checkAndNotify(newReport, users.filter(u => u.id !== currentUser.id));
    setModal(null);
  };
  
  const handleUpdateUser = (updatedUser: User) => {
    setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
    if (currentUser && currentUser.id === updatedUser.id) {
        setCurrentUser(updatedUser);
    }
  }
  
  const handleDeleteReport = (reportId: string) => {
      if (window.confirm(t('deleteConfirmMessage'))) {
          setReports(reports.filter(r => r.id !== reportId));
      }
  };


  // === RENDER LOGIC ===

  const CommonOverlays = () => (
    <>
      {!isAssistantOpen && <AiAssistantButton onOpen={() => setIsAssistantOpen(true)} />}
      {isAssistantOpen && <AiAssistant onClose={() => setIsAssistantOpen(false)} />}
      <DonationButton onOpen={() => setIsDonationModalOpen(true)} />
      {isDonationModalOpen && <DonationModal onClose={() => setIsDonationModalOpen(false)} />}
      {isPromoVideoOpen && <PromoVideoModal onClose={() => setIsPromoVideoOpen(false)} />}
    </>
  );

  if (selectedFacility) {
      return (
        <>
            <FacilityDetail facility={selectedFacility} onBack={handleBackToFacilitiesMap} />
            <CommonOverlays />
        </>
    );
  }

  if (selectedReport) {
    return (
        <>
            <ReportDetail report={selectedReport} onBack={handleBackToFeed} />
            <CommonOverlays />
        </>
    );
  }

  if (!currentUser) {
    const handlePublicNavigate = (targetPage: 'help' | 'terms' | 'facilitiesMap' | 'dashboard' | 'news' | 'legal') => {
        setPage(targetPage);
    }
    const publicPageContent = () => {
      switch (page) {
        case 'help':
          return <Help onNavigateBack={() => setPage('dashboard')} />;
        case 'terms':
          return <Terms onNavigateBack={() => setPage('dashboard')} />;
        case 'news':
          return <News />;
        case 'legal':
          return <Legal />;
        // The public "facilitiesMap" is now integrated into the PublicHome component.
        // This case is kept for potential future direct navigation but is not currently used by the UI.
        case 'facilitiesMap':
           return <FacilitiesMap onSelectFacility={handleSelectFacility} />;
        case 'dashboard':
        default:
          return (
            <PublicHome
              reports={validReports}
              onRegisterPress={() => {
                setAuthInitialView('register');
                setModal('auth');
              }}
              onSelectReport={handleSelectReport}
              onSelectFacility={handleSelectFacility}
            />
          );
      }
    };
    
    return (
      <div className="min-h-screen bg-brand-bg flex flex-col">
        <PublicHeader 
          onNavigate={handlePublicNavigate} 
          onLoginPress={() => {
            setAuthInitialView('login');
            setModal('auth');
          }}
          onOpenPromoVideo={() => setIsPromoVideoOpen(true)}
        />
        <main className="flex-grow">
          {publicPageContent()}
        </main>
        <Footer onNavigate={handlePublicNavigate} />
        {modal === 'auth' && (
          <Auth
            onClose={() => setModal(null)}
            onLogin={handleLogin}
            onRegister={handleRegister}
            existingUsers={users}
            initialView={authInitialView}
            onNavigateToTerms={() => {
                setModal(null);
                setPage('terms');
            }}
             onSwitchView={(view) => {
                setAuthInitialView(view);
            }}
          />
        )}
        <CommonOverlays />
      </div>
    );
  }

  const renderPage = () => {
    switch (page) {
      case 'settings':
        return <Settings user={currentUser} onSave={handleUpdateUser} onNavigate={setPage} />;
      case 'admin':
        return currentUser.isAdmin ? <Admin currentUser={currentUser} allUsers={users} allReports={validReports} onUpdateUser={handleUpdateUser} onSelectReport={handleSelectReport} onDeleteReport={handleDeleteReport} /> : <Dashboard currentUser={currentUser} onNavigate={setPage} reports={validReports} onReportPress={() => setModal('report')} onSelectReport={handleSelectReport} />;
      case 'help':
        return <Help />;
      case 'terms':
        return <Terms />;
      case 'news':
        return <News />;
      case 'legal':
        return <Legal />;
      case 'facilitiesMap':
        return <FacilitiesMap onSelectFacility={handleSelectFacility} />;
      case 'dashboard':
      default:
        return <Dashboard currentUser={currentUser} onNavigate={setPage} reports={validReports} onReportPress={() => setModal('report')} onSelectReport={handleSelectReport} />;
    }
  }

  return (
    <div className="min-h-screen bg-brand-bg">
        <Header 
          currentUser={currentUser} 
          onLogout={handleLogout} 
          onNavigate={setPage} 
          onOpenPromoVideo={() => setIsPromoVideoOpen(true)}
        />
        {renderPage()}
        {modal === 'report' && (
          <ReportModal
            currentUser={currentUser}
            onClose={() => setModal(null)}
            onAddReport={handleAddReport}
          />
        )}
        <CommonOverlays />
    </div>
  );
};

export default App;


import React, { useState, useMemo, useEffect } from 'react';
import { User } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface AuthProps {
  onClose: () => void;
  onLogin: (user: User) => void;
  onRegister: (user: User) => void;
  existingUsers: User[];
  initialView?: 'login' | 'register' | 'forgotPassword';
  onNavigateToTerms?: () => void;
  onSwitchView: (view: 'login' | 'register' | 'forgotPassword') => void;
}

const Auth: React.FC<AuthProps> = ({ onClose, onLogin, onRegister, existingUsers, initialView = 'login', onNavigateToTerms, onSwitchView }) => {
  const [view, setView] = useState(initialView);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const { t } = useLanguage();
  
  const [state, setState] = useState('');
  const [county, setCounty] = useState('');
  const [allStatesAndCounties, setAllStatesAndCounties] = useState<{ [state: string]: string[] }>({});

  useEffect(() => {
    fetch('/data/statesAndCounties.json')
        .then(res => res.json())
        .then(data => {
            if (data) {
                setAllStatesAndCounties(data);
            }
        })
        .catch(err => console.error("Failed to load states and counties", err));
  }, []);


  const availableStates = useMemo(() => allStatesAndCounties ? Object.keys(allStatesAndCounties).sort() : [], [allStatesAndCounties]);
  const availableCounties = useMemo(() => {
      return (state && allStatesAndCounties) ? allStatesAndCounties[state] || [] : [];
  }, [state, allStatesAndCounties]);
  
  useEffect(() => {
    setCounty('');
  }, [state]);

  const resetFormState = () => {
    setEmail('');
    setPassword('');
    setUsername('');
    setError('');
    setMessage('');
    setAgreedToTerms(false);
    setState('');
    setCounty('');
  };

  const handleViewChange = (newView: 'login' | 'register' | 'forgotPassword') => {
    resetFormState();
    setView(newView);
    onSwitchView(newView);
  }

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const user = existingUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
    if (user && user.password === password) {
      onLogin(user);
    } else {
      setError(t('invalidUsernameOrPassword'));
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (username.length < 3) return setError(t('usernameMinLength'));
    if (password.length < 6) return setError(t('passwordMinLength'));
    if (existingUsers.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return setError(t('emailExists'));
    }
    if (existingUsers.some(u => u.username.toLowerCase() === username.toLowerCase())) {
        return setError(t('usernameExists'));
    }
    if (!state) return setError(t('stateRequired'));
    if (!county) return setError(t('countyRequired'));
    if (!agreedToTerms) {
        return setError(t('mustAgreeToTerms'));
    }

    const newUser: User = {
      id: Date.now().toString(),
      username,
      email,
      password,
      state,
      county,
      isAdmin: false,
      notificationSettings: { radius: 10, email: false, sms: false, popup: true, phoneNumber: '' },
    };
    onRegister(newUser);
  };
  
  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!email) {
      setError(t('emailRequired'));
      return;
    }

    const userExists = existingUsers.some(u => u.email.toLowerCase() === email.toLowerCase());
    console.log(`Password reset requested for ${email}. User exists: ${userExists}`);
    setMessage(t('passwordResetSent'));
  };
  
  const renderContent = () => {
    switch (view) {
        case 'forgotPassword':
            return (
                <>
                    <h2 className="text-3xl font-bold text-center text-brand-text mb-4">{t('resetPassword')}</h2>
                    <p className="text-center text-sm text-brand-text-secondary mb-6">{t('resetPasswordDesc')}</p>
                    {message ? (
                        <div className="text-center">
                            <p className="text-green-400 mb-4">{message}</p>
                            <button onClick={() => handleViewChange('login')} className="font-bold text-brand-accent hover:underline">
                                {t('backToLogin')}
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleForgotSubmit}>
                            <div className="mb-4">
                                <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="email">{t('email')}</label>
                                <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"/>
                            </div>
                            {error && <p className="text-red-400 text-xs text-center mb-4">{error}</p>}
                            <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200">
                                {t('sendResetLink')}
                            </button>
                            <p className="text-center text-sm text-brand-text-secondary mt-6">
                                <button type="button" onClick={() => handleViewChange('login')} className="font-bold text-brand-accent hover:underline">
                                    {t('backToLogin')}
                                </button>
                            </p>
                        </form>
                    )}
                </>
            );
        case 'register':
            return (
                 <>
                    <h2 className="text-3xl font-bold text-center text-brand-text mb-4">{t('createAccount')}</h2>
                    <form onSubmit={handleRegisterSubmit}>
                        <div className="mb-4">
                            <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="username">{t('username')}</label>
                            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="email">{t('email')}</label>
                            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"/>
                        </div>
                        <div className="mb-4">
                            <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="password">{t('password')}</label>
                            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"/>
                        </div>
                        <div className="flex gap-4 mb-4">
                            <div className="flex-1">
                                <label className="block text-brand-text-secondary text-sm font-bold mb-2">{t('state')}</label>
                                <select value={state} onChange={e => setState(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent">
                                    <option value="">{t('selectState')}</option>
                                    {availableStates.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label className="block text-brand-text-secondary text-sm font-bold mb-2">{t('county')}</label>
                                <select value={county} onChange={e => setCounty(e.target.value)} required disabled={!state} className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-accent disabled:opacity-50">
                                    <option value="">{t('selectCounty')}</option>
                                    {availableCounties.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>
                         <div className="mb-6">
                            <label className="flex items-center text-sm text-brand-text-secondary">
                                <input type="checkbox" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="h-4 w-4 rounded text-brand-accent focus:ring-brand-accent mr-2" />
                                <span>
                                    {t('agreeToTermsPrefix')}{' '}
                                    <button type="button" onClick={onNavigateToTerms} className="font-semibold text-brand-accent hover:underline">
                                        {t('termsAndConditions')}
                                    </button>
                                </span>
                            </label>
                        </div>
                        {error && <p className="text-red-400 text-xs text-center mb-4">{error}</p>}
                        <button type="submit" disabled={!agreedToTerms} className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200 disabled:bg-gray-500 disabled:cursor-not-allowed">
                            {t('register')}
                        </button>
                    </form>
                    <p className="text-center text-sm text-brand-text-secondary mt-6">
                        {t('alreadyHaveAccount')}
                        <button type="button" onClick={() => handleViewChange('login')} className="font-bold text-brand-accent hover:underline ml-2">
                            {t('login')}
                        </button>
                    </p>
                </>
            );
        case 'login':
        default:
            return (
                 <>
                    <h2 className="text-3xl font-bold text-center text-brand-text mb-4">{t('welcomeBack')}</h2>
                    <form onSubmit={handleLoginSubmit}>
                       <div className="mb-4">
                        <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="auth-username">{t('username')}</label>
                        <input id="auth-username" type="text" value={username} onChange={e => setUsername(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"/>
                       </div>
                       <div className="mb-6">
                        <label className="block text-brand-text-secondary text-sm font-bold mb-2" htmlFor="auth-password">{t('password')}</label>
                        <input id="auth-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-4 py-3 rounded-lg bg-brand-primary text-brand-text placeholder-brand-secondary focus:outline-none focus:ring-2 focus:ring-brand-accent"/>
                        <div className="text-right mt-1">
                            <button type="button" onClick={() => handleViewChange('forgotPassword')} className="text-xs text-brand-accent hover:underline">{t('forgotPassword')}</button>
                        </div>
                       </div>
                       {error && <p className="text-red-400 text-xs text-center mb-4">{error}</p>}
                       <button type="submit" className="w-full bg-brand-accent hover:bg-brand-accent-hover text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition-colors duration-200">
                         {t('login')}
                       </button>
                    </form>
                     <p className="text-center text-sm text-brand-text-secondary mt-6">
                      {t('dontHaveAccount')}
                      <button type="button" onClick={() => handleViewChange('register')} className="font-bold text-brand-accent hover:underline ml-2">
                        {t('register')}
                      </button>
                    </p>
                </>
            );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-brand-surface rounded-lg shadow-2xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-3 right-4 text-brand-secondary hover:text-brand-text text-3xl">&times;</button>
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Auth;

import React, { useState, useEffect } from 'react';
import { Leaf, HelpCircle, Mic, Home, User, Sprout, CloudSun, BarChart, Bug, Search, IndianRupee, Landmark, Package, Bell, AlertTriangle, X } from 'lucide-react';
import { AppPage, OutbreakAlert } from '../types';
import { useLocalization } from '../contexts/LocalizationContext';
import { getOutbreakAlerts } from '../services/alertService';

interface DashboardProps {
  onNavigate: (page: AppPage) => void;
  onOpenChatbot: () => void;
}

const Header: React.FC<{ alertCount: number, onAlertClick: () => void }> = ({ alertCount, onAlertClick }) => {
  const { t } = useLocalization();
  return (
    <header className="bg-brand-header p-4 flex justify-between items-center text-white sticky top-0 z-10 shadow-sm">
      <div className="flex items-center space-x-2">
        <div className="bg-white p-1 rounded-full">
          <Leaf className="w-6 h-6 text-green-600" />
        </div>
        <h1 className="text-xl font-bold">{t('header.title')}</h1>
      </div>
      <div className="flex items-center gap-2">
          <button className="relative p-2 rounded-full hover:bg-white/20" onClick={onAlertClick}>
            <Bell className="w-6 h-6" />
            {alertCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500 text-white text-xs items-center justify-center">{alertCount}</span>
                </span>
            )}
          </button>
        <HelpCircle className="w-6 h-6" />
      </div>
    </header>
  );
};

const OutbreakAlertBanner: React.FC<{ alert: OutbreakAlert; onDismiss: () => void }> = ({ alert, onDismiss }) => {
    const { t } = useLocalization();
    return (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 m-4 rounded-r-lg shadow-lg animate-fade-in-up" role="alert">
            <div className="flex">
                <div className="py-1"><AlertTriangle className="h-6 w-6 text-red-500 mr-4"/></div>
                <div>
                    <p className="font-bold">{t('dashboard.outbreakAlertTitle')}: {alert.disease}</p>
                    <p className="text-sm">{alert.advice}</p>
                </div>
                <button onClick={onDismiss} className="ml-auto -mt-2 -mr-2 p-1 text-red-500 hover:text-red-800" aria-label="Dismiss">
                    <X className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}

const VoiceControl: React.FC<{ onOpenChatbot: () => void }> = ({ onOpenChatbot }) => {
  const { t } = useLocalization();
  return (
    <button onClick={onOpenChatbot} className="w-full flex flex-col items-center justify-center text-center py-8 px-4 text-black focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-lg">
      <div className="relative mb-4">
        <div className="absolute -inset-1 border border-gray-300/70 rounded-full animate-pulse"></div>
        <div className="absolute -inset-2.5 border border-gray-300/50 rounded-full animate-pulse delay-500"></div>
        <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
          <Mic className="w-16 h-16 text-gray-700" />
        </div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 bg-white px-2 py-1 rounded-md shadow-sm">
          <span role="img" aria-label="Indian Flag">🇮🇳</span>
        </div>
      </div>
      <p className="font-semibold text-lg">{t('dashboard.speakPrompt')}</p>
    </button>
  );
};

const NavCard: React.FC<{ 
    icon: React.ReactNode; 
    title: string; 
    bgColor: string; 
    children?: React.ReactNode;
    onClick?: () => void;
    isButton?: boolean;
}> = ({ icon, title, bgColor, children, onClick, isButton }) => {
    const content = (
        <>
            <div className="flex-grow flex items-center justify-center">
                {icon}
            </div>
            <p className="font-semibold text-black mt-2 text-center">{title}</p>
            {children}
        </>
    );
    const classNames = `relative ${bgColor} p-4 rounded-2xl flex flex-col justify-between items-center h-36 shadow-sm w-full transition-transform hover:scale-105`;

    if (isButton) {
        return (
            <button onClick={onClick} className={`${classNames} text-black`}>
                {content}
            </button>
        );
    }
    return <div className={classNames}>{content}</div>;
};

const MainContent: React.FC<{ onNavigate: (page: AppPage) => void }> = ({ onNavigate }) => {
  const { t } = useLocalization();
  return (
    <main className="px-4 pb-4">
        <div className="bg-white rounded-3xl p-4 shadow-lg">
            <div className="grid grid-cols-2 gap-4">
                <NavCard 
                    isButton
                    onClick={() => onNavigate('crop')}
                    icon={<Sprout className="w-10 h-10 text-yellow-700"/>} 
                    title={t('dashboard.cropAdvice')}
                    bgColor="bg-brand-cardYellow" 
                />
                <NavCard 
                    isButton
                    onClick={() => onNavigate('pest')}
                    icon={<Bug className="w-10 h-10 text-teal-700"/>} 
                    title={t('dashboard.pestAdvice')}
                    bgColor="bg-brand-cardTeal"
                >
                   <div className="absolute top-3 right-3 bg-white/50 p-1.5 rounded-full">
                     <Search className="w-4 h-4 text-teal-800" />
                   </div>
                </NavCard>
                <NavCard 
                    isButton 
                    onClick={() => onNavigate('weather')} 
                    icon={<CloudSun className="w-10 h-10 text-teal-700"/>} 
                    title={t('dashboard.weatherUpdate')}
                    bgColor="bg-brand-cardTeal" 
                />
                <NavCard 
                    isButton
                    onClick={() => onNavigate('market')}
                    icon={<BarChart className="w-10 h-10 text-yellow-700"/>} 
                    title={t('dashboard.marketPrices')}
                    bgColor="bg-brand-cardYellow"
                >
                    <div className="absolute top-3 right-3 bg-white/50 p-1.5 rounded-full">
                     <IndianRupee className="w-4 h-4 text-yellow-800" />
                   </div>
                </NavCard>
                <NavCard 
                    isButton
                    onClick={() => onNavigate('schemes')}
                    icon={<Landmark className="w-10 h-10 text-teal-700"/>} 
                    title={t('dashboard.govtSchemes')}
                    bgColor="bg-brand-cardTeal" 
                />
                <NavCard 
                    isButton
                    onClick={() => onNavigate('allocations')}
                    icon={<Package className="w-10 h-10 text-yellow-700"/>} 
                    title={t('dashboard.myAllocations')}
                    bgColor="bg-brand-cardYellow"
                />
            </div>
        </div>
    </main>
  );
};

interface BottomNavProps {
  onOpenChatbot: () => void;
  onNavigate: (page: AppPage) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onOpenChatbot, onNavigate }) => (
  <footer className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-sm border-t border-gray-200 shadow-t-lg z-10">
    <div className="flex justify-around items-center h-20">
      <button onClick={() => onNavigate('dashboard')} className="flex flex-col items-center text-primary-600 font-medium">
        <Home className="w-7 h-7" />
      </button>
      <button onClick={onOpenChatbot} className="flex flex-col items-center text-gray-600 hover:text-primary-600">
        <div className="w-16 h-16 -mt-10 bg-primary-600 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
          <Mic className="w-8 h-8 text-white" />
        </div>
      </button>
      <button onClick={() => onNavigate('profile')} className="flex flex-col items-center text-gray-600 hover:text-primary-600">
        <User className="w-7 h-7" />
      </button>
    </div>
  </footer>
);

const Dashboard: React.FC<DashboardProps> = ({ onNavigate, onOpenChatbot }) => {
  const [alerts, setAlerts] = useState<OutbreakAlert[]>([]);
  const [visibleAlertId, setVisibleAlertId] = useState<string | null>(null);

  useEffect(() => {
      getOutbreakAlerts().then(fetchedAlerts => {
          setAlerts(fetchedAlerts);
          if (fetchedAlerts.length > 0) {
              setVisibleAlertId(fetchedAlerts[0].id);
          }
      });
  }, []);

  const handleDismissAlert = () => {
      setVisibleAlertId(null);
  };
  
  const visibleAlert = alerts.find(a => a.id === visibleAlertId);

  return (
    <div className="max-w-md mx-auto bg-brand-bg min-h-screen pb-20">
      <Header alertCount={visibleAlert ? 1 : 0} onAlertClick={() => setVisibleAlertId(alerts[0]?.id || null)} />
      {visibleAlert && <OutbreakAlertBanner alert={visibleAlert} onDismiss={handleDismissAlert} />}
      <VoiceControl onOpenChatbot={onOpenChatbot} />
      <MainContent onNavigate={onNavigate} />
      <BottomNav onOpenChatbot={onOpenChatbot} onNavigate={onNavigate}/>
    </div>
  );
};

export default Dashboard;
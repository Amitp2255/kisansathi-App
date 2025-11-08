import React, { useState } from 'react';
import Dashboard from './Dashboard';
import WeatherPage from './Layout';
import MarketPage from './Sidebar';
import CropRecommenderPage from './CropRecommender';
import PestAdvisoryPage from './PestAdvisory';
import Chatbot from './Chatbot';
import GovernmentSchemesPage from './GovernmentSchemesPage';
import AllocationsPage from './AllocationsPage';
import ProfilePage from './ProfilePage';
import { AppPage } from '../types';

const FarmerApp: React.FC = () => {
  const [activePage, setActivePage] = useState<AppPage>('dashboard');
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const handleNavigate = (page: AppPage) => {
    setActivePage(page);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'weather':
        return <WeatherPage onBack={() => handleNavigate('dashboard')} />;
      case 'market':
        return <MarketPage onBack={() => handleNavigate('dashboard')} />;
      case 'crop':
        return <CropRecommenderPage onBack={() => handleNavigate('dashboard')} />;
      case 'pest':
        return <PestAdvisoryPage onBack={() => handleNavigate('dashboard')} />;
      case 'schemes':
        return <GovernmentSchemesPage onBack={() => handleNavigate('dashboard')} />;
      case 'allocations':
        return <AllocationsPage onBack={() => handleNavigate('dashboard')} />;
      case 'profile':
        return <ProfilePage onBack={() => handleNavigate('dashboard')} />;
      default:
        return <Dashboard onNavigate={handleNavigate} onOpenChatbot={() => setIsChatbotOpen(true)} />;
    }
  };

  return (
    <div className="bg-brand-bg min-h-screen font-sans">
      {renderPage()}
      {isChatbotOpen && (
         <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 flex items-center justify-center p-4">
            <Chatbot onClose={() => setIsChatbotOpen(false)} />
        </div>
      )}
    </div>
  );
};

export default FarmerApp;

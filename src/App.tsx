import { useState, useEffect } from 'react';
import { Navigation } from './components/navigation';
import { LandingPage } from './components/landing-page';
import { Onboarding } from './components/onboarding';
import { Dashboard } from './components/dashboard';
import { QuickAdd } from './components/quick-add';
import { Insights } from './components/insights';
import { GoalsSavings } from './components/goals-savings';
import { Predictions } from './components/predictions';
import { SettingsPrivacy } from './components/settings-privacy';
import { CelebrateModal, celebrationPresets } from './components/celebrate-modal';

interface UserData {
  name: string;
  gender: string;
  profession: string;
  reason: string;
  payFrequency: string;
  currency: string;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [celebration, setCelebration] = useState<any>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Check if user has already completed onboarding
    const savedUserData = localStorage.getItem('billu-user-data');
    if (savedUserData) {
      setUserData(JSON.parse(savedUserData));
      setCurrentPage('dashboard');
    }
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('onboarding');
  };

  const handleOnboardingComplete = (data: UserData) => {
    setUserData(data);
    localStorage.setItem('billu-user-data', JSON.stringify(data));
    setCurrentPage('dashboard');
    
    // Welcome celebration
    setTimeout(() => {
      setCelebration({
        type: 'streak_achievement',
        title: '🎉 Welcome to Billu Budget!',
        message: `Great choice, ${data.name}! You're taking the first step towards financial freedom. Let's start tracking your expenses and building healthy money habits.`
      });
    }, 1000);
  };

  const handleOnboardingBack = () => {
    setCurrentPage('landing');
  };

  const handleQuickAddSave = (transaction: any) => {
    // In a real app, this would save to local storage
    const existingTransactions = JSON.parse(localStorage.getItem('billu-transactions') || '[]');
    existingTransactions.push(transaction);
    localStorage.setItem('billu-transactions', JSON.stringify(existingTransactions));
    console.log('Transaction saved:', transaction);
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'landing':
        return (
          <LandingPage 
            onGetStarted={handleGetStarted}
            userName={userData?.name}
          />
        );
      
      case 'onboarding':
        return (
          <Onboarding 
            onComplete={handleOnboardingComplete}
            onBack={handleOnboardingBack}
          />
        );
      
      case 'dashboard':
        return (
          <Dashboard 
            userName={userData?.name}
            onQuickAdd={() => setShowQuickAdd(true)}
          />
        );
      
      case 'insights':
        return <Insights />;
      
      case 'goals':
        return <GoalsSavings />;
      
      case 'predictions':
        return <Predictions />;
      
      case 'settings':
        return <SettingsPrivacy />;
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  if (currentPage === 'landing' || currentPage === 'onboarding') {
    return (
      <div className="min-h-screen">
        {renderCurrentPage()}
        {showQuickAdd && (
          <QuickAdd
            onClose={() => setShowQuickAdd(false)}
            onSave={handleQuickAddSave}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation 
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isMobile={isMobile}
      />
      
      <main className={`${isMobile ? 'pt-16 pb-20' : 'ml-64'} p-6`}>
        <div className="max-w-6xl mx-auto">
          {renderCurrentPage()}
        </div>
      </main>
      
      {showQuickAdd && (
        <QuickAdd
          onClose={() => setShowQuickAdd(false)}
          onSave={handleQuickAddSave}
        />
      )}
      
      {celebration && (
        <CelebrateModal
          {...celebration}
          onClose={() => setCelebration(null)}
          onShare={() => {
            // Handle sharing
            console.log('Sharing achievement...');
            setCelebration(null);
          }}
        />
      )}
    </div>
  );
}
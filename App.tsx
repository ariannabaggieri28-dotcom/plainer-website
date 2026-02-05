
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserRole } from './types';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureShowcase from './components/FeatureShowcase';
import ProjectManager from './components/ProjectManager';
import AISection from './components/AISection';
import TrustStrip from './components/TrustStrip';
import Timeline from './components/Timeline';
import VerifiedPros from './components/VerifiedPros';
import LegalProtection from './components/LegalProtection';
import PaymentProtocol from './components/PaymentProtocol';
import Reviews from './components/Reviews';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';
import AdminLogin from './components/AdminLogin';
import PrivacyPage from './components/PrivacyPage';
import BetaOverlay from './components/BetaOverlay';

const LandingPage: React.FC<{ role: UserRole, onJoinBeta: () => void }> = ({ role, onJoinBeta }) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [role]);

  return (
    <div className="flex flex-col min-h-screen">
      <Hero role={role} onJoinBeta={onJoinBeta} />
      <TrustStrip role={role} />
      <FeatureShowcase role={role} />
      <ProjectManager role={role} />
      <VerifiedPros role={role} />
      <AISection role={role} />
      <Timeline role={role} />
      <PaymentProtocol role={role} />
      <LegalProtection role={role} />
      <Reviews role={role} />
      <Pricing role={role} />
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole>(UserRole.PRIVATI);
  const [isBetaOverlayOpen, setIsBetaOverlayOpen] = useState(false);

  return (
    <Router>
      <div className={`font-sans antialiased selection:bg-plainer selection:text-white transition-colors duration-500 ${role === UserRole.PROFESSIONISTI ? 'bg-[#0A0A0A]' : 'bg-white'}`}>
        <Header role={role} setRole={setRole} onJoinBeta={() => setIsBetaOverlayOpen(true)} />
        
        <Routes>
          <Route path="/" element={
            <LandingPage role={role} onJoinBeta={() => setIsBetaOverlayOpen(true)} />
          } />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Routes>

        <BetaOverlay 
          isOpen={isBetaOverlayOpen} 
          onClose={() => setIsBetaOverlayOpen(false)} 
          role={role} 
        />
      </div>
    </Router>
  );
};

export default App;

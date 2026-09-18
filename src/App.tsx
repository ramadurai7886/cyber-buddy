import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import { DiscreetProvider, useDiscreet } from './context/DiscreetContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Chatbot } from './components/chatbot/Chatbot';
import { ProtectedRoute } from './components/common/ProtectedRoute';

import { LandingPage } from './pages/LandingPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { WellnessPage } from './pages/WellnessPage';
import { HelplinesPage } from './pages/HelplinesPage';
import { LoginPage } from './pages/LoginPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { DashboardPage } from './pages/DashboardPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { DiscreetView } from './pages/DiscreetView';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export const AppContent: React.FC = () => {
  const { isDiscreetMode } = useDiscreet();
  const location = useLocation();

  // When Discreet Mode (Quick Exit) is triggered, mask entire UI with benign Calculator / Weather View
  if (isDiscreetMode) {
    return <DiscreetView />;
  }

  const isEmergency = location.pathname.startsWith('/emergency');

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
      <ScrollToTop />
      <Navbar />

      <main className="flex-1 pb-20 md:pb-0">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/emergency" element={<EmergencyPage />} />
          <Route path="/wellness" element={<WellnessPage />} />
          <Route path="/helplines" element={<HelplinesPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {!isEmergency && <Footer />}

      {/* Floating Assistant available across app */}
      <Chatbot />

      {/* Mobile Ergonomic Bottom Safety Dock */}
      <MobileBottomNav />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <DiscreetProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </DiscreetProvider>
  );
};

export default App;

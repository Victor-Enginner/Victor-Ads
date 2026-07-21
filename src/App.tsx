import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuthStore } from './stores/authStore';
import { LanguageProvider } from './i18n/LanguageContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashboardLayout from './components/layout/DashboardLayout';
import SiteHeader from './components/SiteHeader';
import AuraiHero from './components/AuraiHero';
import TrustMarquee from './components/TrustMarquee';
import ScrollProgress from './components/ScrollProgress';
import CursorGlow from './components/CursorGlow';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ServicesSection from './components/ServicesSection';
import HowItWorks from './components/HowItWorks';
import SentinelSection from './components/SentinelSection';
import PortfolioSection from './components/PortfolioSection';
import PricingSection from './components/PricingSection';
import FaqSection from './components/FaqSection';
import CtaSection from './components/CtaSection';
import Footer from './components/Footer';
import { Toast } from './components/Toast';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ChatPage from './pages/ChatPage';
import SettingsPage from './pages/SettingsPage';
import ContactsPage from './pages/ContactsPage';
import AppointmentsPage from './pages/AppointmentsPage';
import KnowledgeBasePage from './pages/KnowledgeBasePage';
import BillingPage from './pages/BillingPage';

function LandingPage() {
  return (
    <>
      <ScrollProgress />
      <CursorGlow />
      <SiteHeader />
      <AuraiHero />
      <TrustMarquee />
      <ServicesSection />
      <HowItWorks />
      <SentinelSection />
      <PortfolioSection />
      <PricingSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default function App() {
  const { loadFromStorage, isLoading } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full animate-spin" />
          <p className="text-white/40 text-sm font-askan">Victor Ads</p>
        </div>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <LanguageProvider>
        <Toast />
        <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected dashboard routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="appointments" element={<AppointmentsPage />} />
          <Route path="knowledge" element={<KnowledgeBasePage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </LanguageProvider>
    </BrowserRouter>
  );
}

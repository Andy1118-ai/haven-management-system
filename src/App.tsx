import React, { useState } from 'react';
import { useAuth } from './hooks/useAuth';
import { LoginForm } from './components/auth/LoginForm';
import { LoadingSpinner } from './components/ui/LoadingSpinner';
import { ErrorBoundary } from './components/ui/ErrorBoundary';
import { MobileSidebar } from './components/layout/MobileSidebar';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { Dashboard } from './components/dashboard/Dashboard';
import { PatientList } from './components/patients/PatientList';
import { AppointmentScheduler } from './components/appointments/AppointmentScheduler';
import { SessionNotes } from './components/sessions/SessionNotes';
import { ClientResources } from './components/resources/ClientResources';
import { BillingManagement } from './components/billing/BillingManagement';
import { DocumentManagement } from './components/documents/DocumentManagement';
import { CommunicationsHub } from './components/communications/CommunicationsHub';
import { StaffManagement } from './components/staff/StaffManagement';
import { ReportsAnalytics } from './components/reports/ReportsAnalytics';
import { Settings } from './components/settings/Settings';
import { ToastContainer, useToastNotifications } from './components/notifications/NotificationToast';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { toasts, removeToast } = useToastNotifications();
  const { user, profile, loading, isAuthenticated } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <LoadingSpinner size="lg" text="Loading..." />
      </div>
    );
  }

  // Show login form if not authenticated
  if (!isAuthenticated) {
    return <LoginForm />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'patients':
        return <PatientList />;
      case 'appointments':
        return <AppointmentScheduler />;
      case 'billing':
        return <BillingManagement />;
      case 'staff':
        return <StaffManagement />;
      case 'sessions':
        return <SessionNotes />;
      case 'documents':
        return <DocumentManagement />;
      case 'communications':
        return <CommunicationsHub />;
      case 'reports':
        return <ReportsAnalytics />;
      case 'settings':
        return <Settings />;
      case 'resources':
        return <ClientResources />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ErrorBoundary>
      <ToastContainer toasts={toasts} onRemoveToast={removeToast} />
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        
        {/* Mobile Sidebar */}
        <MobileSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto p-4 lg:p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;
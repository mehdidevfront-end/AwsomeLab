import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Sidebar from './Sidebar';
import AdminDashboard from '../admin/AdminDashboard';
import InstructorSpace from '../client/InstructorSpace';
import StudentSpace from '../client/StudentSpace';

// Import existing components for admin views
import PipelineStatus from '../PipelineStatus';
import EnvironmentManager from '../EnvironmentManager';
import DatabasePanel from '../DatabasePanel';
import CostMonitor from '../CostMonitor';
import AlertCenter from '../AlertCenter';
import StudentDashboard from '../StudentDashboard';

const AuthenticatedApp: React.FC = () => {
  const { user } = useAuth();
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    if (user?.role === 'admin') {
      switch (activeView) {
        case 'dashboard':
          return <AdminDashboard />;
        case 'users':
          return <AdminDashboard />;
        case 'environments':
          return (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <EnvironmentManager />
              <DatabasePanel />
            </div>
          );
        case 'costs':
          return <CostMonitor />;
        case 'alerts':
          return <AlertCenter />;
        case 'settings':
          return <AdminDashboard />;
        default:
          return <AdminDashboard />;
      }
    }

    if (user?.role === 'instructor') {
      switch (activeView) {
        case 'dashboard':
          return <InstructorSpace />;
        case 'courses':
          return <InstructorSpace />;
        case 'students':
          return <StudentDashboard />;
        case 'assignments':
          return <InstructorSpace />;
        case 'analytics':
          return (
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <CostMonitor />
              <div className="grid gap-6">
                <PipelineStatus />
                <AlertCenter />
              </div>
            </div>
          );
        case 'settings':
          return <InstructorSpace />;
        default:
          return <InstructorSpace />;
      }
    }

    if (user?.role === 'student') {
      switch (activeView) {
        case 'dashboard':
          return <StudentSpace />;
        case 'deploy':
          return <StudentSpace />;
        case 'learning':
          return <StudentSpace />;
        case 'settings':
          return <StudentSpace />;
        default:
          return <StudentSpace />;
      }
    }

    return <div>Access denied</div>;
  };

  return (
    <div className="min-h-screen bg-slate-900 flex">
      <Sidebar activeView={activeView} onViewChange={setActiveView} />
      
      <main className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthenticatedApp;
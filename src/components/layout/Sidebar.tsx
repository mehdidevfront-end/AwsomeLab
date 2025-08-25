import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Code, 
  Settings, 
  LogOut,
  Shield,
  Database,
  BarChart3,
  Bell
} from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onViewChange: (view: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const { user, logout } = useAuth();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { id: 'dashboard', label: 'System Overview', icon: LayoutDashboard },
          { id: 'users', label: 'User Management', icon: Users },
          { id: 'environments', label: 'Environments', icon: Database },
          { id: 'costs', label: 'Cost Analysis', icon: BarChart3 },
          { id: 'alerts', label: 'System Alerts', icon: Bell },
          { id: 'settings', label: 'System Settings', icon: Settings }
        ];
      case 'instructor':
        return [
          { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
          { id: 'courses', label: 'My Courses', icon: BookOpen },
          { id: 'students', label: 'Student Progress', icon: Users },
          { id: 'assignments', label: 'Assignments', icon: Code },
          { id: 'analytics', label: 'Analytics', icon: BarChart3 },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      case 'student':
        return [
          { id: 'dashboard', label: 'My Projects', icon: LayoutDashboard },
          { id: 'deploy', label: 'Quick Deploy', icon: Code },
          { id: 'learning', label: 'Learning Resources', icon: BookOpen },
          { id: 'settings', label: 'Settings', icon: Settings }
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
      {/* User Profile */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          {user?.avatar ? (
            <img 
              src={user.avatar} 
              alt={user.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
              {user?.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
          <div>
            <div className="font-medium text-white">{user?.name}</div>
            <div className="flex items-center space-x-2">
              {user?.role === 'admin' && <Shield className="h-3 w-3 text-red-400" />}
              <span className="text-xs text-slate-400 capitalize">{user?.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                    isActive 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-slate-700">
        <button
          onClick={logout}
          className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
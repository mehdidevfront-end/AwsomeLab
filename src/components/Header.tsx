import React from 'react';
import { Cloud, Users, Settings, Bell } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-900 border-b border-slate-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
            <Cloud className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">DevOps Academy</h1>
            <p className="text-sm text-slate-400">AWS Learning Platform</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 text-slate-400 hover:text-white transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">3</span>
          </button>
          <button className="p-2 text-slate-400 hover:text-white transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <div className="flex items-center space-x-2 bg-slate-800 rounded-full px-3 py-2">
            <Users className="h-4 w-4 text-slate-400" />
            <span className="text-sm text-slate-300">42 Students Active</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
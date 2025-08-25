import React, { useState } from 'react';
import { Bell, MessageSquare, Slack, AlertTriangle, CheckCircle, XCircle, Clock } from 'lucide-react';

interface Alert {
  id: string;
  type: 'error' | 'warning' | 'info' | 'success';
  title: string;
  message: string;
  timestamp: string;
  service: string;
  status: 'active' | 'resolved' | 'acknowledged';
}

const AlertCenter: React.FC = () => {
  const [alerts] = useState<Alert[]>([
    {
      id: '1',
      type: 'error',
      title: 'Build Failed',
      message: 'student-app-backend pipeline failed during test phase. Exit code: 1',
      timestamp: '5 min ago',
      service: 'CodeBuild',
      status: 'active'
    },
    {
      id: '2',
      type: 'warning',
      title: 'High Database Connections',
      message: 'analytics-db approaching connection limit (45/50 connections)',
      timestamp: '12 min ago',
      service: 'RDS',
      status: 'acknowledged'
    },
    {
      id: '3',
      type: 'info',
      title: 'New Student Environment',
      message: 'Successfully created environment for student-jane-smith',
      timestamp: '1h ago',
      service: 'Environment Manager',
      status: 'resolved'
    },
    {
      id: '4',
      type: 'warning',
      title: 'Budget Alert',
      message: 'Monthly AWS spending is at 75% of budget ($375/$500)',
      timestamp: '2h ago',
      service: 'Cost Monitor',
      status: 'active'
    }
  ]);

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-400" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      default: return <Clock className="h-5 w-5 text-blue-400" />;
    }
  };

  const getAlertBg = (type: string, status: string) => {
    const opacity = status === 'resolved' ? '5' : '10';
    switch (type) {
      case 'error': return `bg-red-500/${opacity} border-red-500/20`;
      case 'warning': return `bg-yellow-500/${opacity} border-yellow-500/20`;
      case 'success': return `bg-green-500/${opacity} border-green-500/20`;
      default: return `bg-blue-500/${opacity} border-blue-500/20`;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-red-400';
      case 'acknowledged': return 'text-yellow-400';
      case 'resolved': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const activeAlerts = alerts.filter(alert => alert.status === 'active').length;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h2 className="text-xl font-semibold text-white">Alert Center</h2>
          {activeAlerts > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              {activeAlerts} active
            </span>
          )}
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors">
            <Slack className="h-4 w-4" />
            <span>Slack</span>
          </button>
          <button className="flex items-center space-x-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm text-slate-300 transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {alerts.map((alert) => (
          <div key={alert.id} className={`p-4 rounded-lg border ${getAlertBg(alert.type, alert.status)} ${alert.status === 'resolved' ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-medium text-white">{alert.title}</h3>
                    <span className="text-xs text-slate-400">({alert.service})</span>
                  </div>
                  <p className="text-sm text-slate-300 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-3 text-xs">
                    <span className="text-slate-400">{alert.timestamp}</span>
                    <span className={`font-medium capitalize ${getStatusColor(alert.status)}`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              </div>
              
              {alert.status === 'active' && (
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-1 text-xs bg-yellow-500/20 text-yellow-400 rounded-full hover:bg-yellow-500/30 transition-colors">
                    Acknowledge
                  </button>
                  <button className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full hover:bg-green-500/30 transition-colors">
                    Resolve
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-slate-900/50 rounded-lg border border-slate-600">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2">
            <Bell className="h-4 w-4 text-slate-400" />
            <span className="text-slate-400">Notification Settings</span>
          </div>
          <button className="text-blue-400 hover:text-blue-300 transition-colors">
            Configure →
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertCenter;
import React from 'react';
import { Database, TrendingUp, AlertCircle, Activity } from 'lucide-react';

const DatabasePanel: React.FC = () => {
  const databases = [
    {
      name: 'student-app-db',
      type: 'PostgreSQL 14',
      status: 'healthy',
      connections: 12,
      maxConnections: 100,
      size: '2.1 GB',
      migrations: 15,
      lastMigration: '2h ago'
    },
    {
      name: 'analytics-db',
      type: 'MySQL 8.0',
      status: 'warning',
      connections: 45,
      maxConnections: 50,
      size: '8.7 GB',
      migrations: 8,
      lastMigration: '1 day ago'
    },
    {
      name: 'cache-redis',
      type: 'Redis 7.0',
      status: 'healthy',
      connections: 23,
      maxConnections: 1000,
      size: '145 MB',
      migrations: 0,
      lastMigration: 'N/A'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Database Management</h2>
        <div className="flex items-center space-x-2">
          <Activity className="h-5 w-5 text-green-400" />
          <span className="text-sm text-slate-400">All systems operational</span>
        </div>
      </div>

      <div className="grid gap-4">
        {databases.map((db, index) => (
          <div key={index} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Database className={`h-5 w-5 ${getStatusColor(db.status)}`} />
                <div>
                  <h3 className="font-medium text-white">{db.name}</h3>
                  <p className="text-sm text-slate-400">{db.type}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {db.status === 'warning' && (
                  <AlertCircle className="h-4 w-4 text-yellow-400" />
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(db.status)} bg-current bg-opacity-10`}>
                  {db.status}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div>
                <div className="text-slate-400">Connections</div>
                <div className="font-medium text-white">
                  {db.connections}/{db.maxConnections}
                </div>
                <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                  <div 
                    className={`h-1 rounded-full ${db.connections / db.maxConnections > 0.8 ? 'bg-red-400' : 'bg-green-400'}`}
                    style={{ width: `${(db.connections / db.maxConnections) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="text-slate-400">Size</div>
                <div className="font-medium text-white">{db.size}</div>
              </div>

              <div>
                <div className="text-slate-400">Migrations</div>
                <div className="font-medium text-white">{db.migrations}</div>
              </div>

              <div>
                <div className="text-slate-400">Last Migration</div>
                <div className="font-medium text-white">{db.lastMigration}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <div className="flex items-center space-x-2 mb-2">
          <TrendingUp className="h-5 w-5 text-blue-400" />
          <h4 className="font-medium text-blue-400">Migration History</h4>
        </div>
        <p className="text-sm text-slate-300">
          All migrations are tracked in Git. Latest deployment included 3 new tables and 2 schema updates.
          <button className="text-blue-400 hover:text-blue-300 ml-2">View full history →</button>
        </p>
      </div>
    </div>
  );
};

export default DatabasePanel;
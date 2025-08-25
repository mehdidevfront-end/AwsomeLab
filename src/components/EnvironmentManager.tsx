import React, { useState } from 'react';
import { Server, Database, Trash2, RotateCcw, Plus, GitBranch } from 'lucide-react';

interface Environment {
  id: string;
  name: string;
  status: 'active' | 'stopped' | 'deploying' | 'failed';
  type: 'student' | 'staging' | 'production';
  resources: {
    ec2: number;
    rds: number;
    s3: number;
    lambda: number;
  };
  cost: number;
  lastDeployed: string;
  gitRepo: string;
}

const EnvironmentManager: React.FC = () => {
  const [environments, setEnvironments] = useState<Environment[]>([
    {
      id: '1',
      name: 'student-john-doe',
      status: 'active',
      type: 'student',
      resources: { ec2: 1, rds: 1, s3: 2, lambda: 3 },
      cost: 12.45,
      lastDeployed: '10 min ago',
      gitRepo: 'github.com/student/final-project'
    },
    {
      id: '2',
      name: 'team-alpha-staging',
      status: 'deploying',
      type: 'staging',
      resources: { ec2: 2, rds: 1, s3: 3, lambda: 5 },
      cost: 34.20,
      lastDeployed: '2h ago',
      gitRepo: 'github.com/team-alpha/web-app'
    },
    {
      id: '3',
      name: 'production-main',
      status: 'active',
      type: 'production',
      resources: { ec2: 4, rds: 2, s3: 5, lambda: 12 },
      cost: 156.80,
      lastDeployed: '1 day ago',
      gitRepo: 'github.com/company/main-app'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'stopped': return 'text-gray-400 bg-gray-400/10';
      case 'deploying': return 'text-blue-400 bg-blue-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'text-purple-400 bg-purple-400/10';
      case 'staging': return 'text-yellow-400 bg-yellow-400/10';
      case 'production': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Environment Manager</h2>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
          <Plus className="h-4 w-4" />
          <span>New Environment</span>
        </button>
      </div>

      <div className="grid gap-4">
        {environments.map((env) => (
          <div key={env.id} className="bg-slate-900/50 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <h3 className="font-medium text-white">{env.name}</h3>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(env.status)}`}>
                  {env.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(env.type)}`}>
                  {env.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors" title="Redeploy">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button className="p-2 text-slate-400 hover:text-red-400 transition-colors" title="Destroy">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
                  <GitBranch className="h-4 w-4" />
                  <span className="truncate">{env.gitRepo}</span>
                </div>
                <div className="text-xs text-slate-500">Last deployed: {env.lastDeployed}</div>
              </div>
              <div className="text-right">
                <div className="text-lg font-semibold text-white">${env.cost}/month</div>
                <div className="text-xs text-slate-400">Estimated cost</div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <Server className="h-4 w-4 text-blue-400" />
                  <span className="text-slate-300">{env.resources.ec2} EC2</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Database className="h-4 w-4 text-green-400" />
                  <span className="text-slate-300">{env.resources.rds} RDS</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-orange-400 rounded"></div>
                  <span className="text-slate-300">{env.resources.s3} S3</span>
                </div>
                <div className="flex items-center space-x-1">
                  <div className="w-4 h-4 bg-purple-400 rounded"></div>
                  <span className="text-slate-300">{env.resources.lambda} λ</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvironmentManager;
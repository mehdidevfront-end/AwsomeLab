import React, { useState } from 'react';
import { Code, GitBranch, Play, Pause, Trash2, Settings, ExternalLink, Clock, CheckCircle, XCircle } from 'lucide-react';

interface StudentProject {
  id: string;
  name: string;
  repository: string;
  status: 'running' | 'stopped' | 'building' | 'failed';
  url?: string;
  lastDeployed: string;
  cost: number;
  resources: {
    ec2: boolean;
    rds: boolean;
    s3: boolean;
    lambda: boolean;
  };
}

const StudentSpace: React.FC = () => {
  const [projects] = useState<StudentProject[]>([
    {
      id: '1',
      name: 'E-commerce Platform',
      repository: 'github.com/johndoe/ecommerce-app',
      status: 'running',
      url: 'https://ecommerce-johndoe.aws-student.com',
      lastDeployed: '2 hours ago',
      cost: 23.45,
      resources: { ec2: true, rds: true, s3: true, lambda: false }
    },
    {
      id: '2',
      name: 'Weather Dashboard',
      repository: 'github.com/johndoe/weather-app',
      status: 'stopped',
      lastDeployed: '1 day ago',
      cost: 0,
      resources: { ec2: false, rds: false, s3: true, lambda: true }
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'running': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'stopped': return <Pause className="h-5 w-5 text-gray-400" />;
      case 'building': return <Clock className="h-5 w-5 text-blue-400 animate-spin" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'text-green-400 bg-green-400/10';
      case 'stopped': return 'text-gray-400 bg-gray-400/10';
      case 'building': return 'text-blue-400 bg-blue-400/10';
      case 'failed': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const totalCost = projects.reduce((acc, p) => acc + p.cost, 0);
  const runningProjects = projects.filter(p => p.status === 'running').length;

  return (
    <div className="space-y-6">
      {/* Student Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Code className="h-8 w-8 text-purple-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">My Learning Environment</h1>
            <p className="text-slate-300">Deploy and manage your AWS projects</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{projects.length}</div>
            <div className="text-sm text-slate-400">Total Projects</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{runningProjects}</div>
            <div className="text-sm text-slate-400">Running</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">${totalCost.toFixed(2)}</div>
            <div className="text-sm text-slate-400">Monthly Cost</div>
          </div>
        </div>
      </div>

      {/* Quick Deploy */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Deploy from GitHub</h2>
        <div className="flex space-x-4">
          <input
            type="text"
            placeholder="https://github.com/username/repository"
            className="flex-1 px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-6 py-3 rounded-lg text-white font-medium transition-all">
            Deploy
          </button>
        </div>
        <p className="text-sm text-slate-400 mt-2">
          Paste your GitHub repository URL to automatically create an AWS environment
        </p>
      </div>

      {/* Projects List */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-6">My Projects</h2>
        
        {projects.length === 0 ? (
          <div className="text-center py-12">
            <Code className="h-16 w-16 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-400 mb-2">No projects yet</h3>
            <p className="text-slate-500">Deploy your first project from GitHub to get started</p>
          </div>
        ) : (
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="bg-slate-900/50 rounded-lg p-6 border border-slate-600 hover:border-slate-500 transition-colors">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    {getStatusIcon(project.status)}
                    <div>
                      <h3 className="font-semibold text-white">{project.name}</h3>
                      <div className="flex items-center space-x-2 text-sm text-slate-400">
                        <GitBranch className="h-4 w-4" />
                        <span>{project.repository}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status}
                    </span>
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-slate-400 hover:text-blue-400 transition-colors"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="text-sm text-slate-400">Last Deployed</div>
                    <div className="text-white">{project.lastDeployed}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Monthly Cost</div>
                    <div className="text-white">${project.cost.toFixed(2)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-slate-400">Resources</div>
                    <div className="flex items-center space-x-2 mt-1">
                      {project.resources.ec2 && <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded">EC2</span>}
                      {project.resources.rds && <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded">RDS</span>}
                      {project.resources.s3 && <span className="px-2 py-1 bg-orange-500/20 text-orange-400 text-xs rounded">S3</span>}
                      {project.resources.lambda && <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded">λ</span>}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                  <div className="flex items-center space-x-2">
                    {project.status === 'running' ? (
                      <button className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                        <Pause className="h-4 w-4" />
                        <span>Stop</span>
                      </button>
                    ) : (
                      <button className="flex items-center space-x-2 px-3 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors">
                        <Play className="h-4 w-4" />
                        <span>Start</span>
                      </button>
                    )}
                    <button className="flex items-center space-x-2 px-3 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors">
                      <Settings className="h-4 w-4" />
                      <span>Configure</span>
                    </button>
                  </div>
                  
                  <button className="flex items-center space-x-2 px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Learning Resources */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Learning Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="font-medium text-blue-400 mb-2">AWS Documentation</h3>
            <p className="text-sm text-slate-300">Learn about EC2, RDS, S3, and Lambda services</p>
          </div>
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h3 className="font-medium text-green-400 mb-2">DevOps Best Practices</h3>
            <p className="text-sm text-slate-300">CI/CD pipelines and deployment strategies</p>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <h3 className="font-medium text-purple-400 mb-2">Troubleshooting Guide</h3>
            <p className="text-sm text-slate-300">Common issues and solutions</p>
          </div>
          <div className="p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
            <h3 className="font-medium text-yellow-400 mb-2">Cost Optimization</h3>
            <p className="text-sm text-slate-300">Tips to reduce AWS spending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentSpace;
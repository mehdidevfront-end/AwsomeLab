import React from 'react';
import { GitBranch, CheckCircle, XCircle, Clock, PlayCircle } from 'lucide-react';

interface Pipeline {
  id: string;
  name: string;
  status: 'success' | 'failed' | 'running' | 'pending';
  lastRun: string;
  branch: string;
  duration: string;
}

const PipelineStatus: React.FC = () => {
  const pipelines: Pipeline[] = [
    { id: '1', name: 'student-app-frontend', status: 'success', lastRun: '2 min ago', branch: 'main', duration: '3m 42s' },
    { id: '2', name: 'student-app-backend', status: 'running', lastRun: '5 min ago', branch: 'develop', duration: '1m 15s' },
    { id: '3', name: 'migration-service', status: 'failed', lastRun: '12 min ago', branch: 'main', duration: '45s' },
    { id: '4', name: 'learning-platform', status: 'pending', lastRun: '1h ago', branch: 'feature/aws-integration', duration: '-' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'failed': return <XCircle className="h-5 w-5 text-red-400" />;
      case 'running': return <PlayCircle className="h-5 w-5 text-blue-400 animate-pulse" />;
      case 'pending': return <Clock className="h-5 w-5 text-yellow-400" />;
      default: return <Clock className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'success': return 'bg-green-500/10 border-green-500/20';
      case 'failed': return 'bg-red-500/10 border-red-500/20';
      case 'running': return 'bg-blue-500/10 border-blue-500/20';
      case 'pending': return 'bg-yellow-500/10 border-yellow-500/20';
      default: return 'bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">CI/CD Pipelines</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-slate-400">Live Updates</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {pipelines.map((pipeline) => (
          <div key={pipeline.id} className={`p-4 rounded-lg border ${getStatusBg(pipeline.status)} transition-all hover:scale-[1.01]`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getStatusIcon(pipeline.status)}
                <div>
                  <h3 className="font-medium text-white">{pipeline.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-slate-400">
                    <GitBranch className="h-4 w-4" />
                    <span>{pipeline.branch}</span>
                    <span>•</span>
                    <span>{pipeline.lastRun}</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-sm font-medium text-slate-300">{pipeline.duration}</div>
                <div className="text-xs text-slate-500 capitalize">{pipeline.status}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PipelineStatus;
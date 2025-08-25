import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, AlertTriangle } from 'lucide-react';

const CostMonitor: React.FC = () => {
  const costData = {
    current: 248.76,
    lastMonth: 189.34,
    projected: 312.45,
    budget: 500
  };

  const services = [
    { name: 'EC2 Instances', cost: 98.23, percentage: 39.5, trend: 'up' },
    { name: 'RDS Databases', cost: 76.45, percentage: 30.7, trend: 'up' },
    { name: 'S3 Storage', cost: 23.67, percentage: 9.5, trend: 'down' },
    { name: 'Lambda Functions', cost: 15.89, percentage: 6.4, trend: 'stable' },
    { name: 'CloudWatch', cost: 12.34, percentage: 5.0, trend: 'up' },
    { name: 'Other Services', cost: 22.18, percentage: 8.9, trend: 'stable' }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-red-400" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-green-400" />;
      default: return <div className="w-4 h-4 rounded-full bg-gray-400"></div>;
    }
  };

  const budgetUsed = (costData.projected / costData.budget) * 100;

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">AWS Cost Monitor</h2>
        <div className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-400" />
          <span className="text-sm text-slate-400">Monthly tracking</span>
        </div>
      </div>

      {/* Cost Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="text-slate-400 text-sm">Current Month</div>
          <div className="text-2xl font-bold text-white">${costData.current}</div>
          <div className="flex items-center text-sm mt-1">
            <TrendingUp className="h-4 w-4 text-red-400 mr-1" />
            <span className="text-red-400">+31% vs last month</span>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="text-slate-400 text-sm">Projected</div>
          <div className="text-2xl font-bold text-white">${costData.projected}</div>
          <div className="text-sm text-slate-400 mt-1">End of month estimate</div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="text-slate-400 text-sm">Budget Usage</div>
          <div className="text-2xl font-bold text-white">{budgetUsed.toFixed(1)}%</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${budgetUsed > 80 ? 'bg-red-400' : budgetUsed > 60 ? 'bg-yellow-400' : 'bg-green-400'}`}
              style={{ width: `${Math.min(budgetUsed, 100)}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Budget Alert */}
      {budgetUsed > 70 && (
        <div className="mb-6 p-4 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <h4 className="font-medium text-yellow-400">Budget Alert</h4>
          </div>
          <p className="text-sm text-slate-300 mt-1">
            You're approaching your monthly budget limit. Consider reviewing your resource usage.
          </p>
        </div>
      )}

      {/* Service Breakdown */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Service Breakdown</h3>
        <div className="space-y-3">
          {services.map((service, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-900/30 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <span className="text-slate-300 font-medium">{service.name}</span>
                  {getTrendIcon(service.trend)}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-white font-medium">${service.cost}</div>
                  <div className="text-xs text-slate-400">{service.percentage}%</div>
                </div>
                <div className="w-16 bg-slate-700 rounded-full h-2">
                  <div 
                    className="h-2 bg-blue-400 rounded-full"
                    style={{ width: `${service.percentage * 2}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CostMonitor;
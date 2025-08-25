import React, { useState } from 'react';
import { Users, Settings, Shield, Database, Server, Activity, UserPlus, Trash2 } from 'lucide-react';

interface SystemUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'instructor' | 'student';
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  environments: number;
  totalCost: number;
}

const AdminDashboard: React.FC = () => {
  const [users] = useState<SystemUser[]>([
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'instructor@devopsacademy.com',
      role: 'instructor',
      status: 'active',
      lastLogin: '2 hours ago',
      environments: 0,
      totalCost: 0
    },
    {
      id: '2',
      name: 'John Doe',
      email: 'student@devopsacademy.com',
      role: 'student',
      status: 'active',
      lastLogin: '5 minutes ago',
      environments: 2,
      totalCost: 45.67
    },
    {
      id: '3',
      name: 'Jane Smith',
      email: 'jane.smith@student.com',
      role: 'student',
      status: 'active',
      lastLogin: '1 hour ago',
      environments: 1,
      totalCost: 23.45
    },
    {
      id: '4',
      name: 'Mike Johnson',
      email: 'mike.johnson@student.com',
      role: 'student',
      status: 'suspended',
      lastLogin: '3 days ago',
      environments: 0,
      totalCost: 0
    }
  ]);

  const systemStats = {
    totalUsers: users.length,
    activeUsers: users.filter(u => u.status === 'active').length,
    totalEnvironments: users.reduce((acc, u) => acc + u.environments, 0),
    totalCost: users.reduce((acc, u) => acc + u.totalCost, 0),
    instructors: users.filter(u => u.role === 'instructor').length,
    students: users.filter(u => u.role === 'student').length
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'text-red-400 bg-red-400/10';
      case 'instructor': return 'text-blue-400 bg-blue-400/10';
      case 'student': return 'text-green-400 bg-green-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'inactive': return 'text-gray-400 bg-gray-400/10';
      case 'suspended': return 'text-red-400 bg-red-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-red-500/10 to-purple-500/10 rounded-xl p-6 border border-red-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="h-8 w-8 text-red-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">System Administration</h1>
            <p className="text-slate-300">Manage users, environments, and system settings</p>
          </div>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-2">
            <Users className="h-6 w-6 text-blue-400" />
            <span className="text-slate-400">Total Users</span>
          </div>
          <div className="text-3xl font-bold text-white">{systemStats.totalUsers}</div>
          <div className="text-sm text-green-400">{systemStats.activeUsers} active</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-2">
            <Server className="h-6 w-6 text-purple-400" />
            <span className="text-slate-400">Environments</span>
          </div>
          <div className="text-3xl font-bold text-white">{systemStats.totalEnvironments}</div>
          <div className="text-sm text-slate-400">Active deployments</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-2">
            <Database className="h-6 w-6 text-green-400" />
            <span className="text-slate-400">Monthly Cost</span>
          </div>
          <div className="text-3xl font-bold text-white">${systemStats.totalCost.toFixed(2)}</div>
          <div className="text-sm text-yellow-400">+12% vs last month</div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <div className="flex items-center space-x-3 mb-2">
            <Activity className="h-6 w-6 text-orange-400" />
            <span className="text-slate-400">System Health</span>
          </div>
          <div className="text-3xl font-bold text-green-400">99.9%</div>
          <div className="text-sm text-slate-400">Uptime</div>
        </div>
      </div>

      {/* User Management */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">User Management</h2>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
            <UserPlus className="h-4 w-4" />
            <span>Add User</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Environments</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Cost</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Last Login</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-700/50 hover:bg-slate-700/20">
                  <td className="py-4 px-4">
                    <div>
                      <div className="font-medium text-white">{user.name}</div>
                      <div className="text-sm text-slate-400">{user.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getRoleColor(user.role)}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(user.status)}`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-white">{user.environments}</td>
                  <td className="py-4 px-4 text-white">${user.totalCost.toFixed(2)}</td>
                  <td className="py-4 px-4 text-slate-300">{user.lastLogin}</td>
                  <td className="py-4 px-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                        <Settings className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-red-400 transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* System Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">AWS Configuration</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300">Auto-scaling enabled</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300">Cost alerts</span>
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-slate-300">Backup automation</span>
              <div className="w-12 h-6 bg-gray-400 rounded-full relative">
                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
          <h3 className="text-lg font-semibold text-white mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center space-x-2 mb-1">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-400 font-medium">MFA Enabled</span>
              </div>
              <p className="text-sm text-slate-300">All admin accounts require 2FA</p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-1">
                <Database className="h-4 w-4 text-blue-400" />
                <span className="text-blue-400 font-medium">Encryption Active</span>
              </div>
              <p className="text-sm text-slate-300">All data encrypted at rest and in transit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
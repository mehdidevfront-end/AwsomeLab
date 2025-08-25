import React, { useState } from 'react';
import { Users, BookOpen, Play, Code, GitBranch, Award } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  environment: string;
  status: 'active' | 'inactive' | 'building';
  project: string;
  progress: number;
  lastActivity: string;
}

const StudentDashboard: React.FC = () => {
  const [students] = useState<Student[]>([
    {
      id: '1',
      name: 'John Doe',
      environment: 'student-john-doe',
      status: 'active',
      project: 'E-commerce Platform',
      progress: 75,
      lastActivity: '5 min ago'
    },
    {
      id: '2',
      name: 'Jane Smith',
      environment: 'student-jane-smith',
      status: 'building',
      project: 'Social Media App',
      progress: 60,
      lastActivity: '2 min ago'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      environment: 'student-mike-johnson',
      status: 'active',
      project: 'Learning Management System',
      progress: 90,
      lastActivity: '1h ago'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      environment: 'student-sarah-wilson',
      status: 'inactive',
      project: 'Weather Dashboard',
      progress: 45,
      lastActivity: '3h ago'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'building': return 'text-blue-400 bg-blue-400/10 animate-pulse';
      case 'inactive': return 'text-gray-400 bg-gray-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const averageProgress = Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length);

  return (
    <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Student Learning Hub</h2>
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-white transition-colors">
            <Play className="h-4 w-4" />
            <span>Quick Start</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-2 mb-2">
            <Users className="h-5 w-5 text-blue-400" />
            <span className="text-slate-400 text-sm">Total Students</span>
          </div>
          <div className="text-2xl font-bold text-white">{totalStudents}</div>
          <div className="text-sm text-green-400">{activeStudents} active now</div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-5 w-5 text-purple-400" />
            <span className="text-slate-400 text-sm">Average Progress</span>
          </div>
          <div className="text-2xl font-bold text-white">{averageProgress}%</div>
          <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
            <div 
              className="h-2 bg-purple-400 rounded-full"
              style={{ width: `${averageProgress}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-600">
          <div className="flex items-center space-x-2 mb-2">
            <Award className="h-5 w-5 text-yellow-400" />
            <span className="text-slate-400 text-sm">Deployments Today</span>
          </div>
          <div className="text-2xl font-bold text-white">15</div>
          <div className="text-sm text-green-400">+3 from yesterday</div>
        </div>
      </div>

      {/* Student List */}
      <div className="space-y-3">
        {students.map((student) => (
          <div key={student.id} className="bg-slate-900/30 rounded-lg p-4 border border-slate-600 hover:border-slate-500 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {student.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-medium text-white">{student.name}</h3>
                  <p className="text-sm text-slate-400">{student.project}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student.status)}`}>
                  {student.status}
                </span>
                <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                  <Code className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-slate-400">Environment</div>
                <div className="flex items-center space-x-1 text-slate-300">
                  <GitBranch className="h-3 w-3" />
                  <span className="truncate">{student.environment}</span>
                </div>
              </div>

              <div>
                <div className="text-slate-400">Progress</div>
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-slate-700 rounded-full h-2">
                    <div 
                      className="h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"
                      style={{ width: `${student.progress}%` }}
                    ></div>
                  </div>
                  <span className="text-white font-medium">{student.progress}%</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-slate-400">Last Activity</div>
                <div className="text-slate-300">{student.lastActivity}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mt-6 p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-white mb-1">Quick Deploy from GitHub</h4>
            <p className="text-sm text-slate-300">Students can instantly create AWS environments from their repositories</p>
          </div>
          <button className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 px-4 py-2 rounded-lg text-white transition-all">
            Deploy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
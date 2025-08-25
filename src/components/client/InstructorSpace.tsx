import React, { useState } from 'react';
import { BookOpen, Users, BarChart3, Settings, Plus, Eye, MessageSquare } from 'lucide-react';

interface Course {
  id: string;
  name: string;
  students: number;
  activeProjects: number;
  totalCost: number;
  status: 'active' | 'draft' | 'archived';
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  submissions: number;
  totalStudents: number;
  status: 'active' | 'grading' | 'completed';
}

const InstructorSpace: React.FC = () => {
  const [courses] = useState<Course[]>([
    {
      id: '1',
      name: 'AWS DevOps Fundamentals',
      students: 25,
      activeProjects: 18,
      totalCost: 456.78,
      status: 'active'
    },
    {
      id: '2',
      name: 'Advanced Cloud Architecture',
      students: 15,
      activeProjects: 12,
      totalCost: 234.56,
      status: 'active'
    },
    {
      id: '3',
      name: 'Container Orchestration',
      students: 20,
      activeProjects: 0,
      totalCost: 0,
      status: 'draft'
    }
  ]);

  const [assignments] = useState<Assignment[]>([
    {
      id: '1',
      title: 'Deploy E-commerce Platform',
      course: 'AWS DevOps Fundamentals',
      dueDate: '2024-03-15',
      submissions: 18,
      totalStudents: 25,
      status: 'active'
    },
    {
      id: '2',
      title: 'Implement CI/CD Pipeline',
      course: 'AWS DevOps Fundamentals',
      dueDate: '2024-03-10',
      submissions: 22,
      totalStudents: 25,
      status: 'grading'
    },
    {
      id: '3',
      title: 'Multi-tier Architecture',
      course: 'Advanced Cloud Architecture',
      dueDate: '2024-03-20',
      submissions: 8,
      totalStudents: 15,
      status: 'active'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'draft': return 'text-yellow-400 bg-yellow-400/10';
      case 'archived': return 'text-gray-400 bg-gray-400/10';
      case 'grading': return 'text-blue-400 bg-blue-400/10';
      case 'completed': return 'text-purple-400 bg-purple-400/10';
      default: return 'text-gray-400 bg-gray-400/10';
    }
  };

  const totalStudents = courses.reduce((acc, c) => acc + c.students, 0);
  const totalCost = courses.reduce((acc, c) => acc + c.totalCost, 0);
  const activeAssignments = assignments.filter(a => a.status === 'active').length;

  return (
    <div className="space-y-6">
      {/* Instructor Header */}
      <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 rounded-xl p-6 border border-blue-500/20">
        <div className="flex items-center space-x-3 mb-4">
          <BookOpen className="h-8 w-8 text-blue-400" />
          <div>
            <h1 className="text-2xl font-bold text-white">Instructor Dashboard</h1>
            <p className="text-slate-300">Manage courses, assignments, and student progress</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">{courses.length}</div>
            <div className="text-sm text-slate-400">Active Courses</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-blue-400">{totalStudents}</div>
            <div className="text-sm text-slate-400">Total Students</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-green-400">{activeAssignments}</div>
            <div className="text-sm text-slate-400">Active Assignments</div>
          </div>
          <div className="bg-slate-800/50 rounded-lg p-4">
            <div className="text-2xl font-bold text-white">${totalCost.toFixed(2)}</div>
            <div className="text-sm text-slate-400">Monthly AWS Cost</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border border-slate-700 transition-colors text-left">
          <div className="flex items-center space-x-3 mb-2">
            <Plus className="h-6 w-6 text-blue-400" />
            <span className="font-medium text-white">Create Assignment</span>
          </div>
          <p className="text-sm text-slate-400">Set up a new AWS project assignment</p>
        </button>
        
        <button className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border border-slate-700 transition-colors text-left">
          <div className="flex items-center space-x-3 mb-2">
            <BarChart3 className="h-6 w-6 text-green-400" />
            <span className="font-medium text-white">View Analytics</span>
          </div>
          <p className="text-sm text-slate-400">Student progress and cost reports</p>
        </button>
        
        <button className="bg-slate-800 hover:bg-slate-700 rounded-xl p-6 border border-slate-700 transition-colors text-left">
          <div className="flex items-center space-x-3 mb-2">
            <MessageSquare className="h-6 w-6 text-purple-400" />
            <span className="font-medium text-white">Send Announcement</span>
          </div>
          <p className="text-sm text-slate-400">Notify students about updates</p>
        </button>
      </div>

      {/* Courses */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">My Courses</h2>
          <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white transition-colors">
            <Plus className="h-4 w-4" />
            <span>New Course</span>
          </button>
        </div>

        <div className="grid gap-4">
          {courses.map((course) => (
            <div key={course.id} className="bg-slate-900/50 rounded-lg p-6 border border-slate-600 hover:border-slate-500 transition-colors">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-white text-lg">{course.name}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-slate-400">
                    <span>{course.students} students</span>
                    <span>•</span>
                    <span>{course.activeProjects} active projects</span>
                    <span>•</span>
                    <span>${course.totalCost.toFixed(2)}/month</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(course.status)}`}>
                    {course.status}
                  </span>
                  <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-300 transition-colors">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-sm text-slate-400">Completion Rate</div>
                  <div className="text-lg font-semibold text-white">
                    {course.activeProjects > 0 ? Math.round((course.activeProjects / course.students) * 100) : 0}%
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                    <div 
                      className="h-2 bg-green-400 rounded-full"
                      style={{ width: `${course.activeProjects > 0 ? (course.activeProjects / course.students) * 100 : 0}%` }}
                    ></div>
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-sm text-slate-400">Avg. Cost per Student</div>
                  <div className="text-lg font-semibold text-white">
                    ${course.students > 0 ? (course.totalCost / course.students).toFixed(2) : '0.00'}
                  </div>
                </div>

                <div className="bg-slate-800/50 rounded-lg p-3">
                  <div className="text-sm text-slate-400">Active Environments</div>
                  <div className="text-lg font-semibold text-white">{course.activeProjects}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Assignments */}
      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-6">Recent Assignments</h2>
        
        <div className="space-y-4">
          {assignments.map((assignment) => (
            <div key={assignment.id} className="bg-slate-900/30 rounded-lg p-4 border border-slate-600">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h3 className="font-medium text-white">{assignment.title}</h3>
                  <p className="text-sm text-slate-400">{assignment.course}</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(assignment.status)}`}>
                    {assignment.status}
                  </span>
                  <button className="p-2 text-slate-400 hover:text-blue-400 transition-colors">
                    <Eye className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-slate-400">Due Date</div>
                  <div className="text-white">{new Date(assignment.dueDate).toLocaleDateString()}</div>
                </div>
                
                <div>
                  <div className="text-slate-400">Submissions</div>
                  <div className="text-white">{assignment.submissions}/{assignment.totalStudents}</div>
                  <div className="w-full bg-slate-700 rounded-full h-1 mt-1">
                    <div 
                      className="h-1 bg-blue-400 rounded-full"
                      style={{ width: `${(assignment.submissions / assignment.totalStudents) * 100}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="text-slate-400">Progress</div>
                  <div className="text-white">{Math.round((assignment.submissions / assignment.totalStudents) * 100)}%</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InstructorSpace;
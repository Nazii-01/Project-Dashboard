import React, { useState } from 'react';
import { Plus, CheckCircle, Clock, AlertCircle } from 'lucide-react';

export default function ProjectDashboard() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Design UI mockups', status: 'Completed', priority: 'High' },
    { id: 2, title: 'Implement authentication', status: 'InProgress', priority: 'High' },
    { id: 3, title: 'Write documentation', status: 'Pending', priority: 'Medium' },
    { id: 4, title: 'Setup CI/CD pipeline', status: 'InProgress', priority: 'Medium' },
  ]);
  
  const [newTask, setNewTask] = useState('');
  const [newPriority, setNewPriority] = useState('Medium');
  const [showForm, setShowForm] = useState(false);

  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      setTasks([...tasks, {
        id: Date.now(),
        title: newTask,
        status: 'Pending',
        priority: newPriority
      }]);
      setNewTask('');
      setNewPriority('Medium');
      setShowForm(false);
    }
  };

  const updateTaskStatus = (id, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Completed': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'InProgress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'Pending': return <AlertCircle className="w-5 h-5 text-gray-400" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'Completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'InProgress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600';
    }
  };

  const statusCounts = {
    Pending: tasks.filter(t => t.status === 'Pending').length,
    InProgress: tasks.filter(t => t.status === 'InProgress').length,
    Completed: tasks.filter(t => t.status === 'Completed').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-2">Project Dashboard</h1>
          <p className="text-slate-600">Manage and track your tasks efficiently</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Pending</p>
                <p className="text-3xl font-bold text-slate-800">{statusCounts.Pending}</p>
              </div>
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">In Progress</p>
                <p className="text-3xl font-bold text-slate-800">{statusCounts.InProgress}</p>
              </div>
              <Clock className="w-12 h-12 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 text-sm font-medium mb-1">Completed</p>
                <p className="text-3xl font-bold text-slate-800">{statusCounts.Completed}</p>
              </div>
              <CheckCircle className="w-12 h-12 text-green-500" />
            </div>
          </div>
        </div>

        {/* Add Task Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
          >
            <Plus className="w-5 h-5" />
            Add New Task
          </button>
        </div>

        {/* Add Task Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 mb-4">Create New Task</h3>
            <form onSubmit={addTask} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Task Title
                </label>
                <input
                  type="text"
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  placeholder="Enter task title..."
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>

              <div className="flex gap-3">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Add Task
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 px-6 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tasks List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-xl font-semibold text-slate-800">All Tasks</h2>
          </div>
          
          <div className="divide-y divide-slate-200">
            {tasks.length === 0 ? (
              <div className="p-12 text-center text-slate-500">
                No tasks yet. Create your first task to get started!
              </div>
            ) : (
              tasks.map(task => (
                <div key={task.id} className="p-6 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <h3 className="font-medium text-slate-800 mb-1">{task.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(task.priority)}`}>
                            {task.priority}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <select
                        value={task.status}
                        onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${getStatusColor(task.status)}`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="InProgress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      
                      <button
                        onClick={() => deleteTask(task.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 px-3 py-2 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
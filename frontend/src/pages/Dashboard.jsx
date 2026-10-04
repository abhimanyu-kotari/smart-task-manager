import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import { statsApi, tasksApi } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, tasksRes] = await Promise.all([
        statsApi.get(),
        tasksApi.getAll()
      ]);
      setStats(statsRes.data);
      // Show the 5 most recent tasks
      setRecentTasks((tasksRes.data.tasks || []).slice(0, 5));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await tasksApi.delete(id);
      fetchData();
    } catch (err) {
      alert('Failed to delete task: ' + err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await tasksApi.update(id, { status: newStatus });
      fetchData();
    } catch (err) {
      alert('Failed to update task: ' + err.message);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-error">
        ⚠️ Error loading data: {error}. Make sure the backend server is running on port 5000.
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">📊 Dashboard</h1>
        <p className="page-subtitle">Overview of all your tasks</p>
      </div>

      {/* Stats by Status */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Task Overview</h2>
        </div>
        <div className="stats-grid">
          <StatCard icon="📋" label="Total Tasks" value={stats?.total ?? 0} type="total" />
          <StatCard icon="⏳" label="Pending" value={stats?.byStatus?.pending ?? 0} type="pending" />
          <StatCard icon="🔵" label="In Progress" value={stats?.byStatus?.['in-progress'] ?? 0} type="progress" />
          <StatCard icon="✅" label="Completed" value={stats?.byStatus?.completed ?? 0} type="done" />
          <StatCard icon="📈" label="Completion" value={`${stats?.completionRate ?? 0}%`} type="rate" />
        </div>
      </div>

      {/* Stats by Priority */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">By Priority</h2>
        </div>
        <div className="stats-grid">
          <StatCard icon="🔴" label="High Priority" value={stats?.byPriority?.high ?? 0} type="high" />
          <StatCard icon="🟠" label="Medium Priority" value={stats?.byPriority?.medium ?? 0} type="medium" />
          <StatCard icon="⚪" label="Low Priority" value={stats?.byPriority?.low ?? 0} type="low" />
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="dashboard-section">
        <div className="section-header">
          <h2 className="section-title">Recent Tasks</h2>
          <Link to="/tasks" className="btn btn-secondary btn-sm">
            View All →
          </Link>
        </div>
        {recentTasks.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📭</div>
            <h3 className="empty-title">No tasks yet</h3>
            <p className="empty-subtitle">Get started by adding your first task!</p>
            <Link to="/tasks/add" className="btn btn-primary">+ Add Task</Link>
          </div>
        ) : (
          <div className="tasks-container">
            {recentTasks.map(task => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TaskCard from '../components/TaskCard';
import TaskFilter from '../components/TaskFilter';
import { tasksApi } from '../services/api';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const params = {};
      if (priorityFilter !== 'all') params.priority = priorityFilter;
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await tasksApi.getAll(params);
      setTasks(res.data.tasks || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [priorityFilter, statusFilter]);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await tasksApi.update(id, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className="page-title">📋 All Tasks</h1>
          <p className="page-subtitle">
            {loading ? 'Loading...' : `${tasks.length} task${tasks.length !== 1 ? 's' : ''} found`}
          </p>
        </div>
        <Link to="/tasks/add" className="btn btn-primary">
          + Add Task
        </Link>
      </div>

      <TaskFilter
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      {loading ? (
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading tasks...</p>
        </div>
      ) : error ? (
        <div className="alert alert-error">
          ⚠️ {error}. Make sure the backend server is running on port 5000.
        </div>
      ) : tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🔍</div>
          <h3 className="empty-title">No tasks found</h3>
          <p className="empty-subtitle">
            {priorityFilter !== 'all' || statusFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Start by adding your first task!'}
          </p>
          <Link to="/tasks/add" className="btn btn-primary">+ Add Task</Link>
        </div>
      ) : (
        <div className="tasks-container">
          {tasks.map(task => (
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
  );
}

export default TaskList;

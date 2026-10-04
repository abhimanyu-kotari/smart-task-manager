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

  // Inline edit state
  const [editingTask, setEditingTask] = useState(null);   // the task being edited
  const [editForm, setEditForm] = useState({});            // live form values
  const [editSaving, setEditSaving] = useState(false);
  const [editError, setEditError] = useState(null);

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

  // ── Handlers ────────────────────────────────────────────────

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await tasksApi.delete(id);
      setTasks(prev => prev.filter(t => t.id !== id));
      // If the deleted task was being edited, close the form
      if (editingTask?.id === id) setEditingTask(null);
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await tasksApi.update(id, { status: newStatus });
      setTasks(prev => prev.map(t => t.id === id ? res.data : t));
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  // Open inline edit form for a task
  const handleEditOpen = (task) => {
    setEditingTask(task);
    setEditForm({
      title:       task.title,
      description: task.description || '',
      priority:    task.priority,
      status:      task.status,
      dueDate:     task.dueDate || ''
    });
    setEditError(null);
  };

  // Cancel inline edit
  const handleEditCancel = () => {
    setEditingTask(null);
    setEditForm({});
    setEditError(null);
  };

  // Save inline edit via PUT /api/tasks/:id
  const handleEditSave = async (e) => {
    e.preventDefault();
    if (!editForm.title?.trim()) {
      setEditError('Title is required.');
      return;
    }
    try {
      setEditSaving(true);
      setEditError(null);
      const res = await tasksApi.update(editingTask.id, editForm);
      setTasks(prev => prev.map(t => t.id === editingTask.id ? res.data : t));
      setEditingTask(null);
      setEditForm({});
    } catch (err) {
      setEditError(err.message);
    } finally {
      setEditSaving(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
    if (editError) setEditError(null);
  };

  // ── Render ──────────────────────────────────────────────────

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
            <React.Fragment key={task.id}>
              <TaskCard
                task={task}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
                onEdit={handleEditOpen}
              />

              {/* Inline edit form — rendered directly below the card being edited */}
              {editingTask?.id === task.id && (
                <div className="inline-edit-form">
                  <h3 className="inline-edit-title">✏️ Edit Task</h3>

                  {editError && (
                    <div className="alert alert-error" style={{ marginBottom: '12px' }}>
                      ⚠️ {editError}
                    </div>
                  )}

                  <form onSubmit={handleEditSave} noValidate>
                    <div className="form-group">
                      <label className="form-label" htmlFor={`edit-title-${task.id}`}>
                        Title <span className="required">*</span>
                      </label>
                      <input
                        id={`edit-title-${task.id}`}
                        name="title"
                        type="text"
                        className="form-control"
                        value={editForm.title}
                        onChange={handleEditChange}
                        maxLength={100}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor={`edit-desc-${task.id}`}>
                        Description
                      </label>
                      <textarea
                        id={`edit-desc-${task.id}`}
                        name="description"
                        className="form-control"
                        value={editForm.description}
                        onChange={handleEditChange}
                        rows={3}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                      <div className="form-group">
                        <label className="form-label" htmlFor={`edit-priority-${task.id}`}>
                          Priority
                        </label>
                        <select
                          id={`edit-priority-${task.id}`}
                          name="priority"
                          className="form-control"
                          value={editForm.priority}
                          onChange={handleEditChange}
                        >
                          <option value="high">🔴 High</option>
                          <option value="medium">🟠 Medium</option>
                          <option value="low">⚪ Low</option>
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label" htmlFor={`edit-status-${task.id}`}>
                          Status
                        </label>
                        <select
                          id={`edit-status-${task.id}`}
                          name="status"
                          className="form-control"
                          value={editForm.status}
                          onChange={handleEditChange}
                        >
                          <option value="pending">⏳ Pending</option>
                          <option value="in-progress">🔵 In Progress</option>
                          <option value="completed">✅ Completed</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label" htmlFor={`edit-due-${task.id}`}>
                        Due Date
                      </label>
                      <input
                        id={`edit-due-${task.id}`}
                        name="dueDate"
                        type="date"
                        className="form-control"
                        value={editForm.dueDate}
                        onChange={handleEditChange}
                      />
                    </div>

                    <div className="form-actions">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={editSaving}
                      >
                        {editSaving ? '⏳ Saving...' : '💾 Save Changes'}
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={handleEditCancel}
                        disabled={editSaving}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;

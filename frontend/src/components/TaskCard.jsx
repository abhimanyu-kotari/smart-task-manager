import React from 'react';
import { Link } from 'react-router-dom';

const PRIORITY_LABELS = { high: '🔴 High', medium: '🟠 Medium', low: '⚪ Low' };
const STATUS_LABELS = {
  pending: '⏳ Pending',
  'in-progress': '🔵 In Progress',
  completed: '✅ Completed'
};

function TaskCard({ task, onDelete, onStatusChange }) {
  const isOverdue =
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== 'completed';

  const formatDate = (dateStr) => {
    if (!dateStr) return null;
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getNextStatus = () => {
    if (task.status === 'pending') return 'in-progress';
    if (task.status === 'in-progress') return 'completed';
    return 'pending';
  };

  const getNextStatusLabel = () => {
    const next = getNextStatus();
    if (next === 'in-progress') return '▶️ Start';
    if (next === 'completed') return '✅ Complete';
    return '↩️ Reopen';
  };

  return (
    <div className={`task-card ${task.priority} ${task.status === 'completed' ? 'completed' : ''}`}>
      <div className="task-card-body">
        <h3 className="task-card-title">{task.title}</h3>
        {task.description && (
          <p className="task-card-desc">{task.description}</p>
        )}
        <div className="task-card-meta">
          <span className={`badge badge-priority-${task.priority}`}>
            {PRIORITY_LABELS[task.priority] || task.priority}
          </span>
          <span className={`badge badge-status-${task.status}`}>
            {STATUS_LABELS[task.status] || task.status}
          </span>
          {task.dueDate && (
            <span className={`task-due-date ${isOverdue ? 'overdue' : ''}`}>
              📅 {isOverdue ? '⚠️ ' : ''}{formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>
      <div className="task-card-actions">
        <button
          className="btn btn-sm btn-success"
          onClick={() => onStatusChange(task.id, getNextStatus())}
          title={`Mark as ${getNextStatus()}`}
        >
          {getNextStatusLabel()}
        </button>
        <Link to={`/tasks/edit/${task.id}`} className="btn btn-sm btn-secondary">
          ✏️ Edit
        </Link>
        <button
          className="btn btn-sm btn-danger"
          onClick={() => onDelete(task.id)}
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;

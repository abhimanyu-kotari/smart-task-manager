import React from 'react';

const PRIORITIES = ['all', 'high', 'medium', 'low'];
const STATUSES = ['all', 'pending', 'in-progress', 'completed'];

function TaskFilter({ priorityFilter, setPriorityFilter, statusFilter, setStatusFilter }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <div className="task-filter" style={{ marginBottom: '10px' }}>
        <span className="filter-label">Priority:</span>
        {PRIORITIES.map((p) => (
          <button
            key={p}
            className={`filter-btn ${p !== 'all' ? p : ''} ${priorityFilter === p ? 'active' : ''}`}
            onClick={() => setPriorityFilter(p)}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="task-filter">
        <span className="filter-label">Status:</span>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`filter-btn ${statusFilter === s ? 'active' : ''}`}
            onClick={() => setStatusFilter(s)}
          >
            {s === 'in-progress' ? 'In Progress' : s.charAt(0).toUpperCase() + s.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TaskFilter;

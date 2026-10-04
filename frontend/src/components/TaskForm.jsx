import React, { useState } from 'react';

const DEFAULT_FORM = {
  title: '',
  description: '',
  priority: 'medium',
  status: 'pending',
  dueDate: ''
};

function TaskForm({ initialValues = {}, onSubmit, onCancel, isLoading }) {
  const [form, setForm] = useState({ ...DEFAULT_FORM, ...initialValues });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = 'Title is required';
    if (form.title.trim().length > 100) newErrors.title = 'Title must be under 100 characters';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label className="form-label" htmlFor="title">
          Task Title <span className="required">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`form-control ${errors.title ? 'error' : ''}`}
          placeholder="Enter task title..."
          value={form.title}
          onChange={handleChange}
          maxLength={100}
        />
        {errors.title && (
          <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>
            {errors.title}
          </div>
        )}
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="form-control"
          placeholder="Describe the task (optional)..."
          value={form.description}
          onChange={handleChange}
          rows={4}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <div className="form-group">
          <label className="form-label" htmlFor="priority">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            className="form-control"
            value={form.priority}
            onChange={handleChange}
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟠 Medium</option>
            <option value="low">⚪ Low</option>
          </select>
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={form.status}
            onChange={handleChange}
          >
            <option value="pending">⏳ Pending</option>
            <option value="in-progress">🔵 In Progress</option>
            <option value="completed">✅ Completed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="dueDate">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="form-control"
          value={form.dueDate}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isLoading}
        >
          {isLoading ? '⏳ Saving...' : '💾 Save Task'}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default TaskForm;

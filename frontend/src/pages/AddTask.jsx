import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { tasksApi } from '../services/api';

function AddTask() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      await tasksApi.create(formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">➕ Add New Task</h1>
        <p className="page-subtitle">Fill in the details for your new task</p>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <div className="form-card">
        <TaskForm
          onSubmit={handleSubmit}
          onCancel={() => navigate('/tasks')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default AddTask;

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { tasksApi } from '../services/api';

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await tasksApi.getById(id);
        setTask(res.data);
      } catch (err) {
        setError('Task not found: ' + err.message);
      } finally {
        setIsFetching(false);
      }
    };
    fetchTask();
  }, [id]);

  const handleSubmit = async (formData) => {
    try {
      setIsLoading(true);
      setError(null);
      await tasksApi.update(id, formData);
      navigate('/tasks');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isFetching) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading task...</p>
      </div>
    );
  }

  if (error && !task) {
    return <div className="alert alert-error">⚠️ {error}</div>;
  }

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">✏️ Edit Task</h1>
        <p className="page-subtitle">Update the task details below</p>
      </div>

      {error && <div className="alert alert-error">⚠️ {error}</div>}

      <div className="form-card">
        <TaskForm
          initialValues={{
            title: task?.title || '',
            description: task?.description || '',
            priority: task?.priority || 'medium',
            status: task?.status || 'pending',
            dueDate: task?.dueDate || ''
          }}
          onSubmit={handleSubmit}
          onCancel={() => navigate('/tasks')}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default EditTask;

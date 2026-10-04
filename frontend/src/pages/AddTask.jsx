import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTask() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      setError('Task title is required.');
      return;
    }

    fetch('http://localhost:5000/api/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to add task.');
        return res.json();
      })
      .then(() => {
        navigate('/tasks');
      })
      .catch(err => {
        setError(err.message);
      });
  };

  return (
    <div>
      <h2>Add New Task</h2>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          {error && <p className="error-text">{error}</p>}
          
          <div className="form-group">
            <label>Task Title</label>
            <input 
              type="text" 
              name="title" 
              className="form-control"
              value={formData.title} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              className="form-control"
              value={formData.description} 
              onChange={handleChange} 
            />
          </div>
          
          <div className="form-group">
            <label>Priority</label>
            <select 
              name="priority" 
              className="form-control"
              value={formData.priority} 
              onChange={handleChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Due Date</label>
            <input 
              type="date" 
              name="dueDate" 
              className="form-control"
              value={formData.dueDate} 
              onChange={handleChange} 
            />
          </div>
          
          <button type="submit" className="btn-primary">Add Task</button>
        </form>
      </div>
    </div>
  );
}

export default AddTask;

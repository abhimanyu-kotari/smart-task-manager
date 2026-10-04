import { useState } from 'react';

function TaskCard({ task, onComplete, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...task });

  const handleEditChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    onEdit(editData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...task });
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className={`task-card ${task.priority.toLowerCase()}`}>
        <div className="edit-form">
          <input 
            type="text" 
            name="title" 
            className="form-control"
            value={editData.title} 
            onChange={handleEditChange} 
          />
          <textarea 
            name="description" 
            className="form-control"
            value={editData.description} 
            onChange={handleEditChange} 
          />
          <select 
            name="priority" 
            className="form-control"
            value={editData.priority} 
            onChange={handleEditChange}
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
          <input 
            type="date" 
            name="dueDate" 
            className="form-control"
            value={editData.dueDate} 
            onChange={handleEditChange} 
          />
          <select 
            name="status" 
            className="form-control"
            value={editData.status} 
            onChange={handleEditChange}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
          
          <div className="task-actions">
            <button className="btn-success" onClick={handleSave}>Save</button>
            <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`task-card ${task.status === 'Completed' ? 'completed' : task.priority.toLowerCase()}`}>
      <div className="task-header">
        <div className="task-title">{task.title}</div>
        <div className="task-badges">
          <span className={`badge ${task.priority.toLowerCase()}`}>{task.priority}</span>
          <span className={`badge ${task.status.toLowerCase()}`}>{task.status}</span>
        </div>
      </div>
      
      <p className="task-desc">{task.description}</p>
      
      {task.dueDate && (
        <p className="task-date">Due: {task.dueDate}</p>
      )}
      
      <div className="task-actions">
        <button 
          className="btn-success" 
          onClick={() => onComplete(task)}
        >
          {task.status === 'Completed' ? 'Mark Pending' : 'Complete'}
        </button>
        <button className="btn-primary" onClick={() => setIsEditing(true)}>Edit</button>
        <button className="btn-danger" onClick={() => onDelete(task.id)}>Delete</button>
      </div>
    </div>
  );
}

export default TaskCard;

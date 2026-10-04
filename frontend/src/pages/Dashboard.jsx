import { useState, useEffect } from 'react';
import TaskStatistics from '../components/TaskStatistics';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = () => {
    fetch('http://localhost:5000/api/tasks')
      .then(res => {
        if (!res.ok) throw new Error('Failed to load tasks.');
        return res.json();
      })
      .then(data => {
        setTasks(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="error-text">{error}</p>;

  // Calculate statistics
  const total = tasks.length;
  const pending = tasks.filter(t => t.status === 'Pending').length;
  const completed = tasks.filter(t => t.status === 'Completed').length;
  const highPriority = tasks.filter(t => t.priority === 'High').length;

  const recentTasks = [...tasks].reverse().slice(0, 3); // Get 3 most recent

  return (
    <div>
      <h2>Dashboard</h2>
      
      <TaskStatistics 
        total={total}
        pending={pending}
        completed={completed}
        highPriority={highPriority}
      />

      <h3>Recent Tasks</h3>
      <div className="task-list" style={{ marginTop: '15px' }}>
        {recentTasks.length === 0 ? (
          <p>No recent tasks.</p>
        ) : (
          recentTasks.map(task => (
            <div key={task.id} className="task-card">
              <div className="task-header">
                <div className="task-title">{task.title}</div>
                <div className="task-badges">
                  <span className={`badge ${task.status.toLowerCase()}`}>{task.status}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Dashboard;

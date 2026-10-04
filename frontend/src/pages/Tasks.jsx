import { useState, useEffect } from 'react';
import TaskList from '../components/TaskList';
import TaskFilter from '../components/TaskFilter';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

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

  const handleCompleteTask = (task) => {
    const updatedTask = { 
      ...task, 
      status: task.status === 'Completed' ? 'Pending' : 'Completed' 
    };
    
    fetch(`http://localhost:5000/api/tasks/${task.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task.');
        return res.json();
      })
      .then(data => {
        setTasks(tasks.map(t => t.id === data.id ? data : t));
      })
      .catch(err => alert(err.message));
  };

  const handleEditTask = (updatedTask) => {
    fetch(`http://localhost:5000/api/tasks/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask)
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to update task.');
        return res.json();
      })
      .then(data => {
        setTasks(tasks.map(t => t.id === data.id ? data : t));
      })
      .catch(err => alert(err.message));
  };

  const handleDeleteTask = (id) => {
    fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to delete task.');
        setTasks(tasks.filter(t => t.id !== id));
      })
      .catch(err => alert(err.message));
  };

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;
    const matchesStatus = statusFilter === 'All' || task.status === statusFilter;
    
    return matchesSearch && matchesPriority && matchesStatus;
  });

  if (loading) return <p>Loading tasks...</p>;
  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      <h2>All Tasks</h2>
      <TaskFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <TaskList 
        tasks={filteredTasks}
        onComplete={handleCompleteTask}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default Tasks;

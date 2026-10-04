import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <h1>Smart Task Manager</h1>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/tasks">All Tasks</Link>
        <Link to="/add-task">Add Task</Link>
      </div>
    </nav>
  );
}

export default Navbar;

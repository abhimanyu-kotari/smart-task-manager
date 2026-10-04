import React from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-brand">
          <span className="brand-icon">📋</span>
          <span className="brand-text">Smart Task Manager</span>
        </Link>
        <div className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/tasks"
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
          >
            Tasks
          </NavLink>
          <Link to="/tasks/add" className="nav-link-btn">
            + Add Task
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

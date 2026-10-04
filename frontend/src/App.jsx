import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import TaskList from './pages/TaskList';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/add" element={<AddTask />} />
            <Route path="/tasks/edit/:id" element={<EditTask />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

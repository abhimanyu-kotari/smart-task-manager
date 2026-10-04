import React from 'react';

class TaskStatistics extends React.Component {
  render() {
    const { total, pending, completed, highPriority } = this.props;

    return (
      <div className="stats-container">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p>{total}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p>{pending}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Tasks</h3>
          <p>{completed}</p>
        </div>
        <div className="stat-card">
          <h3>High Priority Tasks</h3>
          <p>{highPriority}</p>
        </div>
      </div>
    );
  }
}

export default TaskStatistics;

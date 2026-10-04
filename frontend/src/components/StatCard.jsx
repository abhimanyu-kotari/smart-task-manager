import React from 'react';

function StatCard({ icon, label, value, type }) {
  return (
    <div className={`stat-card ${type}`}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-info">
        <div className="stat-label">{label}</div>
        <div className={`stat-value ${String(value).length > 4 ? 'small' : ''}`}>
          {value}
        </div>
      </div>
    </div>
  );
}

export default StatCard;

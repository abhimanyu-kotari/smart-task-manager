function TaskFilter({ searchTerm, setSearchTerm, priorityFilter, setPriorityFilter, statusFilter, setStatusFilter }) {
  return (
    <div className="filters-container">
      <div className="filter-group">
        <input 
          type="text" 
          placeholder="Search tasks..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      <div className="filter-group">
        <label>Priority:</label>
        <select 
          className="form-control"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Status:</label>
        <select 
          className="form-control"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>
    </div>
  );
}

export default TaskFilter;

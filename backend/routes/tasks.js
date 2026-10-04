const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_FILE = path.join(__dirname, '..', 'data', 'tasks.json');

// Helper: Read tasks from file
function readTasks() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(raw).tasks || [];
  } catch (err) {
    console.error('Error reading tasks:', err);
    return [];
  }
}

// Helper: Write tasks to file
function writeTasks(tasks) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ tasks }, null, 2), 'utf8');
    return true;
  } catch (err) {
    console.error('Error writing tasks:', err);
    return false;
  }
}

// GET /api/tasks — Get all tasks (optional ?priority=high|medium|low filter)
router.get('/', (req, res) => {
  try {
    let tasks = readTasks();
    const { priority, status } = req.query;

    if (priority) {
      tasks = tasks.filter(t => t.priority === priority);
    }
    if (status) {
      tasks = tasks.filter(t => t.status === status);
    }

    // Sort by creation date descending
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json({ tasks, count: tasks.length });
  } catch (err) {
    console.error('GET /tasks error:', err);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
});

// GET /api/tasks/:id — Get a single task
router.get('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const task = tasks.find(t => t.id === req.params.id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
  } catch (err) {
    console.error('GET /tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
});

// POST /api/tasks — Create a new task
router.post('/', (req, res) => {
  try {
    const { title, description, priority, status, dueDate } = req.body;

    // Validation
    if (!title || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }
    if (!['high', 'medium', 'low'].includes(priority)) {
      return res.status(400).json({ error: 'Priority must be high, medium, or low' });
    }
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Status must be pending, in-progress, or completed' });
    }

    const newTask = {
      id: uuidv4(),
      title: title.trim(),
      description: description ? description.trim() : '',
      priority,
      status,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString()
    };

    const tasks = readTasks();
    tasks.push(newTask);

    if (!writeTasks(tasks)) {
      return res.status(500).json({ error: 'Failed to save task' });
    }

    res.status(201).json(newTask);
  } catch (err) {
    console.error('POST /tasks error:', err);
    res.status(500).json({ error: 'Failed to create task' });
  }
});

// PUT /api/tasks/:id — Update a task
router.put('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const { title, description, priority, status, dueDate } = req.body;

    // Validate if provided
    if (title !== undefined && title.trim() === '') {
      return res.status(400).json({ error: 'Title cannot be empty' });
    }
    if (priority && !['high', 'medium', 'low'].includes(priority)) {
      return res.status(400).json({ error: 'Priority must be high, medium, or low' });
    }
    if (status && !['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ error: 'Status must be pending, in-progress, or completed' });
    }

    const updatedTask = {
      ...tasks[index],
      ...(title !== undefined && { title: title.trim() }),
      ...(description !== undefined && { description: description.trim() }),
      ...(priority !== undefined && { priority }),
      ...(status !== undefined && { status }),
      ...(dueDate !== undefined && { dueDate }),
      updatedAt: new Date().toISOString()
    };

    tasks[index] = updatedTask;

    if (!writeTasks(tasks)) {
      return res.status(500).json({ error: 'Failed to update task' });
    }

    res.json(updatedTask);
  } catch (err) {
    console.error('PUT /tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to update task' });
  }
});

// DELETE /api/tasks/:id — Delete a task
router.delete('/:id', (req, res) => {
  try {
    const tasks = readTasks();
    const index = tasks.findIndex(t => t.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Task not found' });
    }

    const deleted = tasks[index];
    tasks.splice(index, 1);

    if (!writeTasks(tasks)) {
      return res.status(500).json({ error: 'Failed to delete task' });
    }

    res.json({ message: 'Task deleted successfully', task: deleted });
  } catch (err) {
    console.error('DELETE /tasks/:id error:', err);
    res.status(500).json({ error: 'Failed to delete task' });
  }
});

module.exports = router;

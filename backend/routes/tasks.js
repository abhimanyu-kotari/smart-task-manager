const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../data/tasks.json');

// Helper to read data
const getTasks = () => {
    try {
        const jsonData = fs.readFileSync(dataPath, 'utf8');
        return JSON.parse(jsonData);
    } catch (err) {
        return [];
    }
};

// Helper to write data
const saveTasks = (tasks) => {
    fs.writeFileSync(dataPath, JSON.stringify(tasks, null, 2), 'utf8');
};

// GET all tasks
router.get('/', (req, res) => {
    const tasks = getTasks();
    res.json(tasks);
});

// POST a new task
router.post('/', (req, res) => {
    const tasks = getTasks();
    const newTask = {
        id: Date.now().toString(), // Simple ID generator
        title: req.body.title,
        description: req.body.description || '',
        priority: req.body.priority || 'Medium',
        dueDate: req.body.dueDate || '',
        status: 'Pending'
    };
    
    if (!newTask.title) {
        return res.status(400).json({ error: 'Title is required' });
    }
    
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

// PUT (update) a task
router.put('/:id', (req, res) => {
    const tasks = getTasks();
    const taskId = req.params.id;
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    
    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    const updatedTask = {
        ...tasks[taskIndex],
        ...req.body
    };
    
    tasks[taskIndex] = updatedTask;
    saveTasks(tasks);
    res.json(updatedTask);
});

// DELETE a task
router.delete('/:id', (req, res) => {
    const tasks = getTasks();
    const taskId = req.params.id;
    const filteredTasks = tasks.filter(t => t.id !== taskId);
    
    if (tasks.length === filteredTasks.length) {
        return res.status(404).json({ error: 'Task not found' });
    }
    
    saveTasks(filteredTasks);
    res.json({ message: 'Task deleted successfully' });
});

module.exports = router;

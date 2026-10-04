const express = require('express');
const cors = require('cors');
const path = require('path');
const tasksRouter = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// Routes
app.use('/api/tasks', tasksRouter);

// Stats route
app.get('/api/stats', (req, res) => {
  const fs = require('fs');
  const dataPath = path.join(__dirname, 'data', 'tasks.json');

  try {
    const raw = fs.readFileSync(dataPath, 'utf8');
    const { tasks } = JSON.parse(raw);

    const stats = {
      total: tasks.length,
      byStatus: {
        pending: tasks.filter(t => t.status === 'pending').length,
        'in-progress': tasks.filter(t => t.status === 'in-progress').length,
        completed: tasks.filter(t => t.status === 'completed').length
      },
      byPriority: {
        high: tasks.filter(t => t.priority === 'high').length,
        medium: tasks.filter(t => t.priority === 'medium').length,
        low: tasks.filter(t => t.priority === 'low').length
      },
      completionRate: tasks.length > 0
        ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
        : 0
    };

    res.json(stats);
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to compute stats' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Smart Task Manager API is running' });
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'Smart Task Manager API',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      tasks: '/api/tasks',
      stats: '/api/stats'
    }
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 Smart Task Manager API running on http://localhost:${PORT}`);
  console.log(`📋 Tasks:  http://localhost:${PORT}/api/tasks`);
  console.log(`📊 Stats:  http://localhost:${PORT}/api/stats`);
  console.log(`❤️  Health: http://localhost:${PORT}/api/health\n`);
});

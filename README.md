# Smart Task Manager 📋

A full-stack task management application built with **React** (frontend) and **Express.js** (backend), featuring task creation, prioritization, filtering, and a statistics dashboard.

## 🚀 Features

- **Task CRUD Operations** — Create, read, update, and delete tasks
- **Priority Levels** — High, Medium, and Low priority classification
- **Status Tracking** — Mark tasks as Pending, In Progress, or Completed
- **Priority Filtering** — Filter tasks by priority level
- **Statistics Dashboard** — View task counts by status and priority
- **Responsive Design** — Works on desktop and mobile
- **Persistent Storage** — Data stored in JSON file on the backend
- **React Router** — Multi-page navigation (Dashboard, Tasks, Add Task)

## 🛠️ Tech Stack

### Frontend
- React 18
- React Router v6
- Axios (HTTP client)
- CSS3 (custom responsive styles)

### Backend
- Node.js
- Express.js
- CORS middleware
- File-based JSON storage (`data/tasks.json`)

## 📁 Project Structure

```
smart-task-manager/
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   └── StatCard.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   └── AddTask.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
│
├── backend/
│   ├── routes/
│   │   └── tasks.js
│   ├── data/
│   │   └── tasks.json
│   ├── server.js
│   └── package.json
│
├── .gitignore
└── README.md
```

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- npm v9+

### 1. Clone the Repository

```bash
git clone https://github.com/abhimanyu-kotari/smart-task-manager.git
cd smart-task-manager
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

The backend server will start on **http://localhost:5000**

### 3. Start the Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm start
```

The React app will open at **http://localhost:3000**

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| GET | `/api/stats` | Get task statistics |

## 🎨 Screenshots

### Dashboard
- Displays total tasks, completion rate, and breakdown by priority/status

### Task List
- Shows all tasks with filter options by priority
- Each task card shows title, description, priority badge, status, and due date

### Add Task
- Form to create new tasks with title, description, priority, status, and due date

## 📝 License

MIT License — feel free to use and modify.

---
Built with ❤️ using React + Express

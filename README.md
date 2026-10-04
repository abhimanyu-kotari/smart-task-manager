# Smart Task Manager
A Full-Stack Task Management Application

## Project Description
Smart Task Manager is a full-stack React and Express academic assignment project. It provides a simple and clean interface to manage tasks effectively. Users can view a dashboard with statistics, view and filter all tasks, edit them in-place, and add new ones. 

## Features
- **Dashboard:** Displays task statistics (Total, Pending, Completed, High Priority) and recent tasks.
- **All Tasks:** Lists all tasks with options to edit, delete, and mark them as complete. Includes inline editing directly on the card.
- **Add Task:** A controlled form to add new tasks with basic validation.
- **Filtering & Search:** Filter tasks by priority, status, or search by title.
- **REST API Integration:** Full CRUD operations talking to an Express.js backend.
- **Responsive Design:** Works smoothly on desktop, tablet, and mobile devices.

## Technologies Used
**Frontend:** React.js, React Router, JavaScript, standard CSS
**Backend:** Node.js, Express.js, REST API
**Storage:** JSON File System persistence (no database used, per requirements)

## Project Structure
```
smart-task-manager/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskList.jsx
│   │   │   ├── TaskFilter.jsx
│   │   │   └── TaskStatistics.jsx
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Tasks.jsx
│   │   │   └── AddTask.jsx
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── styles.css
│   └── package.json
│
├── backend/
│   ├── server.js
│   ├── routes/
│   │   └── tasks.js
│   ├── data/
│   │   └── tasks.json
│   └── package.json
│
├── README.md
└── .gitignore
```

## Three Screens
1. **Dashboard** (`/dashboard`): Provides statistics and an overview.
2. **All Tasks** (`/tasks`): Full task list, filters, search, and inline editing.
3. **Add Task** (`/add-task`): Form to create new tasks.

## React Concepts Demonstrated
- **React Components:** Functional and Class components.
- **Genuine Class Component:** `TaskStatistics.jsx` extends `React.Component` and receives data via props.
- **Props & Parent-Child Communication:** Passing tasks and callback handlers down (`Tasks` -> `TaskList` -> `TaskCard`).
- **State Management:** Extensive use of `useState` for forms, search, filters, editing, and task data.
- **Side Effects:** `useEffect` for fetching data from the backend when components mount.
- **Event Handling:** `onChange`, `onClick`, `onSubmit`.
- **Form Handling:** Controlled inputs with simple validation in Add Task and Edit flows.
- **React Router:** SPA routing via `BrowserRouter`, `Routes`, `Route`.

## API Endpoints
- `GET /api/tasks`: Fetch all tasks.
- `POST /api/tasks`: Create a new task.
- `PUT /api/tasks/:id`: Update an existing task.
- `DELETE /api/tasks/:id`: Delete a task.

## Two Student Modifications
1. **Priority System + Priority Filtering:** Every task has a High, Medium, or Low priority. Users can filter tasks based on this priority on the All Tasks screen.
2. **Task Statistics Dashboard:** Dashboard calculates and displays "Total Tasks", "Pending Tasks", "Completed Tasks", and "High Priority Tasks" dynamically from the task data.

## Installation Instructions

1. Clone the repository:
```bash
git clone https://github.com/abhimanyu-kotari/smart-task-manager.git
cd smart-task-manager
```

2. Setup Backend:
```bash
cd backend
npm install
```

3. Setup Frontend:
```bash
cd frontend
npm install
```

## How to Run Backend
From the `backend` directory, run:
```bash
npm start
```
The server will run on `http://localhost:5000`

## How to Run Frontend
From the `frontend` directory, run:
```bash
npm start
```
Open the provided local URL (usually `http://localhost:3000`) in your browser.

## Basic Usage Instructions
- Open the app, and you'll be redirected to the **Dashboard** to see current statistics.
- Navigate to **All Tasks** to manage your lists. You can mark tasks as Complete/Pending, Edit their details inline, or Delete them. Use the filters at the top to find specific tasks.
- Navigate to **Add Task** to submit a new task. Fill out the necessary details and click "Add Task" to save it.

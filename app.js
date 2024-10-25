const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

let tasks = []; // Store tasks in memory

// Route to get all tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// Route to add a new task
app.post("/tasks", (req, res) => {
  const task = req.body.task;
  tasks.push({ text: task, completed: false });
  res.status(201).json({ message: "Task added" });
});

// Route to mark a task as completed
app.post("/tasks/complete", (req, res) => {
  const taskText = req.body.task;
  const task = tasks.find(t => t.text === taskText);
  if (task) task.completed = true;
  res.json({ message: "Task marked as completed" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

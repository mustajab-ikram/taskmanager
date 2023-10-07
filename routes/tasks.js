const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

const { tasks } = require('../tasks.json');
const { validateTask } = require('../middleware/taskValidator');
const getNextTaskId = require('../helpers/taskId');

router.get('/', (req, res) => {
  res.json(tasks);
});

router.get('/:id', (req, res) => {
  const taskId = req.params.id;
  const [task] = tasks.filter((t) => t.id === +taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

router.post('/', validateTask, (req, res) => {
  const { title, description, completed } = req.body;
  const newTask = {
    id: getNextTaskId(),
    createdAt: Date.now(),
    title,
    description,
    completed: completed || false,
  };

  tasks.push(newTask);

  fs.writeFile(
    path.join(__dirname, '../tasks.json'),
    JSON.stringify({ tasks }),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json(newTask);
    }
  );
});

router.put('/:id', validateTask, (req, res) => {
  const taskId = req.params.id;
  const { title, description, completed } = req.body;
  const taskIndex = tasks.findIndex((t) => t.id === +taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const updatedTask = {
    id: tasks[taskIndex].id,
    createdAt: tasks[taskIndex].createdAt,
    title,
    description,
    completed: completed || false,
  };

  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };

  fs.writeFile(
    path.join(__dirname, '../tasks.json'),
    JSON.stringify({ tasks }),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json(tasks[taskIndex]);
    }
  );
});

router.delete('/:id', (req, res) => {
  const taskId = req.params.id;
  const taskIndex = tasks.findIndex((t) => t.id === +taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  const deletedTask = tasks.splice(taskIndex, 1);

  fs.writeFile(
    path.join(__dirname, '../tasks.json'),
    JSON.stringify({ tasks }),
    (err) => {
      if (err) {
        console.error('Error writing to JSON file:', err);
        return res.status(500).json({ message: 'Internal Server Error' });
      }
      res.status(201).json(`Task with id: ${taskId} deleted successfully`);
    }
  );
});

module.exports = router;
